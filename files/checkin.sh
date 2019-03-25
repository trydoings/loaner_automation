#!/bin/bash

port="3000"
ui_file="test_ui.py"
routeuser='test/checkin'
prevuser='test/checkedoutlast'
currentuser='test/checkedout'
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')

current_user=$(curl -s -X GET localhost:$port/$currentuser/?q=$serialNumber)

function prompt() {
  str=$@
  echo $str
  if [[ $str == "checked in" ]]; then
    echo "computer checked in already and not assigned"
  elif [[ $str == 'not found' ]]; then
    echo "loaner not created, run /start_app.sh"
  else
    osascript -e 'display dialog "Loaner checked in by user: '"$str"'." buttons {"Ok"} default button "Ok"'
  fi
}

if [[ $current_user == "checked in" ]]; then
  osascript -e 'display dialog "Loaner already checked in and can be checked out." buttons {"Ok"} default button "Ok"'
else
  return_val=$(curl -s -X GET localhost:$port/$routeuser/?q=$serialNumber)
  last_user=$(curl -s -X GET localhost:$port/$prevuser/?q=$serialNumber)
  prompt $return_val
fi
