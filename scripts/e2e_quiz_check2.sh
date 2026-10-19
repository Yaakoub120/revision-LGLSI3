#!/bin/bash
# Quiz answer probe v2: click first quiz option, verify mastery-loop feedback buttons.
cd /home/z/my-project
setsid ./node_modules/.bin/next dev -p 3000 > dev.log 2>&1 < /dev/null &
SERVER_PID=$!
for i in $(seq 1 20); do sleep 3; [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 20)" = "200" ] && break; done

B() { agent-browser "$@" 2>&1; }
B open http://localhost:3000 >/dev/null
B wait --load networkidle >/dev/null
B find text "SOA & WS" click >/dev/null; sleep 2
B find text "Boucle de maîtrise" click >/dev/null; sleep 2

echo "=== quiz question area ==="
B snapshot -i -c | head -25

echo "=== click an option (first option-ish button) ==="
# options are buttons after the question text; pick a ref from snapshot
REF=""
import json,sys
d=json.load(sys.stdin)
refs=[e.get('ref') for e in d if isinstance(e,dict)]
print(refs[0] if refs else '')")
echo "picked ref: $REF"
B find text "A Sa légèreté" click; sleep 1.5

echo "=== state after answer ==="
B snapshot -i -c | rg -i "continuer|réessayer|correct|faux|revoir" | head -6
B errors; echo "(page errors above, if any)"
B screenshot scripts/check-fix-quiz.png >/dev/null && echo "saved scripts/check-fix-quiz.png"
kill $SERVER_PID 2>/dev/null
B close >/dev/null 2>&1
