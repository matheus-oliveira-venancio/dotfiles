#!/bin/bash

# Define the options for Rofi
options="Turn off notebook screen\nTurn on all screens"

# Prompt the user to select an option using Rofi
chosen_option=$(echo -e "$options" | rofi -dmenu -p "Screen Toggle" -lines 2 -width 30)

# Execute the corresponding command based on the selected option
case "$chosen_option" in
    "Turn off notebook screen")
        xrandr --output eDP-1 --off --output HDMI-1 --mode 1366x768 --pos 0x0 --rotate normal
        echo "eDP-1 was turned off (Notebook)"
        ;;
    "Turn on all screens")
        xrandr --output eDP-1 --primary --mode 1366x768 --pos 0x0 --rotate normal --output HDMI-1 --mode 1366x768 --pos 1366x0 --rotate normal
        echo "Both screens are working now (eDP-1 and HDMI-1)"
        ;;
    *)
        echo "Invalid option"
        ;;
esac
