import type { Shortcut } from "../../types/shortcut.js"
import { desktops } from "../../desktopState.js"

function debug() {}

function moveAndTile(srcIndex: number) {
    // Skip invalid windows, exit if nothing to do
    const windowsToMove = desktops[srcIndex]?.windows.filter((win) => win.moveable)
    if (!windowsToMove || windowsToMove.length <= 0) return

    // Nothing to do if src = target
    const currentIndex = workspace.currentDesktop.x11DesktopNumber - 1
    if (currentIndex === srcIndex) return

    const currentDesktop = desktops[currentIndex]!
    const leftTile = currentDesktop.rootTile.tiles[0]
    const rightTile = currentDesktop.rootTile.tiles[1]
    if (!leftTile || !rightTile) return

    currentDesktop.windows.forEach((win) => {
        win.tile = leftTile
        win.noBorder = false
    })

    // Move all window to current desktop
    windowsToMove.forEach((win) => {
        win.desktops = [workspace.currentDesktop]
        win.tile = rightTile
        win.noBorder = false
    })
}

function restoreCurrentDesktop() {
    desktops.forEach((desktop) => {
        desktop.windows.forEach((window) => {
            const isOnCurrentDesktop = window.desktops.indexOf(workspace.currentDesktop) !== -1
            if (isOnCurrentDesktop && window.moveable) {
                window.desktops = [desktop.native]
                window.setMaximize(true, true)
                window.noBorder = true
            }
        })
    })
    focusCurrentWindow()
}

function restoreAllDesktops() {
    desktops.forEach((desktop) => {
        desktop.windows.forEach((window) => {
            if (window.moveable) {
                window.desktops = [desktop.native]
                window.setMaximize(true, true)
                window.noBorder = true
            }
        })
    })
    focusCurrentWindow()
}

function focusCurrentWindow() {
    for (let i = 0; i < workspace.stackingOrder.length; i++) {
        const window = workspace.stackingOrder[i]!
        const isOnCurrentDesktop = window.desktops.indexOf(workspace.currentDesktop) !== -1
        if (isOnCurrentDesktop) {
            workspace.activeWindow = window
            return
        }
    }
}

function createMoveAndTileShortcut(key: string, srcIndex: number): Shortcut {
    return {
        title: `moveAndTile.desktop-${srcIndex}.moveWindowsToCurrentDesktop`,
        text: `Move all windows from desktop-${srcIndex} to the current desktop and then tile it to the right`,
        keySequence: key.length > 1 ? key : `Meta+Ctrl+Alt+Shift+${key}`,
        fn: () => moveAndTile(srcIndex),
    }
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "MoveAndTile.Debug",
    //     text: "Debug functions in moveAndTile.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
    {
        title: "moveAndTile.restoreCurrentDesktop",
        text: "Restore windows on the current desktop to their original location",
        keySequence: "Meta+Ctrl+Alt+Return",
        fn: restoreCurrentDesktop,
    },
    {
        title: "moveAndTile.restoreAllDesktops",
        text: "Restore all windows to their original desktop",
        keySequence: "Meta+Ctrl+Alt+Shift+Return",
        fn: restoreAllDesktops,
    },
    createMoveAndTileShortcut("Meta+Ctrl+Alt+&", 0),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+/", 1),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+(", 2),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+)", 3),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+=", 4),
    createMoveAndTileShortcut("y", 5),
    createMoveAndTileShortcut("u", 6),
    createMoveAndTileShortcut("i", 7),
    createMoveAndTileShortcut("o", 8),
    createMoveAndTileShortcut("p", 9),
    createMoveAndTileShortcut("h", 10),
    createMoveAndTileShortcut("j", 11),
    createMoveAndTileShortcut("k", 12),
    createMoveAndTileShortcut("l", 13),
    createMoveAndTileShortcut("ø", 14),
    createMoveAndTileShortcut("n", 15),
    createMoveAndTileShortcut("m", 16),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+;", 17),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+:", 18),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+_", 19),
]

export default { shortcuts }
