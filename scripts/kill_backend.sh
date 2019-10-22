#!/bin/bash
# kill_backend.sh

PID=`ps -eaf | grep "home-dash/.env/bin" | grep -v grep | awk '{print $2}'`

if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi