#!/bin/bash
# Quarantine legacy (Oct 17-18 iteration) files that shadow/conflict with the live learn platform.
# Moves (not deletes) into /home/z/my-project/legacy_backup/ — fully reversible.
set -e
cd /home/z/my-project

BK=legacy_backup
mkdir -p "$BK/components" "$BK/data" "$BK/types"

echo "--- Moving legacy data files ---"
# The direct culprit: subjects.ts shadows the subjects/ directory in module resolution
mv src/data/subjects.ts "$BK/data/" 2>/dev/null || echo "  (subjects.ts already moved)"
# Legacy data dirs & files (referenced only by legacy components)
for f in bigdata dar iot modules quiz vcloud; do
  [ -d "src/data/$f" ] && mv "src/data/$f" "$BK/data/" && echo "  data/$f/"
done
for f in commands.ts glossary.ts module1.ts module2.ts module3.ts module4.ts module5.ts modules.ts quiz.ts types.ts; do
  [ -f "src/data/$f" ] && mv "src/data/$f" "$BK/data/" && echo "  data/$f"
done

echo "--- Moving legacy components ---"
for f in BlockRenderer.tsx bigdata course dar diagrams iot quiz vcloud; do
  [ -e "src/components/$f" ] && mv "src/components/$f" "$BK/components/" && echo "  components/$f"
done

echo "--- Moving legacy types ---"
[ -f src/types/course.ts ] && mv src/types/course.ts "$BK/types/" && echo "  types/course.ts"
rmdir src/types 2>/dev/null && echo "  (empty src/types removed)" || true

echo ""
echo "=== Remaining live tree ==="
ls src/data/ src/components/ src/types 2>/dev/null || true
echo "Done."
