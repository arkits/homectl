#!/bin/bash
# kill_backend.sh

PID=`ps -eaf | grep "node home-dash" | grep -v grep | awk '{print $2}'`

if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi