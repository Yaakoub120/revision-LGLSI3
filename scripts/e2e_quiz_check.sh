#!/bin/bash
# Quiz interaction probe: open SOA subject -> quiz tab -> answer -> verify mastery-loop UI.
cd /home/z/my-project
setsid ./node_modules/.bin/next dev -p 3000 > dev.log 2>&1 < /dev/null &
SERVER_PID=$!
for i in $(seq 1 20); do sleep 3; [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 20)" = "200" ] && break; done
echo "server: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 20)"

B() { agent-browser "$@" 2>&1; }
B open http://localhost:3000 >/dev/null
B wait --load networkidle >/dev/null

echo "=== open SOA subject ==="
B find text "SOA & WS" click
sleep 2
B snapshot -i -c | rg -i "Cours|Boucle|maîtrise|quiz|Commandes" | head -8

echo "=== go to quiz tab ==="
B find text "Boucle de maîtrise" click || B find text "Quiz" click
sleep 2
B snapshot -i -c | rg -i "question|vrai|faux|a\)|b\)|c\)|d\)" | head -10

echo "=== answer the question ==="
B find role radio check --name ".*" 2>/dev/null | head -2
B snapshot -i -c | rg -i "radio|option" | head -6
