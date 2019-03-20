#!/bin/bash

# Obtain variables from UI and assign them to more understandable values
fullname=$1
handle=$2
password=$3
oldpassword=$4
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')
model=$(sysctl hw.model | sed 's/[^ ]* //')

if [[ $model == *"MacBook"* ]]; then
   type="Computer"
 else
   type="Non-computer"
fi

data="$fullname,$handle,$password,$oldpassword,$serialNumber,$model,$type"
json_data='{"serial":"'$serialNumber'","model":"'$model'","type":"'$type'","owners":{"handle":"'$handle'","user_name":"'$fullname'","password":"'$password'","checkin":"default","checkout":"default"},"date_modified":{"created_at":"default","modified":"default"},"age":"default","qr":"default","reset":"default","expired":"default"}'

printf "\nCredentials to be sent:\n
Full name: $fullname\nHandle: $handle\nPassword: $password\nOldpassowrd: $oldpassword\nserialNumber: $serialNumber\nmodel: $model\ntype: $type\n\n"

# Creates a put request to send user data to Node server
curl -X PUT localhost:3000/test/make?new_user=$data
# curl -H 'Content-Type: application/json' -X PUT -d "$json_data" -g localhost:3000/test/make
# Uses the user's credntials to change the current account login and password
# ShortName=`whoami`
# FullName=`dscl . -read /Users/$ShortName RealName | tail -1 | sed 's/[^ ]* //'`
#
# echo $oldpassword | sudo -S dscl . change /Users/$ShortName RealName $FullName $handle
# echo $oldpassword | sudo -S dscl . -passwd /Users/$handle $password

printf "\nUser credentials changed."

# Log out
# osascript -e 'tell application "loginwindow" to  «event aevtrlgo»'
