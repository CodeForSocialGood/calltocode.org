#!/usr/bin/env bash

set -ex

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
