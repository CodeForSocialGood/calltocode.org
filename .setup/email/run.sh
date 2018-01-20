#!/usr/bin/env bash

set +x -e -o pipefail

NAME=mailhog
ID_FROM_NAME=$(docker ps -aq -f name=$NAME)
IMAGE=diyan/mailhog

start () {
  set -u
  # Make sure a container isn't already running
  if [[ -z "$ID_FROM_NAME" ]] ; then
    echo "--- Starting new docker container with MailHog.."
    docker run --name=$NAME -d -p 1025:1025 -p 8025:8025 $IMAGE \
      | xargs echo "--- Started container"  
  else
    echo "--- Skipping start, container already running"
    exit 0
  fi
}

stop () {
  set -u
  # Make sure there's a container to stop
  if [[ ! -z "$ID_FROM_NAME" ]] ; then
    ID=$ID_FROM_NAME
  else
    echo "--- Skipping stop and remove, no container found"
    exit 0
  fi

  echo "--- Stopping and removing docker container.."
  docker stop $ID | xargs echo "--- Stopped container"
  docker rm $ID | xargs echo "--- Removed container"
}

info () {
cat <<EOF
  Usage: ./email/run.sh <target>
  Targets:
    start - start a docker container with MailHog mail server
    stop - stop and remove the docker container
EOF
}

case $1 in
  start)        start         ;;
  stop)         stop          ;;
  *)            info          ;;
esac
