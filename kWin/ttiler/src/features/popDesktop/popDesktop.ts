import type { Shortcut } from "../../types/shortcut.js"

function debug() {}

let previousDesktop: KWin.VirtualDesktop = workspace.currentDesktop

function setup() {
    workspace.currentDesktopChanged.connect((prevDesktop) => (previousDesktop = prevDesktop))
}

function switchToPreviousDesktop() {
    if (previousDesktop) {
        workspace.currentDesktop = previousDesktop
    }
}

const shortcuts: Shortcut[] = [
    {
        title: "popDesktop.popDesktop",
        text: "Switch to the last used desktop",
        keySequence: "Meta+Shift+p",
        fn: switchToPreviousDesktop,
    },
]

export default { shortcuts, setup }
