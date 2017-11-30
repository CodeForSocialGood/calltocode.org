#!/usr/bin/env bash

set -x

docker stop $(docker ps -q --filter ancestor=mongo)

set -e

docker run --name c4sg -d -p 27017:27017 -p 28017:28017 mongo

echo "Seeding DB..."

docker cp ./db/seedData/users.json c4sg:users.json
docker cp ./db/seedData/opportunities.json c4sg:opportunities.json

docker exec c4sg mongoimport --db admin --collection users --file users.json
docker exec c4sg mongoimport --db admin --collection opportunities --file opportunities.json
