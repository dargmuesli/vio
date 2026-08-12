#!/bin/sh
set -eu

if [ "${NODE_ENV:-}" != "production" ]; then
  bun install --cache-dir "/srv/.bun/install/cache"
fi

exec "$@"
