#!/bin/bash

serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')
val=$(osascript -e '
set icon to POSIX file "/Users/'$(whoami)'/Desktop/LA/loaner_automation/server/qr/'$serialNumber'.icns"
set icon to icon as alias
display dialog "Scan QR code to check in loaner machine." buttons {"Non-QR check in", "Done"} default button "Done" with icon icon')
if [[ $val == "button returned:Done" ]];
then
  echo "Checked in via QR code"
elif [[ $val == "button returned:Non-QR check in" ]];
then
  ./checkin.sh
else
  echo "There was an error"
fi
