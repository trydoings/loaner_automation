#!/usr/bin/env bash

# Obtain variables from UI and assign them to more understandable values
fullname=$1
handle=$2
password=$3

echo "Full name: $fullname Handle: $handle Password: $password"

ShortName=`/usr/bin/who | awk '/console/{ print $1 }' | tail -n 1`
FullName=`dscl . -read /Users/$ShortName RealName | tail -1`

sudo dscl . change /Users/$ShortName RealName $FullName $handle
sudo dscl . -passwd /Users/$handle $password

echo "User credentials changed."

# Log out
osascript -e 'tell application "loginwindow" to  «event aevtrlgo»'
