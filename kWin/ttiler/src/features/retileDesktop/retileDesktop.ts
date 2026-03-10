import type { Shortcut } from "../../types/shortcut.js"

function debug() {}

function retileDesktop() {
    const tileManager = workspace.tilingForScreen(workspace.activeScreen)
    const currentWindows = getWindowsAtDesktopNumber(workspace.currentDesktop.x11DesktopNumber)
    currentWindows.forEach((win) => {
        const originalTile = win.tile
        win.tile = tileManager.rootTile
        win.setMaximize(true, true)
        win.tile = originalTile
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
        title: "retileDesktop.retileDesktop",
        text: "Retile windows on current desktop",
        keySequence: "Meta+u",
        fn: () => retileDesktop(),
    },
]

export default { shortcuts }
