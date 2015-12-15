#!/bin/bash

echo "Thundera responding"

echo "Closing running containers"
containerID=$(docker ps -q --filter ancestor=$1)

[[ -z $containerID ]] && echo "$1 not running" || echo "Image $1 running in container $(docker kill $containerID) is stopped"

echo "Fetching $1"
docker pull $1

echo "Starting $1 in container $(docker run -p $2:8080 -d -e "NODE_ENV=production" $1) on port $2"



