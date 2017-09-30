#!/usr/bin/env bash

set -e

git branch --merged | grep -v master | xargs git branch -D

echo "`basename $0`: cleaned local branches besides master"
