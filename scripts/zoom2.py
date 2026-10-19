import fitz, os
SRC = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/chapnouveau_images"
doc = fitz.open(os.path.join(SRC, "Chapitre 3.pdf"))
page = doc[1]  # PDF page 2 = doc pages 3-4
w, h = page.rect.width, page.rect.height
clip = fitz.Rect(w*0.5, h*0.42, w*1.0, h*0.95)
pix = page.get_pixmap(dpi=300, clip=clip)
pix.save(os.path.join(OUT, "zoom_c3_p2_perm.png"))
print("saved", pix.width, pix.height)
doc.close()
