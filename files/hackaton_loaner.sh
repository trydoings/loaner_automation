# Script which creates user account and stores credentials for that account in a hidden file

#!/usr/bin/env bash
USER_LOGIN="hackathon"
USER_FULLANME="hackathon"
USER_PASSWORD="passwordhere"

# Create Admin account
function create_user_account()
{
	# Create a local admin user account
	sudo dscl . -create /Users/$USER_LOGIN
	sudo dscl . -create /Users/$USER_LOGIN UserShell /bin/bash
	sudo dscl . -create /Users/$USER_LOGIN RealName $USER_LOGIN
	sudo dscl . -create /Users/$USER_LOGIN UniqueID 1001
	sudo dscl . -create /Users/$USER_LOGIN PrimaryGroupID 81
	sudo dscl . -create /Users/$USER_LOGIN NFSHomeDirectory /Local/Users/$USER_LOGIN

	sudo dscl . -passwd /Users/$USER_LOGIN $USER_PASSWORD
	sudo dscl . -append /Groups/admin GroupMembership $USER_LOGIN
}

function store_account_info()
{
  cd /Users
  sudo mkdir credentials
  cd -

  sudo echo $USER_LOGIN > $HOME/Desktop/account_info.txt
  sudo echo $USER_PASSWORD >> $HOME/Desktop/account_info.txt
  sudo echo $USER_FULLANME >> $HOME/Desktop/account_info.txt

  sudo mv $HOME/Desktop/account_info.txt /Users/credentials/account_info.txt

  echo "Account info saved."

}

function remove_user(){
  sudo dscl . delete /Users/$USER_LOGIN
  sudo rm -rf /Users/credentials/account_info.txt
}

# Create user account
create_user_account

# Check if user account exists
val=$(dscl . list /Users | grep -v '_' | grep $USER_LOGIN)
if [ $val == $USER_LOGIN ]; then
  store_account_info
else
  echo "User account not created or doesn't exist with username: $USER_LOGIN"
fi

# Uncomment below if you want to remove the user account and comment lines 45 - 50 above.
# remove_user
