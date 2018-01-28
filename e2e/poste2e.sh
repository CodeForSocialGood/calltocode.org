#!/usr/bin/env bash

set -ex

# kill the app
lsof -ti tcp:3000,3001 | xargs kill -9 --no-run-if-empty
