import type { Shortcut } from "../../types/shortcut.js"

function toggleBorderCurrentWindow() {
    workspace.activeWindow.noBorder = !workspace.activeWindow.noBorder
}

function toggleBorderCurrentDesktop() {
    const windows = getWindowsAtDesktopNumber(workspace.currentDesktop.x11DesktopNumber)
    toggleBorders(windows)
}

function toggleBorderAllWindows() {
    toggleBorders(workspace.stackingOrder)
}

function toggleBorders(windows: KWin.Window[]) {
    let newValue = !workspace.activeWindow.noBorder
    windows.forEach((window) => {
        window.noBorder = newValue
    })
}

function getWindowsAtDesktopNumber(index: number): KWin.Window[] {
    const openWindows: KWin.Window[] = []
    workspace.stackingOrder.forEach((window) => {
        const indexMatches = window.desktops.filter((desktop) => desktop.x11DesktopNumber === index).length > 0
        if (indexMatches) {
            openWindows.push(window)
        }
    })
    return openWindows
}

const shortcuts: Shortcut[] = [
    {
        title: "toggleTitlebar.currentWindow",
        text: "Toggle frame and titlebar visibility on current window",
        keySequence: "Meta+o",
        fn: toggleBorderCurrentWindow,
    },
    {
        title: "toggleTitlebar.currentDesktop",
        text: "Toggle frame and titlebar visibility on all windows on current desktop",
        keySequence: "Meta+Shift+o",
        fn: toggleBorderCurrentDesktop,
    },
    {
        title: "toggleTitlebar.allWindows",
        text: "Toggle frame and titlebar visibility on all windows",
        keySequence: "Meta+Shift+Ctrl+o",
        fn: toggleBorderAllWindows,
    },
]

export default { shortcuts }
