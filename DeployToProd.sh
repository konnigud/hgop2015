#!/bin/bash

echo "Hello, World"

docker login --username=konnigud --password=comen3tary --email=konnigud@gmail.com

docker push konnigud/tictactoe

test=$(docker ps -a -q)
echo $test

ssh konni@thundera.org <<'ENDSSH'

contID=$(docker ps -q)

[[ -z $contID ]] && echo no process is running || echo Process $(docker kill $contID) is killed

docker pull konnigud/tictactoe

docker run -p 9001:9001 -d -e "NODE_ENV=production" konnigud/tictactoe

ENDSSH
