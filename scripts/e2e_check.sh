#!/bin/bash
# One-shot E2E check: boot dev server, browse home + subject + quiz, report errors.
cd /home/z/my-project
setsid ./node_modules/.bin/next dev -p 3000 > dev.log 2>&1 < /dev/null &
SERVER_PID=$!

# Wait for HTTP 200
ok=""
for i in $(seq 1 20); do
  sleep 3
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 20)
  if [ "$code" = "200" ]; then ok=yes; echo "server ready after ~$((i*3))s (HTTP 200)"; break; fi
done
if [ -z "$ok" ]; then echo "SERVER FAILED TO START"; tail -20 dev.log; kill $SERVER_PID 2>/dev/null; exit 1; fi

B() { agent-browser "$@" 2>&1; }

echo "=== 1. Home page ==="
B open http://localhost:3000
B wait --load networkidle
B get title
echo "--- subject cards ---"
B get count "[data-subject-id], a[href^='/'], h3"

echo "=== 2. Home snapshot (subjects visible?) ==="
B snapshot -c -d 4 | rg -i "sujets|SOA|Sécurité|Machine Learning|Admin Linux|Android|IoT|Big Data|Virtualisation|Réparties" | head -20

echo "=== 3. Console + page errors ==="
B errors
B console | rg -i "error|warn" | head -10 || echo "(no console errors/warnings)"

echo "=== 4. Screenshot home ==="
B screenshot scripts/check-fix-home.png >/dev/null && echo "saved scripts/check-fix-home.png"

echo "=== done ==="
kill $SERVER_PID 2>/dev/null
B close >/dev/null 2>&1
