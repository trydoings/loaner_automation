#!/bin/bash

port="3000"
ui_file="test_ui.py"
routeuser='test/checkin'
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')

return_val=$(curl -s -X GET localhost:$port/$routeuser/?q=$serialNumber)

echo $return_val
