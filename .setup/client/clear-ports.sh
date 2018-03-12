#!/usr/bin/env bash

set +x

APP_PORT=3000
APP_WATCH_PORT=3001
APP_PIDs=$(lsof -ti tcp:$APP_PORT,$APP_WATCH_PORT)

set -e

# Make sure there is something to kill
if [[ ! -z "$APP_PIDs" ]] ; then
  kill -9 $APP_PIDs
  echo "--- Cleared ports $APP_PORT and $APP_WATCH_PORT"
else
  echo "--- Skipping port clear, nothing running on ports $APP_PORT or $APP_WATCH_PORT"
fi
