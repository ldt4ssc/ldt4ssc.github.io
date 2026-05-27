"""Aggregate pilot data from the journey CSV and each pilot's GitHub repo.

Run:
    python scripts/aggregate_pilots.py

Optional env vars:
    GITHUB_TOKEN  — Bearer token for GitHub API / raw content requests (avoids rate-limits)
"""

import csv
import io
import json
import os
import re
import shutil
import sys
import urllib.parse
import urllib.request
import datetime as _dt
from datetime import datetime, timezone
from pathlib import Path

import yaml
from feedgen.feed import FeedGenerator
from jsonschema import Draft202012Validator


class _DateEncoder(json.JSONEncoder):
    """Serialise date/datetime values that PyYAML auto-creates from YAML date scalars."""
    def default(self, obj):
        if isinstance(obj, (_dt.datetime, _dt.date)):
            return obj.isoformat()
        return super().default(obj)

# ---------------------------------------------------------------------------
# Schema validation (re-used from validate_updates.py logic)
# ---------------------------------------------------------------------------

_schema_cache: dict[int, dict] = {}


def _load_schema(version: int, token: str) -> dict:
    if version not in _schema_cache:
        url = f"https://knowledgehub.ldt4ssc.eu/assets/update-v{version}.schema.json"
        _schema_cache[version] = json.loads(_get(url, token=token, timeout=10))
    return _schema_cache[version]


def _normalise_for_schema(value):
    """Convert YAML date/datetime objects to ISO strings before validation."""
    if isinstance(value, (_dt.datetime, _dt.date)):
        return value.isoformat()
    if isinstance(value, dict):
        return {k: _normalise_for_schema(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_normalise_for_schema(v) for v in value]
    return value


def _validate_fm(fm: dict, token: str) -> list[str]:
    version = fm.get("schema_version")
    if version is None:
        return ["missing schema_version"]
    try:
        schema = _load_schema(version, token)
    except Exception as exc:
        return [f"could not fetch schema v{version}: {exc}"]
    normalised = _normalise_for_schema(fm)
    return [err.message for err in Draft202012Validator(schema).iter_errors(normalised)]


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

PILOTS_CSV_URL = (
    "https://docs.google.com/spreadsheets/d/e/"
    "2PACX-1vT9r0KcIhKLggTKbkD4HJM5zmCXYoVlTIhhriJw9RvlHdAGdZW7Sf6tq0w6wq9UBbVbNSnhMHn5Uf7e"
    "/pub?gid=0&single=true&output=csv"
)
HUB_BASE_URL = "https://knowledgehub.ldt4ssc.eu"
REPO_ROOT = Path(__file__).parent.parent
PILOTS_DIR = REPO_ROOT / "docs" / "journey" / "pilots"
FEEDS_DIR = REPO_ROOT / "docs" / "feeds"
TEMPLATE_MD = PILOTS_DIR / "_template.md"

UPDATE_FILENAME_RE = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$")
GITHUB_REPO_RE = re.compile(r"^https?://github\.com/([^/]+)/([^/]+?)(?:\.git)?/?$")

# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def _get(url: str, token: str = "", timeout: int = 15) -> bytes:
    req = urllib.request.Request(url)
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    req.add_header("User-Agent", "ldt4ssc-aggregator/1.0")
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


# ---------------------------------------------------------------------------
# CSV parsing
# ---------------------------------------------------------------------------

def _is_truthy(val: str) -> bool:
    return val.strip().strip("﻿\xa0").lower() in {"yes", "y", "true", "1"}


def _split_list(val: str) -> list[str]:
    parts = re.split(r"[;,]", val)
    return [p.strip() for p in parts if p.strip()]


def _parse_date(val: str) -> str:
    """Accept DD/MM/YYYY or YYYY-MM-DD; return YYYY-MM-DD or ''."""
    val = val.strip()
    if not val:
        return ""
    m = re.match(r"^(\d{1,2})/(\d{1,2})/(\d{4})$", val)
    if m:
        return f"{m.group(3)}-{m.group(2).zfill(2)}-{m.group(1).zfill(2)}"
    if re.match(r"^\d{4}-\d{2}-\d{2}$", val):
        return val
    return val  # return as-is if format unknown


def _short_name_from_url(pilot_page_url: str, name: str) -> str:
    if pilot_page_url:
        parts = [p for p in pilot_page_url.rstrip("/").split("/") if p]
        if parts:
            return parts[-1].lower()
    slug = re.sub(r"[^a-z0-9-]", "", name.lower().replace(" ", "-"))
    return slug or "unknown"


def map_csv_row(row: dict) -> dict | None:
    if not _is_truthy(row.get("KH?", "")):
        return None

    pilot_lead = row.get("Pilot Lead", "").strip()
    third_party = _split_list(row.get("Third-party partners", ""))
    pilot_page_url = row.get("pilot_page_url", "").strip()
    name = row.get("Name", "").strip()

    cohort_raw = row.get("Cohort", "").strip()
    digits = re.sub(r"\D", "", cohort_raw)
    round_key = f"round{digits}" if digits else "round1"

    consortium = []
    if pilot_lead:
        consortium.append({"country_code": "", "name": pilot_lead, "role": "Pilot lead"})
    for tp in third_party:
        consortium.append({"country_code": "", "name": tp, "role": "Partner"})

    locations = [
        {"city": city, "country": "", "country_code": ""}
        for city in _split_list(row.get("Municipalities", ""))
    ]

    return {
        "composition": row.get("Composition", "").strip(),
        "consortium": consortium,
        "contact": {"email": "", "name": pilot_lead, "organisation": ""},
        "description": row.get("Description", "").strip(),
        "external_page_url": row.get("Page URL", "").strip(),
        "focus_areas": _split_list(row.get("Use-Cases", "")),
        "locations": locations,
        "name": name,
        "pilot_id": row.get("Pilot ID", "").strip(),
        "pilot_page_url": pilot_page_url,
        "repository_url": row.get("repository_url", "").strip(),
        "round": round_key,
        "short_name": _short_name_from_url(pilot_page_url, name),
        "start_date": _parse_date(row.get("Start Date", "")),
        "status": row.get("Status", "").strip(),
        "work_strand": row.get("Work Strand", "").strip(),
    }


# ---------------------------------------------------------------------------
# YAML overlay
# ---------------------------------------------------------------------------

_SCALAR_FIELDS = {"name", "description", "work_strand", "start_date"}
_ARRAY_FIELDS = {"locations", "focus_areas", "consortium"}
_IDENTITY_FIELDS = {"short_name", "pilot_id", "round", "pilot_page_url", "repository_url"}


def apply_yaml_overlay(pilot: dict, yaml_data: dict) -> dict:
    merged = dict(pilot)
    for key, val in yaml_data.items():
        if key in _IDENTITY_FIELDS:
            continue
        if key in _SCALAR_FIELDS or key in _ARRAY_FIELDS or key == "contact":
            merged[key] = val
        else:
            # yaml-only fields (end_date, external_links, …)
            merged[key] = val
    return merged


def fetch_yaml_overlay(pilot: dict, token: str) -> dict:
    repo_url = pilot.get("repository_url", "")
    if not repo_url:
        return pilot
    m = GITHUB_REPO_RE.match(repo_url)
    if not m:
        return pilot
    owner, repo = m.group(1), m.group(2)
    raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/main/pilot.yaml"
    try:
        content = _get(raw_url, token=token, timeout=15)
        yaml_data = yaml.safe_load(content)
        if not isinstance(yaml_data, dict):
            raise ValueError("pilot.yaml did not parse as a mapping")
        return apply_yaml_overlay(pilot, yaml_data)
    except Exception as exc:
        print(f"WARN: could not fetch/parse pilot.yaml for {pilot['short_name']}: {exc}", file=sys.stderr)
        return pilot


# ---------------------------------------------------------------------------
# Updates fetch
# ---------------------------------------------------------------------------

def _strip_markdown(text: str) -> str:
    text = re.sub(r"^#+\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"[*_`\[\]]", "", text)
    return text.strip()


def _parse_front_matter(content: str) -> tuple[dict, str]:
    """Split YAML front matter from body. Returns (front_matter_dict, body)."""
    if not content.startswith("---"):
        return {}, content
    end = content.find("\n---", 3)
    if end == -1:
        return {}, content
    fm_text = content[3:end].strip()
    body = content[end + 4:].strip()
    return yaml.safe_load(fm_text) or {}, body


def fetch_updates(
    owner: str,
    repo: str,
    dest_dir: Path,
    pilot: dict,
    token: str,
) -> tuple[list[dict], int, int]:
    """Fetch updates from GitHub. Returns (index_entries, ok_count, skipped_count)."""
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/updates?ref=main"
    try:
        listing = json.loads(_get(api_url, token=token, timeout=15))
    except Exception as exc:
        print(f"WARN: could not list updates for {pilot['short_name']}: {exc}", file=sys.stderr)
        return [], 0, 0

    if not isinstance(listing, list):
        return [], 0, 0

    updates_dir = dest_dir / "updates"
    updates_dir.mkdir(exist_ok=True)

    index_entries = []
    ok = 0
    skipped = 0

    for entry in listing:
        filename = entry.get("name", "")
        if not UPDATE_FILENAME_RE.match(filename):
            continue
        download_url = entry.get("download_url", "")
        if not download_url:
            continue
        try:
            raw = _get(download_url, token=token, timeout=15)
            text = raw.decode("utf-8")
        except Exception as exc:
            print(f"WARN: could not fetch {filename} for {pilot['short_name']}: {exc}", file=sys.stderr)
            skipped += 1
            continue

        try:
            fm, body = _parse_front_matter(text)
        except Exception as exc:
            print(f"WARN: front-matter parse failed for {filename}: {exc}", file=sys.stderr)
            skipped += 1
            continue

        errors = _validate_fm(fm, token)
        if errors:
            print(
                f"WARN: skipping {filename} for {pilot['short_name']}: "
                f"validation failed: {'; '.join(errors)}",
                file=sys.stderr,
            )
            skipped += 1
            continue

        (updates_dir / filename).write_text(text, encoding="utf-8")

        slug = filename[:-3]  # strip .md
        summary_raw = _strip_markdown(body)
        summary = summary_raw[:200] if summary_raw else ""

        index_entries.append({
            "authors": fm.get("authors", []),
            "date": _dt.date.isoformat(fm["date"]) if isinstance(fm.get("date"), (_dt.date, _dt.datetime)) else str(fm.get("date", slug[:10])),
            "pilot_name": pilot["name"],
            "pilot_page_url": pilot["pilot_page_url"],
            "short_name": pilot["short_name"],
            "slug": slug,
            "summary": summary,
            "tags": fm.get("tags", []),
            "title": fm.get("title", slug),
            "topics": fm.get("topics", []),
            "type": fm.get("type", ""),
            "work_strand": pilot["work_strand"],
        })
        ok += 1

    index_entries.sort(key=lambda x: x["date"], reverse=True)
    return index_entries, ok, skipped


# ---------------------------------------------------------------------------
# RSS generation
# ---------------------------------------------------------------------------

def _make_feed(title: str, link: str, description: str) -> FeedGenerator:
    fg = FeedGenerator()
    fg.id(link)
    fg.title(title)
    fg.link(href=link, rel="alternate")
    fg.description(description or title)
    fg.language("en")
    return fg


def _add_entry(fg: FeedGenerator, entry: dict) -> None:
    fe = fg.add_entry()
    pilot_page = entry["pilot_page_url"].lstrip("/")
    url = f"{HUB_BASE_URL}/{pilot_page}#update={entry['slug']}"
    fe.id(url)
    fe.title(entry["title"] or entry["slug"])
    fe.link(href=url)
    if entry.get("summary"):
        fe.description(entry["summary"])
    date_str = entry.get("date", "")
    if date_str:
        try:
            dt = datetime.fromisoformat(date_str).replace(tzinfo=timezone.utc)
            fe.pubDate(dt)
        except ValueError:
            pass


def generate_rss(all_pilots: list[dict], all_updates: list[dict]) -> None:
    FEEDS_DIR.mkdir(parents=True, exist_ok=True)

    updates_by_pilot: dict[str, list[dict]] = {}
    for u in all_updates:
        updates_by_pilot.setdefault(u["short_name"], []).append(u)

    for pilot in all_pilots:
        sn = pilot["short_name"]
        pilot_link = f"{HUB_BASE_URL}/{pilot['pilot_page_url'].lstrip('/')}"
        fg = _make_feed(
            title=f"{pilot['name']} — LDT4SSC Updates",
            link=pilot_link,
            description=pilot.get("description", ""),
        )
        for entry in updates_by_pilot.get(sn, []):
            _add_entry(fg, entry)
        fg.rss_file(str(FEEDS_DIR / f"{sn}.xml"), pretty=True)

    # Aggregated feed (newest 100)
    fg_all = _make_feed(
        title="LDT4SSC Pilot Updates",
        link=f"{HUB_BASE_URL}/journey/feed/",
        description="All updates from LDT4SSC pilots",
    )
    for entry in all_updates[:100]:
        _add_entry(fg_all, entry)
    fg_all.rss_file(str(FEEDS_DIR / "all.xml"), pretty=True)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    token = os.environ.get("GITHUB_TOKEN", "")

    print("Fetching pilots CSV…")
    try:
        csv_bytes = _get(PILOTS_CSV_URL, timeout=30)
    except Exception as exc:
        sys.exit(f"ERROR: could not fetch pilots CSV: {exc}")

    rows = list(csv.DictReader(io.StringIO(csv_bytes.decode("utf-8"))))
    if rows:
        kh_col = next((k for k in rows[0] if k.strip() == "KH?"), None)
        if kh_col and kh_col != "KH?":
            print(f"  WARNING: 'KH?' column found as {repr(kh_col)}, normalising")
            for r in rows:
                r["KH?"] = r.pop(kh_col)
        elif not kh_col:
            print(f"  WARNING: no 'KH?' column found. Available columns: {list(rows[0].keys())}")
    kept_rows = [r for r in rows if _is_truthy(r.get("KH?", ""))]
    print(f"  {len(rows)} rows total, {len(kept_rows)} with KH?=yes")

    all_pilots: list[dict] = []
    all_updates: list[dict] = []
    pilots_ok = 0
    pilots_skipped_yaml = 0
    updates_ok = 0
    updates_skipped = 0

    for row in kept_rows:
        pilot = map_csv_row(row)
        if pilot is None:
            continue

        original_name = pilot["name"]
        pilot = fetch_yaml_overlay(pilot, token)
        if pilot["name"] != original_name:
            pilots_skipped_yaml += 0  # yaml succeeded — don't count as skipped
        # (we track yaml-skip inside fetch_yaml_overlay via stderr warning only)

        dest = PILOTS_DIR / pilot["round"] / pilot["short_name"]
        dest.mkdir(parents=True, exist_ok=True)

        index_path = dest / "index.md"
        if not index_path.exists() and TEMPLATE_MD.exists():
            shutil.copy(TEMPLATE_MD, index_path)

        (dest / "pilot.json").write_text(
            json.dumps(pilot, indent=2, sort_keys=True, cls=_DateEncoder), encoding="utf-8"
        )
        all_pilots.append(pilot)
        pilots_ok += 1

        repo_url = pilot.get("repository_url", "")
        if repo_url:
            m = GITHUB_REPO_RE.match(repo_url)
            if m:
                owner, repo = m.group(1), m.group(2)
                idx, ok, skipped = fetch_updates(owner, repo, dest, pilot, token)
                (dest / "updates_index.json").write_text(
                    json.dumps(idx, indent=2, cls=_DateEncoder), encoding="utf-8"
                )
                all_updates.extend(idx)
                updates_ok += ok
                updates_skipped += skipped

    all_updates.sort(key=lambda x: x["date"], reverse=True)

    journey_dir = PILOTS_DIR.parent
    (journey_dir / "all_pilots.json").write_text(
        json.dumps(all_pilots, indent=2, cls=_DateEncoder), encoding="utf-8"
    )
    (journey_dir / "all_updates_index.json").write_text(
        json.dumps(all_updates[:200], indent=2, cls=_DateEncoder), encoding="utf-8"
    )

    generate_rss(all_pilots, all_updates)

    print(
        f"{pilots_ok} pilots ok, {pilots_skipped_yaml} skipped (yaml), "
        f"{updates_ok} updates ok, {updates_skipped} updates skipped"
    )


if __name__ == "__main__":
    main()
