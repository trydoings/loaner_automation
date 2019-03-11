#!/bin/bash

# Obtain variables from UI and assign them to more understandable values
fullname=$1
handle=$2
password=$3
oldpassword=$4
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')

printf "\nCredentials to be sent:\n
Full name: $fullname\nHandle: $handle\nPassword: $password\nOldpassowrd: $oldpassword\nserialNumber: $serialNumber\n\n"

ShortName=`whoami`
FullName=`dscl . -read /Users/$ShortName RealName | tail -1 | sed 's/[^ ]* //'`

echo $oldpassword | sudo -S dscl . change /Users/$ShortName RealName $FullName $handle
echo $oldpassword | sudo -S dscl . -passwd /Users/$handle $password

echo "User credentials changed."

# Log out
osascript -e 'tell application "loginwindow" to  «event aevtrlgo»'
