#!/bin/bash
# run_backend.sh

cd ..
source .env/bin/activate
pip install -r src/backend/requirements.txt
nohup flask run > home-dash.log 2>&1 & 