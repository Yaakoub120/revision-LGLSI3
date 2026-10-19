#!/usr/bin/env python3
"""Render image-based pages of Cours.pdf (SOA course) for visual reading."""
import fitz

doc = fitz.open("/home/z/my-project/upload/Cours.pdf")
pages = [16, 20, 21, 22, 29, 31, 47, 49, 99, 114, 117, 131, 134, 136, 137,
         138, 144, 145, 146, 147, 151, 153, 154, 155, 156, 157, 158, 159,
         161, 163, 164, 165, 166, 168, 169, 181, 197, 256, 257, 258, 259,
         263, 264, 279]
import os
os.makedirs("/home/z/my-project/scripts/soa_images", exist_ok=True)
for p in pages:
    page = doc[p - 1]
    pix = page.get_pixmap(dpi=150)
    pix.save(f"/home/z/my-project/scripts/soa_images/page_{p:03d}.png")
print(f"Rendered {len(pages)} pages")
