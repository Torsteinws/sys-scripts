#!/bin/bash

set -euo pipefail

sleep 4s
qdbus6 org.kde.KWin /KWin org.kde.KWin.setCurrentDesktop 7
