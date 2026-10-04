#!/bin/sh
# Corre lo mismo que CI (tests, chequeo de tipos, build, tests sobre dist/)
# y guarda la salida completa en .logs/verify.log.
mkdir -p .logs
log=.logs/verify.log
{
  echo "node $(node -v) · $(date)"
  npm run test:unit && npm run check && npm run build && npm run test:dist
  echo "EXIT $?"
} > "$log" 2>&1
tail -n 3 "$log"
