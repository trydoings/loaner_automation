#!/usr/bin/env bash

# Obtain variables from UI and assign them to more understandable values
# fullname=$1
# handle=$2
# password=$3
#
#
# echo "Full name: $fullname Handle: $handle Password: $password"

ShortName=`/usr/bin/who | awk '/console/{ print $1 }' | tail -n 1`
FullName=`dscl . -read /Users/$ShortName RealName | tail -1`

echo $ShortName
echo $FullName

sudo dscl . change /Users/aharshbe RealName "Austin Harshberger" "aharshbe"
