#!/usr/bin/env bash

set -x

# kill app
APP_PID=$(lsof -t -i:3000)
APP_WATCH_PID=$(lsof -t -i:3001)
DB_PID=$(lsof -t -i:27017)
DB_ALT_PID=$(lsof -t -i:28017)
if [ -n $APP_PID ]; then kill $APP_PID; fi
if [ -n $APP_WATCH_PID ]; then kill $APP_WATCH_PID; fi
if [ -n $DB_PID ]; then kill $DB_PID; fi
if [ -n $DB_ALT_PID ]; then kill $DB_ALT_PID; fi

set -e

# make sure app is running
FILE=e2e.log
rm -f $FILE
touch $FILE
yarn restart &>$FILE &
set +x
tail -f $FILE | while read LINE
do
  echo $LINE
  [[ "$LINE" == *"Child html-webpack-plugin for"* ]] && break
done
