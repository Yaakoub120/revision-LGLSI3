#!/usr/bin/env python3
"""Render pages of the new Android course PDFs to PNG for visual reading.
Partie 1/3/4/5 are image-based scans; Partie 2 rendered too (diagram slides)."""
import os
import fitz

UPLOAD = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/pdf_images"

TARGETS = {
    "Partie 1.pdf": 150,
    "Partie 2.pdf": 150,
    "Partie 3.pdf": 150,
    "Partie 4.pdf": 150,
    "Partie 5.pdf": 150,
}

for fn, dpi in TARGETS.items():
    src = os.path.join(UPLOAD, fn)
    base = fn.replace(".pdf", "").replace(" ", "_")
    subdir = os.path.join(OUT, f"android_{base}")
    os.makedirs(subdir, exist_ok=True)
    doc = fitz.open(src)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=dpi)
        out = os.path.join(subdir, f"p{i+1:02d}.png")
        pix.save(out)
    print(f"{fn}: {len(doc)} pages rendered -> {subdir}")
    doc.close()
print("DONE")
