#!/usr/bin/env bash

set -ex

DEPLOY_DIR=${DEPLOY_DIR:=deploy}

cp $DEPLOY_DIR/system/startup.service /etc/systemd/system/
