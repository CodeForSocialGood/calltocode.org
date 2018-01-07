#!/usr/bin/env bash

set -exu -o pipefail

# build image
COMMIT_HASH=$(echo "${TRAVIS_COMMIT:0:7}")
docker build \
  --build-arg DB_PASS=$DB_PASS \
  --build-arg COMMIT_HASH=$COMMIT_HASH \
  --build-arg JWT_SIGNING_KEY=$JWT_SIGNING_KEY \
  --build-arg SENDGRID_API_KEY=$SENDGRID_API_KEY \
  --build-arg ROLLBAR_API_KEY=$ROLLBAR_API_KEY \
  --build-arg HOST_DOMAIN=$HOST_DOMAIN \
  --build-arg DB_HOST=$DB_HOST \
  --build-arg DB_REPLICA_SET=$DB_REPLICA_SET \
  -t $DOCKER_IMAGE:$TRAVIS_COMMIT .

# make sure container can start
docker run --name calltocode -d -p 3000:3000 $DOCKER_IMAGE:$TRAVIS_COMMIT; sleep 10
curl --retry 10 --retry-delay 3 -v http://localhost:3000
docker stop calltocode

# push image to registry
docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push $DOCKER_IMAGE:$TRAVIS_COMMIT
