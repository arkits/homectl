#!/bin/bash

cd ../src/frontend/

yarn install

yarn run build

tar czf build.tar.gz build

scp build.tar.gz pi@192.168.86.33:/home/pi/home-dash-frontend/