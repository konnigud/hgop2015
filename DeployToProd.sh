#!/bin/bash

echo "Deploy to prod starting"

echo "Logging into docker"
docker login --username=konnigud --password=comen3tary --email=konnigud@gmail.com

echo "Pushing changes"
docker push konnigud/tictactoe

echo "Deploying $1 to thundera on port $2"
ssh konni@thundera.org ~/deploydocker.sh $1 $2

