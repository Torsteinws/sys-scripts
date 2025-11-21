import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"
import { type DesktopEntry, desktops, getDesktopFromIndex, getDesktopFromWindow } from "./Desktop.js"

function debug() {}

function moveAndTile(srcDesktop: DesktopEntry) {
    if (srcDesktop.window === undefined) return print(`Did not find any window on "${srcDesktop.name}". Exiting...`)
    if (!srcDesktop.window.moveable) return print(`Can't move window away from "${srcDesktop.name}. Exiting...`)

    // Move window to current desktop
    srcDesktop.window.desktops = [workspace.currentDesktop]

    // Find tile layout
    const screen = workspace.activeScreen
    const tileManager = workspace.tilingForScreen(screen)
    const leftTile = tileManager.bestTileForPosition(screen.geometry.left, screen.geometry.top)
    const rightTile = tileManager.bestTileForPosition(screen.geometry.right, screen.geometry.top)

    // Tile current window to the right, tile source window to the left
    workspace.activeWindow.tile = leftTile
    srcDesktop.window.tile = rightTile

    workspace.activeWindow.noBorder = false
    srcDesktop.window.noBorder = false
}

function moveWindowToIndex(window: KWin.Window, targetIndex: number) {
    const targetDesktop = workspace.desktops[targetIndex - 1]
    if (!targetDesktop)
        throw `Tried to move window "${window.desktopFileName}" to desktop at "${targetIndex}", but desktop index was out of bounds`

    if (!window.moveable)
        throw `Could not move window "${window.desktopFileName} to desktop "${targetDesktop.name}" because window was immovable`

    window.desktops = [targetDesktop]
}

function restoreCurrentDesktop() {
    const currentIndex = workspace.currentDesktop.x11DesktopNumber
    const currentWindows = getWindowsAtDesktopNumber(currentIndex)
    restoreWindows(currentWindows)
    focusCurrentWindow()
}

function restoreAllDesktops() {
    restoreWindows(workspace.stackingOrder)
    focusCurrentWindow()
}

function restoreWindows(windows: KWin.Window[]) {
    for (let i = 0; i < windows.length; i++) {
        const window = windows[i]!
        const desktop = getDesktopFromWindow(window)

        if (!desktop) continue

        moveWindowToIndex(window, desktop.index)
        window.setMaximize(true, true)
        window.noBorder = true
    }
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

function focusCurrentWindow() {
    const { window } = getDesktopFromIndex(workspace.currentDesktop.x11DesktopNumber)
    if (window !== undefined) {
        workspace.activeWindow = window
    }
}

function syncWindows() {
    clearWindowTracking()
    const firefoxWindows: KWin.Window[] = []
    const otherWindows: KWin.Window[] = []

    // List of all normal windows (ordered by least visible to most visible)
    const normalWindows = workspace.stackingOrder.filter((win) => win.normalWindow && !win.onAllDesktops)

    normalWindows.forEach((window) => {
        switch (window.desktopFileName) {
            case "org.kde.xwaylandvideobridge":
            case undefined:
            case "":
                // Do nothing, this is internal to kde
                break
            case "spotify_spotify":
                desktops.spotify.window = window
                break
            case "signal":
                desktops.signal.window = window
                break
            case "systemsettings":
                desktops.settings.window = window
                break
            case "org.qbittorrent.qBittorrent":
                // Ignore for now
                // desktops.vpnAndUtils.window = window
                break
            case "protonvpn-app":
                // Ignore progon vpn, it is not useful for me here
                // desktops.vpnAndUtils.window = window
                break
            case "com.mitchellh.ghostty":
                desktops.terminal.window = window
                break
            case "code_code":
                desktops.notes.window = window
                break
            case "org.kde.dolphin":
                desktops.fileExplorer.window = window
                break
            case "firefox_firefox":
                firefoxWindows.push(window)
                break
            default:
                otherWindows.push(window)
                break
        }
    })

    // For each open firefox window
    firefoxWindows.forEach((window) => {
        switch (window.desktops[0]?.x11DesktopNumber) {
            case desktops.browser1.index:
                desktops.browser1.window = window
                break
            case desktops.browser2.index:
                desktops.browser2.window = window
                break
            case desktops.browser3.index:
                desktops.browser3.window = window
                break
            case desktops.cheatsheet.index:
                desktops.cheatsheet.window = window
                break
            default:
                break
        }
    })

    otherWindows.forEach((window) => {
        switch (window.desktops[0]?.x11DesktopNumber) {
            default:
            case undefined:
                break
            case desktops.unknown1.index:
                desktops.unknown1.window = window
                break
            case desktops.unknown2.index:
                desktops.unknown2.window = window
                break
            case desktops.unknown3.index:
                desktops.unknown3.window = window
                break
            case desktops.randomAccess.index:
                desktops.randomAccess.window = window
                break
        }
    })

    utils.showText("Synced windows", "data-success")
}

function clearWindowTracking() {
    desktops.unknown1.window = undefined
    desktops.spotify.window = undefined
    desktops.signal.window = undefined
    desktops.settings.window = undefined
    desktops.vpnAndUtils.window = undefined
    desktops.unknown2.window = undefined
    desktops.browser1.window = undefined
    desktops.terminal.window = undefined
    desktops.browser2.window = undefined
    desktops.browser3.window = undefined
    desktops.unknown3.window = undefined
    desktops.notes.window = undefined
    desktops.fileExplorer.window = undefined
    desktops.randomAccess.window = undefined
    desktops.cheatsheet.window = undefined
}

function createMoveAndTileShortcut(key: string, desktop: DesktopEntry): Shortcut {
    return {
        title: `moveAndTile.${desktop.name.replace(" ", "_")}`,
        text: `Move window from ${desktop.name} to the current desktop and then tile it to the left`,
        keySequence: key.length > 1 ? key : `Meta+Ctrl+Alt+Shift+${key}`,
        fn: () => moveAndTile(desktop),
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
        title: "moveAndTile.syncWindows",
        text: "Sync window management",
        keySequence: "Meta+Ctrl+Alt+Shift+Space",
        fn: syncWindows,
    },
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
    createMoveAndTileShortcut("y", desktops.unknown1),
    createMoveAndTileShortcut("u", desktops.spotify),
    createMoveAndTileShortcut("i", desktops.signal),
    createMoveAndTileShortcut("o", desktops.settings),
    createMoveAndTileShortcut("p", desktops.vpnAndUtils),
    createMoveAndTileShortcut("h", desktops.unknown2),
    createMoveAndTileShortcut("j", desktops.browser1),
    createMoveAndTileShortcut("k", desktops.terminal),
    createMoveAndTileShortcut("l", desktops.browser2),
    createMoveAndTileShortcut("ø", desktops.browser3),
    createMoveAndTileShortcut("n", desktops.unknown3),
    createMoveAndTileShortcut("m", desktops.notes),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+;", desktops.fileExplorer),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+:", desktops.randomAccess),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+_", desktops.cheatsheet),
]

export default { shortcuts }
