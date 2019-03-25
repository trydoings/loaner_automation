#!/bin/bash

port="3000"
ui_file="test_ui.py"
routeuser='test/checkedout'
routelastuser='test/checkedoutlast'
routedate='test/checkedoutdate'
serialNumber=$1

if [[ $serialNumber == "" ]]; then
  echo "You must enter a serial number, example ./status.sh SERIALNUMBER"
  exit 1
fi

return_val=$(curl -s -X GET localhost:$port/$routeuser/?q=$serialNumber)
check_in_date=$(curl -s -X GET localhost:$port/$routedate/?q=$serialNumber)
last_user=$(curl -s -X GET localhost:$port/$routelastuser/?q=$serialNumber)

function status() {
  str=$@
  osascript -e 'display dialog "'"$str"'" buttons {"Ok"} default button "Ok"'
}

echo "Current user" $return_val

if [[ $return_val == 'not found' ]]; then
  echo "Loaner entry doesn't exist"
  status "Loaner entry doesn't exist"
elif [[ $return_val == 'checked in' ]]; then
  echo "Loaner not checked out by user but exists"
  status "Loaner not checked out by user but exists, last user $last_user"
else
  echo "Loaner last checked in by $return_val at $check_in_date"
  status "Loaner last checked in by $return_val at $check_in_date"
fi
