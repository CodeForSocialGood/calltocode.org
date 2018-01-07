#!/usr/bin/env bash

set -exu -o pipefail

# create aws elastic beanstalk file
DOCKER_AWS_FILE=$TRAVIS_COMMIT-Dockerrun.aws.json
sed "s/<TAG>/$TRAVIS_COMMIT/" < .deploy/Dockerrun.aws.json.template > $DOCKER_AWS_FILE

# create new aws elastic beanstalk app version and update to it
EB_BUCKET=calltocode-elasticbeanstalk
pip install --user awscli
aws s3 cp $DOCKER_AWS_FILE s3://$EB_BUCKET/$DOCKER_AWS_FILE
aws elasticbeanstalk create-application-version --application-name calltocode \
  --version-label $TRAVIS_COMMIT \
  --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKER_AWS_FILE \
  --region us-east-2
aws elasticbeanstalk update-environment --environment-name test-calltocode \
  --version-label $TRAVIS_COMMIT \
  --region us-east-2
