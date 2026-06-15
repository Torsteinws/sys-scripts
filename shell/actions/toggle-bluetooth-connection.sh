#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

readonly DEVICE_NAME="Galaxy Buds4 Pro"

get_device_mac() {
    bluetoothctl devices | grep --ignore-case "$DEVICE_NAME" | awk '{print $2}'
}

is_connected() {
    local mac="$1"
    bluetoothctl info "$mac" | grep -q "Connected: yes"
}

main() {
    local mac
    mac="$(get_device_mac)"

    if [[ -z "$mac" ]]; then
        echo "Error: '$DEVICE_NAME' not found in paired devices." >&2
        exit 1
    fi
    echo "Device: $DEVICE_NAME - $mac"

    if is_connected "$mac"; then
        bluetoothctl disconnect "$mac"
    else
        bluetoothctl connect "$mac"
    fi
}

main
