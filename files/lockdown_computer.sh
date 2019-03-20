#!/usr/bin/env bash

# Turn off WiFi
# echo $oldpassword | sudo -S networksetup -setnetworkserviceenabled Wi-Fi off

# Change desktop wallpaper
osascript -e 'tell application "Finder" to set desktop picture to POSIX file "/Users/'$USER'/Desktop/loaner_locked.jpg"'

# Modify dock
# defaults write com.apple.dock persistent-apps -array
# defaults write com.apple.dock persistent-apps -array-add "<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>/Applications/Google\ Chrome.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>"; killall Dock
