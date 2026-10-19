"""Extract the 3 newly uploaded 'Chapitre N.pdf' files under distinct names
to avoid clobbering the original réparties extraction artifacts."""
import fitz  # PyMuPDF
import os, re

SRC = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/extracted"
os.makedirs(OUT, exist_ok=True)

files = ["Chapitre 1.pdf", "Chapitre 2.pdf", "Chapitre 3.pdf"]

for f in files:
    path = os.path.join(SRC, f)
    doc = fitz.open(path)
    tag = "chapnouveau_" + re.sub(r"[^A-Za-z0-9]", "_", f[:-4])
    parts = []
    for i, page in enumerate(doc):
        txt = page.get_text("text").strip()
        parts.append(f"\n===== PAGE {i+1}/{len(doc)} =====\n{txt}")
    body = "\n".join(parts)
    with open(os.path.join(OUT, tag + ".txt"), "w", encoding="utf-8") as fh:
        fh.write(body)
    n_img = sum(len(p.get_images(full=True)) for p in doc)
    print(f"{f}: {len(doc)} pages, {n_img} images, {len(body)} chars -> extracted/{tag}.txt")
    doc.close()
