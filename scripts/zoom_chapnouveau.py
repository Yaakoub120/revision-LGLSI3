"""Crop-zoom specific regions of the new chapter scans for accurate reading."""
import fitz, os

SRC = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts/chapnouveau_images"

# Page 4 of Chapitre 3 (index 3): right column, permutation exercise P
doc = fitz.open(os.path.join(SRC, "Chapitre 3.pdf"))
page = doc[3]
w, h = page.rect.width, page.rect.height
# right half, upper-middle region
clip = fitz.Rect(w*0.5, h*0.28, w, h*0.62)
pix = page.get_pixmap(dpi=300, clip=clip)
pix.save(os.path.join(OUT, "zoom_c3_p4_perm.png"))
print("zoom_c3_p4_perm.png saved", pix.width, "x", pix.height)

# Page 4 bottom right: inverse table + question e
clip2 = fitz.Rect(w*0.5, h*0.55, w, h*0.85)
pix2 = page.get_pixmap(dpi=300, clip=clip2)
pix2.save(os.path.join(OUT, "zoom_c3_p4_inv.png"))
print("zoom_c3_p4_inv.png saved", pix2.width, "x", pix2.height)
doc.close()

# Page 6 of Chapitre 3 (index 5): S-box tables S1/S2
doc = fitz.open(os.path.join(SRC, "Chapitre 3.pdf"))
page = doc[5]
w, h = page.rect.width, page.rect.height
clip = fitz.Rect(w*0.5, h*0.30, w, h*0.75)
pix = page.get_pixmap(dpi=300, clip=clip)
pix.save(os.path.join(OUT, "zoom_c3_p6_sbox.png"))
print("zoom_c3_p6_sbox.png saved")
doc.close()
