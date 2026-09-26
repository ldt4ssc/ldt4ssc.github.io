"""MkDocs hook: copy pilot updates/ directories verbatim into the site output.

MkDocs does not copy .md files that are not registered in the nav.
This hook runs after the build and copies every
  docs/journey/pilots/<round>/<short_name>/updates/*.md
into the equivalent path under site/.
"""

import shutil
from pathlib import Path


def on_post_build(config, **kwargs):
    docs_dir = Path(config["docs_dir"])
    site_dir = Path(config["site_dir"])

    pilots_root = docs_dir / "journey" / "pilots"
    if not pilots_root.exists():
        return

    for updates_dir in pilots_root.glob("*/*/updates"):
        if not updates_dir.is_dir():
            continue
        rel = updates_dir.relative_to(docs_dir)
        dest = site_dir / rel
        dest.mkdir(parents=True, exist_ok=True)
        for src_file in updates_dir.iterdir():
            if src_file.is_file():
                shutil.copy2(src_file, dest / src_file.name)
