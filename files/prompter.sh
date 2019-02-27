#!/usr/bin/env bash

# Function to request user's password and confirm it's correct
function request_password(){
  clear ; echo "What password would you like to use on this loaner?"; read -s p1
  echo -n "Please enter confirm your password: "; read -s p2
  if [[ $p1 != $p2 ]]; then echo "Try again, passwords must match." ; sleep 2 ; request_password; fi
}

# Function to create user object to send to user account creator
function create_user(){
  clear ; echo "What is your full name? (Fist and Last)"; read name
  clear ; echo "What is your GitHub handle?"; read handle
  request_password
  clear ; echo "Great, so far your name is: $name, your handle is: $handle and your password is $p1"
}

# Calls both functions above
create_user ; sleep 2 ; echo "Sending account info... " ; sleep 2 ; clear

# Calls user account creation script and passes variables from other functions
./user_script.sh $name $handle $p1
