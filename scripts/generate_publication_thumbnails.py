#!/usr/bin/env python3
"""Generate publication thumbnails from the paper PDFs used by the site.

The crop boxes are in PDF points and select one representative figure from
all twelve papers. The script is deterministic and runs before Jekyll builds.
"""

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "_publications"
OUTPUT_DIR = ROOT / "assets" / "images" / "publications"
DPI = 180
SCALE = DPI / 72.0

# slug: (PDF filename, one-based page number, crop box in PDF points)
FIGURES = {
    "qrac": ("qrac_counterexample.pdf", 9, (70, 45, 545, 432)),
    "gravity-ads": ("2607.00432v2.pdf", 12, (78, 145, 515, 428)),
    "open-frequency": ("2605.03340v1.pdf", 11, (88, 45, 520, 255)),
    "gravity-kn": ("s10052-026-15894-8.pdf", 7, (48, 45, 547, 287)),
    "open-rkur": ("ps1b-8l1x.pdf", 3, (45, 70, 300, 210)),
    "quantum-transport": ("PRA_113_022436_2026_Published_Article.pdf", 2, (45, 65, 297, 160)),
    "stoch-response": ("s42005-025-01982-w.pdf", 2, (72, 45, 262, 179)),
    "quantum-battery": ("PhysRevA.109.062614.pdf", 2, (108, 68, 499, 438)),
    "ml-escape": ("mori22a.pdf", 8, (50, 60, 547, 189)),
    "ml-minibatch": ("4355_strength_of_minibatch_noise_in.pdf", 13, (104, 255, 508, 371)),
    "ml-finite-lr": ("liu21ad.pdf", 6, (52, 72, 545, 185)),
    "stoch-tur": ("PhysRevLett.125.140602.pdf", 3, (48, 48, 300, 196)),
}


def require(command: str) -> None:
    if shutil.which(command) is None:
        raise RuntimeError(f"Required command not found: {command}")


def render_page(pdf: Path, page: int, output_stem: Path) -> Path:
    subprocess.run(
        [
            "pdftoppm",
            "-f", str(page),
            "-l", str(page),
            "-singlefile",
            "-png",
            "-r", str(DPI),
            str(pdf),
            str(output_stem),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    return output_stem.with_suffix(".png")


def crop_box(points: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    x0, y0, x1, y1 = points
    return tuple(round(value * SCALE) for value in (x0, y0, x1, y1))


def main() -> None:
    require("pdftoppm")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="publication-thumbnails-") as temp:
        temp_dir = Path(temp)
        for slug, (filename, page, points) in FIGURES.items():
            pdf = PDF_DIR / filename
            if not pdf.exists():
                raise FileNotFoundError(pdf)

            page_png = render_page(pdf, page, temp_dir / slug)
            with Image.open(page_png) as page_image:
                figure = page_image.convert("RGB").crop(crop_box(points))
                figure.thumbnail((900, 600), Image.Resampling.LANCZOS)
                output = OUTPUT_DIR / f"{slug}.jpg"
                figure.save(
                    output,
                    "JPEG",
                    quality=84,
                    optimize=True,
                    progressive=True,
                    subsampling="4:2:0",
                )
                print(f"generated {output.relative_to(ROOT)} ({figure.width}x{figure.height})")


if __name__ == "__main__":
    main()
