#!/bin/bash
# deploy_frontend.sh

set -e

HOME=`pwd`

# cd to frontend dir
cd src/frontend/

# switch config
echo "==> switching prod config"
rm src/config.js
cp src/configProd.js src/config.js
 
# build a deployment ready version
echo "==> building dist"
npm run build

# switch config
echo "==> reseting back to dev config"
rm src/config.js
cp src/configDev.js src/config.js

# zip it up
echo "==> zipping it up"
tar czvf home-dash-frontend.tar.gz dist/

# copy to frontend
echo "==> copy home-dash-frontend.tar.gz to ansible dir"
mv home-dash-frontend.tar.gz ../../deployment/ansible/roles/deploy_frontend/files

cd $HOME/deployment/ansible
ansible-playbook deploy_frontend.yml