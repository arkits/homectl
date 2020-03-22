#!/bin/bash
# run_backend.sh

cd ../src/backend

# echo ">>> running npm install"
# npm install

echo ">>> running backend!"
pm2 start home-dash.js 