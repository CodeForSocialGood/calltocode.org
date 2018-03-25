#!/usr/bin/env bash

# set up selenium server
pkill -f selenium-standalone
./node_modules/.bin/selenium-standalone install

set -ex

# run selenium server
./node_modules/.bin/selenium-standalone start &

# run app
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
