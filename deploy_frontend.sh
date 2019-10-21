#!/bin/bash
# deploy_frontend.sh

set -e

# cd to frontend dir
cd src/frontend/
 
# npm install

# build a deployment ready version
echo "==> Building dist"
npm run build

# zip it up
echo "==> Zipping it up"
tar czvf home-dash-frontend.tar.gz dist/

# copy to host
echo "==> scp it"
scp home-dash-frontend.tar.gz  pi@192.168.86.33:~/home-dash-frontend