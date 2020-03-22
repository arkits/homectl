#!/bin/bash

set -e

echo ">>> updating the backend"

ssh pi@192.168.86.33 "
    cd /home/pi/smarthome-dashboard/scripts
    git pull
    ./kill_backend.sh
    ./run_backend.sh
"