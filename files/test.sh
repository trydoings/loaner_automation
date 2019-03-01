#!/bin/bash

# Obtain variables from UI and assign them to more understandable values
fullname=$1
handle=$2
password=$3
oldpassword=$4

echo "Full name: $fullname Handle: $handle Password: $password Oldpassowrd: $oldpassword"

ShortName=`whoami`
FullName=`dscl . -read /Users/$ShortName RealName | tail -1 | sed 's/[^ ]* //'`

echo $oldpassword | sudo -S dscl . change /Users/$ShortName RealName $FullName $handle
echo $oldpassword | sudo -S dscl . -passwd /Users/$handle $password

echo "User credentials changed."

# Log out
# osascript -e 'tell application "loginwindow" to  «event aevtrlgo»'
