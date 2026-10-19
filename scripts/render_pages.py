#!/usr/bin/env python3
"""Render pages of low-text PDFs to PNG images for visual reading."""
import os
import fitz

UPLOAD = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/pdf_images"

TARGETS = {
    "Cours - Partie 3.pdf": (100, 100),   # dpi, jpg quality
    "hdfs-mapreduce-1.pdf": (100, 100),
    "BD-Nosql.pdf": (110, 100),
    "Mongodb-sharding.pdf": (110, 100),
    "Partie 1.pdf": (100, 100),
    "Partie 2.pdf": (110, 100),
}

for fn, (dpi, q) in TARGETS.items():
    src = os.path.join(UPLOAD, fn)
    base = fn.replace(".pdf", "").replace(" ", "_")
    subdir = os.path.join(OUT, base)
    os.makedirs(subdir, exist_ok=True)
    doc = fitz.open(src)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=dpi)
        out = os.path.join(subdir, f"p{i+1:02d}.png")
        pix.save(out)
    print(f"{fn}: {len(doc)} pages rendered -> {subdir}")
    doc.close()
print("DONE")
