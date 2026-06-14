#!/usr/bin/env python3
"""
LDT4SSC pilot update validator.

Walks the updates/ folder, parses each update file's YAML front matter,
routes it to the correct schema based on its declared schema_version,
and validates it. Reports all errors found and exits non-zero if any
update is invalid.

This script is run by the validate-updates GitHub Actions workflow.
"""

import datetime
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

import yaml
from jsonschema import Draft202012Validator
from jsonschema.exceptions import ValidationError

# When run from GitHub Actions the calling repo is checked out at GITHUB_WORKSPACE.
# Fall back to deriving the root from this file's location for local runs.
REPO_ROOT = Path(os.environ.get("GITHUB_WORKSPACE", Path(__file__).resolve().parents[2]))
UPDATES_DIR = REPO_ROOT / "updates"

SCHEMA_BASE_URL = os.environ.get(
    "SCHEMA_BASE_URL", "https://knowledgehub.ldt4ssc.eu/assets/"
)

FRONT_MATTER_PATTERN = re.compile(
    r"^---\s*\n(.*?)\n---\s*\n(.*)$", re.DOTALL
)

FILENAME_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$")


def find_update_files():
    """Find all update markdown files, excluding examples and schema folder."""
    if not UPDATES_DIR.is_dir():
        return []
    files = []
    for path in sorted(UPDATES_DIR.rglob("*.md")):
        if any(part.startswith("_") for part in path.relative_to(UPDATES_DIR).parts):
            continue
        if path.name == "README.md":
            continue
        files.append(path)
    return files


def parse_front_matter(file_path):
    """Extract and parse the YAML front matter from an update file."""
    text = file_path.read_text(encoding="utf-8")
    match = FRONT_MATTER_PATTERN.match(text)
    if not match:
        raise ValueError(
            "File does not start with a valid YAML front matter block. "
            "Make sure the file begins with '---' on its own line, "
            "followed by YAML fields, then '---' on its own line, "
            "and only then the body of the update."
        )
    front_matter_text = match.group(1)
    try:
        front_matter = yaml.safe_load(front_matter_text)
    except yaml.YAMLError as e:
        raise ValueError(
            f"YAML parse error in front matter: {e}. "
            "Common causes: tabs instead of spaces, missing colons, "
            "or unbalanced quotes."
        )
    if not isinstance(front_matter, dict):
        raise ValueError(
            "Front matter must be a YAML mapping (key-value pairs). "
            "Check that each line follows the 'key: value' pattern."
        )
    return front_matter


def normalise_for_schema(value):
    """Recursively convert YAML-parsed dates and datetimes to ISO strings."""
    if isinstance(value, datetime.datetime):
        return value.isoformat()
    if isinstance(value, datetime.date):
        return value.isoformat()
    if isinstance(value, dict):
        return {k: normalise_for_schema(v) for k, v in value.items()}
    if isinstance(value, list):
        return [normalise_for_schema(v) for v in value]
    return value


def load_schema(schema_version):
    """Fetch the schema for the declared version from the central knowledge hub."""
    url = f"{SCHEMA_BASE_URL.rstrip('/')}/update-v{schema_version}.schema.json"
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 404:
            raise FileNotFoundError(
                f"No schema found for schema_version={schema_version} at {url}. "
                "If you are using a newer schema version, check that it has been "
                "published to the LDT4SSC Knowledge Hub."
            ) from e
        raise RuntimeError(f"HTTP {e.code} fetching schema from {url}.") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Could not reach schema URL {url}: {e.reason}") from e


def validate_filename(file_path):
    """Check that the filename follows the YYYY-MM-DD-short-title.md pattern."""
    if not FILENAME_PATTERN.match(file_path.name):
        raise ValueError(
            f"Filename '{file_path.name}' does not match the required pattern. "
            "Filenames must follow 'YYYY-MM-DD-short-title.md' — a date in "
            "ISO format, a descriptive slug in lowercase with hyphens, and "
            "the .md extension. Example: 2026-03-14-first-integration.md."
        )


def humanise_error(err, front_matter):
    """Turn a jsonschema ValidationError into a clearer message for pilots."""
    path = ".".join(str(p) for p in err.absolute_path) or "(root)"
    validator = err.validator
    validator_value = err.validator_value

    # Friendlier messages for the common cases
    if validator == "enum":
        field = err.absolute_path[-1] if err.absolute_path else "(root)"
        allowed = ", ".join(repr(v) for v in validator_value)
        return (
            f"Field '{field}' has value {err.instance!r}, which is not allowed. "
            f"Allowed values are: {allowed}."
        )

    if validator == "required":
        missing = validator_value
        if isinstance(validator_value, list):
            # Find which specific field is missing
            present = set(err.instance.keys()) if isinstance(err.instance, dict) else set()
            missing = [f for f in validator_value if f not in present]
            missing_str = ", ".join(missing) if missing else ", ".join(validator_value)
            return f"Required field(s) missing at '{path}': {missing_str}."
        return f"Required field missing at '{path}': {validator_value}."

    if validator == "type":
        expected = validator_value
        got = type(err.instance).__name__
        return (
            f"Field at '{path}' should be of type {expected!r}, "
            f"but got {got} ({err.instance!r})."
        )

    if validator == "format":
        expected = validator_value
        hints = {
            "date": "a date in ISO format (YYYY-MM-DD, e.g. 2026-03-14)",
            "uri": "a full URL including the scheme (e.g. https://example.org/...)",
        }
        hint = hints.get(expected, f"format '{expected}'")
        return f"Field at '{path}' must be {hint}. Got {err.instance!r}."

    if validator == "pattern":
        return (
            f"Field at '{path}' has value {err.instance!r}, which does not match "
            f"the required pattern. For tags, use lowercase letters, numbers, "
            f"and hyphens only (e.g. 'air-quality', not 'Air Quality')."
        )

    if validator == "minLength":
        return (
            f"Field at '{path}' is too short ({len(err.instance)} characters). "
            f"It must have at least {validator_value} characters."
        )

    if validator == "maxLength":
        return (
            f"Field at '{path}' is too long ({len(err.instance)} characters). "
            f"It must have at most {validator_value} characters."
        )

    if validator == "const":
        return (
            f"Field at '{path}' has value {err.instance!r}, but must be exactly "
            f"{validator_value!r} for this schema version."
        )

    if validator == "additionalProperties":
        match = re.search(r"\('(.+?)' was unexpected\)", err.message)
        if match:
            unexpected = match.group(1)
            return (
                f"Unexpected field '{unexpected}'{' at ' + path if path != '(root)' else ''}. "
                "Check for typos — field names are case-sensitive and must match "
                "the schema exactly."
            )

    # Fallback: raw jsonschema message
    return f"Schema error at '{path}': {err.message}"


def validate_file(file_path):
    """Validate a single update file. Returns a list of error messages."""
    errors = []

    try:
        validate_filename(file_path)
    except ValueError as e:
        errors.append(f"  {e}")

    try:
        front_matter = parse_front_matter(file_path)
    except ValueError as e:
        errors.append(f"  {e}")
        return errors

    front_matter = normalise_for_schema(front_matter)

    schema_version = front_matter.get("schema_version")
    if schema_version is None:
        errors.append(
            "  Missing required field 'schema_version'. "
            "All updates must declare a schema version. For the current "
            "schema, use 'schema_version: 1'."
        )
        return errors

    try:
        schema = load_schema(schema_version)
    except (FileNotFoundError, RuntimeError) as e:
        errors.append(f"  {e}")
        return errors

    validator = Draft202012Validator(schema)
    schema_errors = sorted(validator.iter_errors(front_matter), key=lambda e: list(e.path))
    for err in schema_errors:
        errors.append(f"  {humanise_error(err, front_matter)}")

    return errors


def print_footer_on_failure():
    """Print a helpful pointer to examples and support when validation fails."""
    print("-" * 72)
    print(
        "For help, see:\n"
        "  - The worked examples in updates/_examples/\n"
        f"  - The update schema at {SCHEMA_BASE_URL.rstrip('/')}/update-v1.schema.json\n"
        "  - The full guidance in the LDT4SSC Pilot Update Guide\n"
        "  - The LDT4SSC Help Desk if you are stuck."
    )
    print("-" * 72)


def main():
    files = find_update_files()
    if not files:
        print("No update files to validate.")
        return 0

    print(f"Validating {len(files)} update file(s)...\n")

    total_errors = 0
    for file_path in files:
        rel_path = file_path.relative_to(REPO_ROOT)
        errors = validate_file(file_path)
        if errors:
            print(f"FAIL: {rel_path}")
            for err in errors:
                print(err)
            print()
            total_errors += len(errors)
        else:
            print(f"OK:   {rel_path}")

    print()
    if total_errors:
        print(f"Validation failed with {total_errors} error(s).")
        print_footer_on_failure()
        return 1
    else:
        print("All updates valid.")
        return 0


if __name__ == "__main__":
    sys.exit(main())