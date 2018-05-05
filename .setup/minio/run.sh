#!/usr/bin/env bash

set +x -e -o pipefail

NAME=minio
ID_FROM_NAME=$(docker ps -aq -f name=$NAME)
IMAGE=minio/minio

start () {
  set -u
  # Make sure a container isn't already running
  if [[ -z "$ID_FROM_NAME" ]] ; then
    echo "--- Starting new docker container with Minio.."
    docker run --name=$NAME -d -p 9000:9000 \
    -e "MINIO_ACCESS_KEY=minioAccessKey" \
    -e "MINIO_SECRET_KEY=minioSecretKey" \
    $IMAGE server /data \
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
  Usage: ./minio/run.sh <target>
  Targets:
    start - start a docker container with minio content server
    stop - stop and remove the docker container
EOF
}

case $1 in
  start)        start         ;;
  stop)         stop          ;;
  *)            info          ;;
esac
