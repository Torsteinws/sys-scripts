#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

readonly DARK_THEME="org.kde.breezedark.desktop"
# readonly DARK_THEME="org.kubuntudark.desktop"

readonly LIGHT_THEME="org.kde.breeze.desktop"
# readonly LIGHT_THEME="org.kubuntulight.desktop"

on_make_light() {
    # Make nvim light
    sed --in-place \
        -e 's/^vim\.o\.background = "dark"/-- vim.o.background = "dark"/' \
        -e 's/^-- vim\.o\.background = "light"/vim.o.background = "light"/' \
        ~/.config/nvim/init.lua

    # TODO:
    # - Make zellij light
    # - Restart signal?
    # - More?
}

on_make_dark() {
    # Make nvim dark
    sed --in-place \
        -e 's/^-- vim\.o\.background = "dark"/vim.o.background = "dark"/' \
        -e 's/^vim\.o\.background = "light"/-- vim.o.background = "light"/' \
        ~/.config/nvim/init.lua
}

main() {
    local theme="$(kreadconfig6 --group KDE --key LookAndFeelPackage)"
    if [[ -z "$theme" ]]; then
        echo "Error: Did not find a theme"
        exit 1
    fi

    if [[ $theme == $DARK_THEME ]]; then
        echo "Switching to light theme..."
        qdbus org.kde.plasmashell /org/kde/osdService org.kde.osdService.showText "weather-clear-symbolic" "Light Theme"
        lookandfeeltool --apply $LIGHT_THEME
        on_make_light
    else
        echo "Switching to dark theme..."
        qdbus org.kde.plasmashell /org/kde/osdService org.kde.osdService.showText "weather-clear-night-symbolic" "Dark Theme"
        lookandfeeltool --apply $DARK_THEME
        on_make_dark
    fi
}

main
