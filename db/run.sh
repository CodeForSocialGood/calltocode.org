#!/usr/bin/env bash

CONTAINER_NAME=c4sg
CONTAINER_ID=$(docker ps --quiet --filter ancestor=mongo)

echo 'Stopping and removing docker container..'
docker stop $CONTAINER_NAME || docker stop $CONTAINER_ID
docker rm $CONTAINER_NAME || docker rm $CONTAINER_ID

set -e

echo 'Starting new docker container with MongoDB..'
docker run --name $CONTAINER_NAME -d -p 27017:27017 -p 28017:28017 mongo

echo 'Copying seed data to docker container..'
docker cp ./db/seedData/users.json $CONTAINER_NAME:users.json
docker cp ./db/seedData/projects.json $CONTAINER_NAME:projects.json

echo 'Adding seed data to MongoDB..'
docker exec $CONTAINER_NAME mongoimport --db admin --collection users --file users.json --type json --jsonArray
docker exec $CONTAINER_NAME mongoimport --db admin --collection projects --file projects.json --type json --jsonArray
