#!/bin/bash
# run_backend.sh

cd ../src/backend

echo ">>> running npm install"
npm install

echo ">>> running backend!"
nohup npm run start > ../smarthome-dashboard-backend.log 2>&1 & 