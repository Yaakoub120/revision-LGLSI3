#!/usr/bin/env python3
"""Extract text from the 9 new Android course PDFs (Programmation Mobile, FSM).
Output: scripts/extracted/android_<name>.txt  (distinct prefix to avoid
collision with the old Big Data Partie_1/2 extractions)."""
import os
import fitz  # PyMuPDF

UPLOAD = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/extracted"
os.makedirs(OUT, exist_ok=True)

FILES = [
    "Partie 1.pdf", "Partie 2.pdf", "Partie 3.pdf", "Partie 4.pdf",
    "Partie 5.pdf", "QCM-DS_EXAM-Mobile.pdf", "TP1.pdf", "TP2.pdf", "TP3.pdf",
]

for fn in FILES:
    src = os.path.join(UPLOAD, fn)
    base = fn.replace(".pdf", "").replace(" ", "_").replace("-", "_")
    out = os.path.join(OUT, f"android_{base}.txt")
    doc = fitz.open(src)
    parts = []
    for i, page in enumerate(doc):
        parts.append(f"\n===== PAGE {i+1} =====\n")
        parts.append(page.get_text("text"))
    doc.close()
    content = "".join(parts)
    with open(out, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"{fn} | pages={content.count('===== PAGE')} | {len(content)} chars | images-dense={'YES' if len(content)/max(1, content.count('===== PAGE')) < 120 else 'no'}")
