#!/usr/bin/env python3
"""Extract text from all uploaded PDFs into per-file text files."""
import os, sys
import fitz  # PyMuPDF

UPLOAD = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/extracted"
os.makedirs(OUT, exist_ok=True)

def extract_fitz(path, outpath):
    doc = fitz.open(path)
    parts = []
    for i, page in enumerate(doc):
        parts.append(f"\n===== PAGE {i+1} =====\n")
        parts.append(page.get_text("text"))
    doc.close()
    with open(outpath, "w", encoding="utf-8") as f:
        f.write("".join(parts))

files = sorted(os.listdir(UPLOAD))
summary = []
for fn in files:
    if not fn.lower().endswith(".pdf"):
        continue
    src = os.path.join(UPLOAD, fn)
    base = fn.replace(".pdf", "").replace(" ", "_")
    out = os.path.join(OUT, base + ".txt")
    try:
        extract_fitz(src, out)
        with open(out, encoding="utf-8") as f:
            content = f.read()
        summary.append(f"{fn} | pages={content.count('===== PAGE')} | {len(content)} chars")
    except Exception as e:
        summary.append(f"{fn} -> ERROR: {e}")

print("\n".join(summary))
