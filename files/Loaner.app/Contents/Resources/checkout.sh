#!/bin/bash

# Variables
port="3001"
ui_file="test_ui.py"
routeuser='test/checkout'
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')

return_val=$(curl -s -X GET localhost:$port/$routeuser/?q=$serialNumber)

function prompt() {
  str=$@
  if [[ $str != "checked in" ]]; then
    osascript -e 'display dialog "Computer checked out by user: '"$str"'." buttons {"Ok"} default button "Ok"'
  fi
}

prompt $return_val
