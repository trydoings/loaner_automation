#!/bin/bash

# Variables
port="3001"
ui_file="test_ui.py"
routeuser='test/checkedout'
routedate='test/checkedoutdate'
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')

return_val=$(curl -s -X GET localhost:$port/$routeuser/?q=$serialNumber)
check_in_date=$(curl -s -X GET localhost:$port/$routedate/?q=$serialNumber)

function status() {
  str=$@
  osascript -e 'display dialog "'"$str"'" buttons {"Ok"} default button "Ok"'
}

echo "Current user" $return_val

if [[ $return_val == 'not found' ]]; then
  echo "Loaner entry doesn't exist"
  ./$ui_file
elif [[ $return_val == 'checked in' ]]; then
  echo "Loaner not checked out by user but exists"
  # error "Message"
function prompt() {
  prompter="$(osascript -e 'display dialog "Loaner already exists. Create new loaner account for loaner ('$serialNumber')?" buttons {"No", "Yes"} default button "Yes"')"

  if [ "$prompter" == "button returned:Yes" ]; then
    echo "Creating new account..."
    ./$ui_file
    ./checkout.sh
  else
    echo "Okay..."
  fi
}
prompt
else
  no_space=$(echo $check_in_date | sed 's/ //g')
  echo $no_space
  echo "Loaner checked out by $return_val at $check_in_date"
  prompter="$(osascript -e 'display dialog "Loaner checked out by '$return_val' at '$no_space'" buttons {"Check in", "Okay"} default button "Okay"')"
  if [ "$prompter" == "button returned:Check in" ]; then
    ./checkin_qr.sh
  fi
fi
