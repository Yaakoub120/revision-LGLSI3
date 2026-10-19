#!/usr/bin/env python3
"""Move the Toast/menus/AlertDialog cmd block from the TP3 section (misplaced)
into the styles chapter's "Les boîtes de dialogues" section of android.ts."""
import io

PATH = "/home/z/my-project/src/data/subjects/android.ts"
with io.open(PATH, encoding="utf-8") as f:
    lines = f.readlines()

# 1. Locate the misplaced cmd block inside TP3 (contains "Toast.makeText(ctx, msg")
start = end = None
for i, l in enumerate(lines):
    if "Toast.makeText(ctx, msg, Toast.LENGTH_SHORT).show()" in l:
        # walk back to the block opener "            {\n              type: \"cmd\","
        j = i - 2
        assert 'type: "cmd"' in lines[j], lines[j]
        start = j
        # walk forward to the block closer "            },"
        k = i + 1
        while "            }," not in lines[k]:
            k += 1
        end = k  # inclusive
        break
assert start is not None and end is not None, "block not found"
block = lines[start : end + 1]
# normalise the ZWSP line
block = [l.replace("\u200b", "") for l in block]
block = [
    l.replace("builder.setIcon/setTitle/setMessage", "builder.setIcon(...) / setTitle(...) / setMessage(...)")
    for l in block
]
del lines[start : end + 1]

# 2. Insert into the styles chapter, after the AlertDialog builder.show(); code block
anchor = None
for i, l in enumerate(lines):
    if "builder.show();'," in l:
        anchor = i
        break
assert anchor is not None, "styles anchor not found"
insert_at = anchor + 2  # skip the closing "            }," of the code block
assert lines[anchor + 1].strip() == "},", lines[anchor + 1]
lines[insert_at:insert_at] = ["\n"] + block + ["\n"]

with io.open(PATH, "w", encoding="utf-8") as f:
    f.writelines(lines)
print("moved cmd block: removed from TP3, inserted into styles chapter after AlertDialog code")
