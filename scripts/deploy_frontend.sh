#!/bin/bash

set -e

cd ../src/frontend/

echo ">>> building dist"
yarn install
yarn run build

echo ">>> taring"
tar czf build.tar.gz build

echo ">>> scp to rpi"
scp build.tar.gz pi@192.168.86.33:/home/pi/home-dash-frontend/

echo ">>> updating the frontend"
ssh pi@192.168.86.33 "tar xf home-dash-frontend/build.tar.gz -C home-dash-frontend/"