#!/bin/bash

echo Settings
echo Path is: $PATH
echo System user is: $USER

echo Cleaning...
rm -rf ./dist

echo Setting evironment
npm install
bower install
echo Building app
grunt

gruntStatus=$?
if [ $gruntStatus -ne 0 ]; then
	echo "Grunt build failed with status $gruntStatus";
	exit $gruntStatus
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
rc=$?
if [[ $rc != 0 ]] ; then
    echo "NPM install failed with exit code " $rc
    exit $rc
fi

echo Building docker image
docker build -t konnigud/tictactoe .

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

echo "Done"
