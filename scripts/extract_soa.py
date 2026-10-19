#!/usr/bin/env python3
"""Extract full text from Cours.pdf (SOA & Services Web - Dr. Ghada Feki)."""
import fitz

doc = fitz.open("/home/z/my-project/upload/Cours.pdf")
out = []
for i, page in enumerate(doc):
    t = page.get_text().strip()
    out.append(f"\n========== PAGE {i+1} ==========\n{t}")

with open("/home/z/my-project/scripts/extracted/soa_Cours.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print(f"Extracted {len(doc)} pages -> soa_Cours.txt ({sum(len(x) for x in out)} chars)")
