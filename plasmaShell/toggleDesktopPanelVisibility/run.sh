#!/bin/bash

# Get the absolute path for this directory
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

# Read ./index.js as a string
SCRIPT_FILE="$SCRIPT_DIR/index.js"
SCRIPT_VALUE="$(cat $SCRIPT_FILE)"

qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.evaluateScript "$SCRIPT_VALUE"