#!/usr/bin/env bash

set +x -e

# Kill the app
lsof -ti tcp:3000,3001 | xargs kill

echo "--- Cleared ports 3000 and 3001"
