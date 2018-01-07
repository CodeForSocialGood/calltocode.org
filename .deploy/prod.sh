#!/usr/bin/env bash

set -ex -o pipefail

PROD_VERSION=prod-$VERSION

docker_push () {
  set -u
  docker build \
    --build-arg DB_PASS=$DB_PASS \
    --build-arg COMMIT_HASH=$COMMIT_HASH \
    --build-arg JWT_SIGNING_KEY=$JWT_SIGNING_KEY \
    --build-arg SENDGRID_API_KEY=$SENDGRID_API_KEY \
    --build-arg ROLLBAR_API_KEY=$ROLLBAR_API_KEY \
    --build-arg HOST_DOMAIN=$HOST_DOMAIN \
    --build-arg DB_HOST=$DB_HOST \
    --build-arg DB_REPLICA_SET=$DB_REPLICA_SET \
    -t $DOCKER_IMAGE:$PROD_VERSION .
  docker login -u $DOCKER_USER -p $DOCKER_PASS
  docker push $DOCKER_IMAGE:$PROD_VERSION
}

git_release () {
  set -u
  API_JSON=$(printf '{"tag_name": "v%s","target_commitish": "%s","name": "v%s","body": "Release of version %s","draft": false,"prerelease": false}' $VERSION $VERSION $VERSION $VERSION)
  curl --data "$API_JSON" https://api.github.com/repos/CodeForSocialGood/calltocode.org/releases?access_token=$GITHUB_ACCESS_TOKEN
}

aws_deploy () {
  set -u
  DOCKER_AWS_FILE=$PROD_VERSION-Dockerrun.aws.json
  sed "s/<TAG>/$PROD_VERSION/" < .deploy/Dockerrun.aws.json.template > $DOCKER_AWS_FILE
  EB_BUCKET=calltocode-elasticbeanstalk
  pip install --user awscli
  aws s3 cp $DOCKER_AWS_FILE s3://$EB_BUCKET/$DOCKER_AWS_FILE
  aws elasticbeanstalk create-application-version --application-name calltocode \
    --version-label $PROD_VERSION \
    --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKER_AWS_FILE \
    --region us-east-2
  aws elasticbeanstalk update-environment --environment-name calltocode \
    --version-label $PROD_VERSION \
    --region us-east-2
}

all () {
  docker_push
  git_release
  aws_deploy
}

case $1 in
  push)         docker_push       ;;
  release)      git_release       ;;
  deploy)       aws_deploy        ;;
  *)            all               ;;
esac
