#!/usr/bin/env bash

echo 'Stopping and removing docker container..'
CONTAINER_ID=$(docker ps --quiet --filter ancestor=mongo)
docker stop $CONTAINER_ID && docker rm $CONTAINER_ID

set -e

echo 'Starting new docker container with MongoDB..'
docker run --name c4sg -d -p 27017:27017 -p 28017:28017 mongo

echo "Adding seed data to MongoDB.."
docker cp ./db/seedData/users.json c4sg:users.json
docker cp ./db/seedData/projects.json c4sg:projects.json

docker exec c4sg mongoimport --db admin --collection users --file users.json --type json --jsonArray
docker exec c4sg mongoimport --db admin --collection projects --file projects.json --type json --jsonArray
