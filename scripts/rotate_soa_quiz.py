#!/usr/bin/env python3
"""Rotate quiz options in soa-services-web.ts so the correct answer index is
distributed across 0..3 (the quiz engine does not shuffle options)."""
import re

PATH = "/home/z/my-project/src/data/subjects/soa-services-web.ts"

def parse_strings(block: str):
    """Split a '[...]' block body into top-level quoted strings."""
    items, buf, in_str, esc = [], [], False, False
    for ch in block:
        if in_str:
            buf.append(ch)
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
                items.append("".join(buf))
                buf = []
        else:
            if ch == '"':
                in_str = True
                buf = [ch]
    return items

def find_block_end(line: str, start: int) -> int:
    """Given index just after 'options: [', return index of matching ']'."""
    in_str, esc = False, False
    for i in range(start, len(line)):
        ch = line[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
        else:
            if ch == '"':
                in_str = True
            elif ch == "]":
                return i
    raise ValueError("no closing bracket")

def rotate(line: str) -> str:
    m = re.search(r'id: "(soa\d-\d+)"', line)
    if not m or "correct:" not in line:
        return line
    qid = m.group(1)
    oi = line.index("options: [") + len("options: [")
    oe = find_block_end(line, oi)
    options = parse_strings(line[oi:oe])
    cm = re.search(r"correct: (\d+)", line)
    correct = int(cm.group(1))
    if len(options) != 4:
        return line
    k = sum(ord(c) for c in qid) % 4
    if k == 0:
        return line
    rotated = options[k:] + options[:k]
    new_correct = (correct - k) % 4
    return line[:oi] + ", ".join(rotated) + line[oe:] + "", cm, new_correct, k

def main():
    with open(PATH, encoding="utf-8") as f:
        lines = f.readlines()
    out, fixed = [], 0
    dist = {0: 0, 1: 0, 2: 0, 3: 0}
    for line in lines:
        if '"correct' in line or ("id: \"soa" in line and "correct:" in line):
            m = re.search(r'id: "(soa\d-\d+)"', line)
            if m:
                qid = m.group(1)
                oi = line.index("options: [") + len("options: [")
                oe = find_block_end(line, oi)
                options = parse_strings(line[oi:oe])
                cm = re.search(r"correct: (\d+)", line)
                correct = int(cm.group(1))
                if len(options) == 4:
                    k = sum(ord(c) for c in qid) % 4
                    if k > 0:
                        options = options[k:] + options[:k]
                        correct = (correct - k) % 4
                        fixed += 1
                    dist[correct] += 1
                    line = line[:oi] + ", ".join(options) + line[oe:]
                    line = re.sub(r"correct: \d+", f"correct: {correct}", line, count=1)
        out.append(line)
    with open(PATH, "w", encoding="utf-8") as f:
        f.writelines(out)
    print(f"Rotated {fixed} questions; correct-index distribution: {dist}")

if __name__ == "__main__":
    main()
