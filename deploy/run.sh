#!/usr/bin/env bash

set -e

DEPLOY_DIST_DIR=deploy/dist

build () {
  set -x
  rm -rf $DEPLOY_DIST_DIR/
  mkdir -p $DEPLOY_DIST_DIR/client/
  yarn build
  cp -R client/dist/. $DEPLOY_DIST_DIR/client/
  cp -R server/. $DEPLOY_DIST_DIR/
  rm -r $DEPLOY_DIST_DIR/*.test.js $DEPLOY_DIST_DIR/**/*.test.js
}

start () {
  set -x
  pushd deploy/
    docker-compose stop
    docker-compose rm -vf
    docker-compose up -d db
    docker-compose exec db mongoimport --db admin --collection users --file /seedData/users.json
    docker-compose exec db mongoimport --db admin --collection opportunities --file /seedData/opportunities.json
    docker-compose up -d app
  popd
}

info () {
cat <<EOF
  Usage: ./deploy/run.sh <target>
  Targets:
    build - bundles the client and server into a single distribution
    start - start the database and app with docker
EOF
}

case $1 in
  build)        build         ;;
  start)        start         ;;
  *)            info          ;;
esac
