#!/usr/bin/env bash

set +x

# Kill the app
APP_PORT=3000
APP_WATCH_PORT=3001
APP_PID=$(lsof -ti tcp:$APP_PORT)
APP_WATCH_PID=$(lsof -ti tcp:$APP_WATCH_PORT)

set -e

# Make sure there is something to kill
if [[ ! -z $APP_PID ]] ; then
  kill -9 $APP_PID
fi

# Make sure there is something to kill
if [[ ! -z $APP_WATCH_PID ]] ; then
  kill -9 $APP_WATCH_PID
fi

echo "--- Cleared ports $APP_PORT and $APP_WATCH_PORT"
