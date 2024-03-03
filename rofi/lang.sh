#!/bin/bash

# Define an associative array to map language names to keyboard layouts
declare -A layout_map
layout_map["english"]="us"
layout_map["spanish"]="es"
layout_map["portuguese"]="br"
layout_map["russian"]="ru"

# Create a list of languages for Rofi
options=""
for language in "${!layout_map[@]}"; do
    options="$options$language\n"
done

# Use Rofi to display a menu for language selection
selected_language=$(echo -e "$options" | rofi -dmenu -p "Select Language:")

# Check if the selected language is valid
if [[ -n "${layout_map[$selected_language]}" ]]; then
    # Set the chosen keyboard layout
    setxkbmap "${layout_map[$selected_language]}"

    # Remap CapsLock to Escape
    xmodmap -e "clear Lock" -e "keycode 66 = Escape"

    # Display a notification
    notify-send "Keyboard layout changed to $selected_language"
else
    # Display an error message if the selected language is not valid
    notify-send "Invalid language selected: $selected_language"
fi
