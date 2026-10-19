"""Render the 3 new 'Chapitre N.pdf' files (image-based) to PNGs for visual reading."""
import fitz, os

SRC = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/chapnouveau_images"
os.makedirs(OUT, exist_ok=True)

for f, tag in [("Chapitre 1.pdf", "c1"), ("Chapitre 2.pdf", "c2"), ("Chapitre 3.pdf", "c3")]:
    doc = fitz.open(os.path.join(SRC, f))
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        out = os.path.join(OUT, f"{tag}_p{i+1:02d}.png")
        pix.save(out)
    print(f"{f}: {len(doc)} pages rendered as {tag}_p*.png")
    doc.close()
