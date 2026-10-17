#!/usr/bin/env python3
"""Publish student-facing resources directly from the public course repository.

The course repository remains the authoritative source. This script packages
the currently committed PDF and executable browser labs with the existing
personal website only at deployment time; there is no second maintained copy.
"""
from pathlib import Path
from shutil import copy2, copytree
import json
import re
import hashlib
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
source = root / "course-source"
target = root / "_site/courses/advanced-quantum-mechanics"

pdf = source / "pdf/advanced-quantum-mechanics.pdf"
companion = source / "companion"
assert pdf.is_file() and pdf.stat().st_size > 500_000, "Missing or undersized PDF"
assert pdf.open("rb").read(5) == b"%PDF-", "Invalid PDF file signature"
catalog = json.loads((companion/"catalog.json").read_text(encoding="utf-8"))
labs = catalog["labs"]
assert len(catalog["chapters"]) == 9
assert sum(item.get("category")=="featured" for item in labs) == 27
assert sum(item.get("category")=="foundation" for item in labs) == 8
assert sum(bool(item.get("page")) for item in labs) == 35
assert sum(item.get("category")=="reading" for item in labs) == 27

# Every live experiment must have a precisely placed clickable study guide
# in the LaTeX notes from which the published PDF is built.
subprocess.run(
    [sys.executable, str(source / "scripts/check_interactive_guides.py")],
    cwd=source,
    check=True,
)


target.mkdir(parents=True, exist_ok=True)
(target / "pdf").mkdir(parents=True, exist_ok=True)
copy2(pdf, target / "pdf/advanced-quantum-mechanics.pdf")
assert hashlib.sha256(pdf.read_bytes()).digest() == hashlib.sha256(
    (target / "pdf/advanced-quantum-mechanics.pdf").read_bytes()).digest(), "PDF packaging mismatch"
copytree(companion, target / "companion", dirs_exist_ok=True,
         ignore=lambda folder,names: {"notebooks"}.intersection(names))

for item in labs:
    if item.get("page"):
        page = target / "companion" / item["page"]
        assert page.is_file(), item["id"]
        for filename in ("model.js", "lab.js"):
            assert (page.parent / filename).is_file(), (item["id"], filename)

for name in ("index.html","reading.html","catalog.json",
             "assets/site.css","assets/site.js","assets/lab-core.js",
             "assets/reading.js","assets/lab.css"):
    assert (target/"companion"/name).is_file(), name

for page in ("_site/teaching/index.html","_site/teaching_zh/index.html",
             "_site/projects/index.html","_site/projects_zh/index.html"):
    html = root / page
    assert html.is_file(), "Missing course entry page: " + page
    s = html.read_text(encoding="utf-8")
    assert "/courses/advanced-quantum-mechanics/companion/" in s, page
    assert "/courses/advanced-quantum-mechanics/pdf/advanced-quantum-mechanics.pdf" in s, page

assert (target/"companion/index.html").stat().st_size >= 3000
assert (target/"companion/labs/IC-08-02/index.html").stat().st_size >= 6500
print("Published open course PDF and all 35 interactive labs from their public source.")
print("Validated bilingual Teaching / Projects navigation to the deployed course URLs.")
