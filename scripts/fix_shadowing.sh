#!/bin/bash
# HARD-DELETE the Oct 17-18 legacy files from src/ (not mv — a sandbox snapshot
# restore resurrected them once already, re-breaking module resolution).
# Reference copies live in legacy_backup/ (verified byte-identical).
# Re-runnable any time: if the 500 ("Export totalQuizQuestions doesn't exist")
# ever comes back, run this + restart the dev server.
set -e
cd /home/z/my-project

echo "--- Deleting shadowing legacy data (src/data) ---"
rm -f  src/data/subjects.ts
rm -rf src/data/bigdata src/data/dar src/data/iot src/data/modules src/data/quiz src/data/vcloud
rm -f  src/data/commands.ts src/data/glossary.ts src/data/module1.ts src/data/module2.ts \
       src/data/module3.ts src/data/module4.ts src/data/module5.ts src/data/modules.ts \
       src/data/quiz.ts src/data/types.ts

echo "--- Deleting legacy components (src/components) ---"
rm -f  src/components/BlockRenderer.tsx
rm -rf src/components/bigdata src/components/course src/components/dar \
       src/components/diagrams src/components/iot src/components/quiz src/components/vcloud

echo "--- Deleting legacy types (src/types) ---"
rm -rf src/types

echo "--- Remaining live tree ---"
ls src/data/ src/components/
echo "Done. Now restart the dev server (or let Turbopack hot-reload)."
