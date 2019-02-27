# Get crednetials for given loaner to tie into extension attribute

#!/usr/bin/env bash

if [ ! -f /Users/credentials/account_info.txt ]; then
    echo "<result>Not a loaner</result>"
else
  USER_FULLANME=$(cat /Users/credentials/account_info.txt  | tail -n 1)
  USER_PASSWORD=$(cat /Users/credentials/account_info.txt  | tail -n 2 | head -n 1)
  USER_LOGIN=$(cat /Users/credentials/account_info.txt  | head -n 1)
  echo "<result>Loaner credentials: (Full name: $USER_FULLANME | Password: $USER_PASSWORD | Handle: $USER_LOGIN)</result>"
fi
