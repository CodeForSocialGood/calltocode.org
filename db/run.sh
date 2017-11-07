#!/usr/bin/env bash

set -x

docker stop $(docker ps -q --filter ancestor=tutum/mongodb)

set -e

docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb:3.2
