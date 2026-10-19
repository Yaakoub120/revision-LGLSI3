#!/bin/bash
# Quiz answer probe v3: click option by text, verify mastery-loop feedback.
cd /home/z/my-project
setsid ./node_modules/.bin/next dev -p 3000 > dev.log 2>&1 < /dev/null &
SERVER_PID=$!
for i in $(seq 1 20); do sleep 3; [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 20)" = "200" ] && break; done

B() { agent-browser "$@" 2>&1; }
B open http://localhost:3000 >/dev/null
B wait --load networkidle >/dev/null
B find text "SOA & WS" click >/dev/null; sleep 2
B find text "Boucle de maîtrise" click >/dev/null; sleep 2

echo "=== question shown ==="
B snapshot -i -c | rg "heading.*level=3" | head -2

echo "=== click option B ==="
B find role button click --name "Tous les nœuds" || B find role button click --name "B "
sleep 1.5

echo "=== feedback UI ==="
B snapshot -i -c | rg -i "continuer|réessayer|revoir|plus tard|bravo|correct|faux" | head -6
B errors
echo "(page errors above, if any — empty = none)"
B screenshot scripts/check-fix-quiz.png >/dev/null && echo "saved scripts/check-fix-quiz.png"
kill $SERVER_PID 2>/dev/null
B close >/dev/null 2>&1
