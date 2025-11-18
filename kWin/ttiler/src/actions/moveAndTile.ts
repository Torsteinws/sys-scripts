import type { Shortcut } from "../types/shortcut.js"

type Desktop = {
    readonly name: string
    readonly index: number
    window: KWin.Window | undefined
}

const desktops = {
    spotify: {
        name: "Spotify" as const,
        index: 1 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    signal: {
        name: "Signal" as const,
        index: 2 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    settings: {
        name: "Settings" as const,
        index: 3 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    vpnAndUtils: {
        name: "Vpn + Utils" as const,
        index: 4 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    browser1: {
        name: "Browser 1" as const,
        index: 5 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    terminal: {
        name: "Terminal" as const,
        index: 6 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    browser2: {
        name: "Browser 2" as const,
        index: 7 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    browser3: {
        name: "Browser 3" as const,
        index: 8 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    notes: {
        name: "Notes" as const,
        index: 9 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    fileExplorer: {
        name: "File Explorer" as const,
        index: 10 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    randomAccess: {
        name: "Random Access" as const,
        index: 11 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
    cheatsheet: {
        name: "Cheatsheet" as const,
        index: 12 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies Desktop,
} as const

function debug() {
    // moveAndTile(desktops.browser1)
    // workspace.stackingOrder.forEach((window) => {
    //     print(window.desktops[0]?.x11DesktopNumber, " | ", window.desktopFileName)
    // })
}

function moveAndTile(srcDesktop: Desktop) {
    if (srcDesktop.window === undefined) return print(`Did not find any window on "${srcDesktop.name}". Exiting...`)
    if (!srcDesktop.window.moveable) return print(`Can't move window away from "${srcDesktop.name}. Exiting...`)

    srcDesktop.window.desktops = [workspace.currentDesktop]

    const currentWindow = workspace.activeWindow

    workspace.activeWindow = srcDesktop.window
    workspace.slotWindowQuickTileRight()

    workspace.activeWindow = currentWindow
    workspace.slotWindowQuickTileLeft()
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

    print("Current index: ", currentIndex, ", number of windows: ", currentWindows.length)
    for (let i = 0; i < currentWindows.length; i++) {
        const window = currentWindows[i]!
        const desktop = getDesktopFromWindow(window)

        print("Moving window ", window.desktopFileName, " to ", desktop?.index)
        if (!desktop) continue

        moveWindowToIndex(window, desktop.index)
        window.setMaximize(true, true)
        print("Finished moving window")
    }
}

function getCurrentDesktop(): Desktop {
    const index = workspace.currentDesktop.x11DesktopNumber
    return getDesktopFromIndex(index)
}

function getDesktopFromIndex(index: number): Desktop {
    switch (index) {
        case desktops.spotify.index:
            return desktops.spotify
        case desktops.signal.index:
            return desktops.signal
        case desktops.settings.index:
            return desktops.settings
        case desktops.vpnAndUtils.index:
            return desktops.vpnAndUtils
        case desktops.browser1.index:
            return desktops.browser1
        case desktops.terminal.index:
            return desktops.terminal
        case desktops.browser2.index:
            return desktops.browser2
        case desktops.browser3.index:
            return desktops.browser3
        case desktops.notes.index:
            return desktops.notes
        case desktops.fileExplorer.index:
            return desktops.fileExplorer
        case desktops.randomAccess.index:
            return desktops.randomAccess
        case desktops.cheatsheet.index:
            return desktops.cheatsheet
        default:
            throw `Could not find current desktop from desktopIndex "${index}"`
    }
}

function getDesktopFromWindow(window: KWin.Window): Desktop | undefined {
    switch (window) {
        case desktops.spotify.window:
            return desktops.spotify
        case desktops.signal.window:
            return desktops.signal
        case desktops.settings.window:
            return desktops.settings
        case desktops.vpnAndUtils.window:
            return desktops.vpnAndUtils
        case desktops.browser1.window:
            return desktops.browser1
        case desktops.terminal.window:
            return desktops.terminal
        case desktops.browser2.window:
            return desktops.browser2
        case desktops.browser3.window:
            return desktops.browser3
        case desktops.notes.window:
            return desktops.notes
        case desktops.fileExplorer.window:
            return desktops.fileExplorer
        case desktops.randomAccess.window:
            return desktops.randomAccess
        case desktops.cheatsheet.window:
            return desktops.cheatsheet
        default:
            return undefined
    }
}

function getWindowsAtDesktopNumber(index: number): KWin.Window[] {
    const openWindows: KWin.Window[] = []
    workspace.stackingOrder.forEach((window) => {
        const indexMatches = window.desktops.filter((desktop) => desktop.x11DesktopNumber === index).length >= 0
        if (indexMatches) {
            openWindows.push(window)
        }
    })
    return openWindows
}

function syncWindows() {
    clearWindowTracking()
    const firefoxWindows: KWin.Window[] = []
    const otherWindows: KWin.Window[] = []

    // For each open window
    workspace.stackingOrder.forEach((window) => {
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
        if (window.desktops.length <= 0) return
        switch (window.desktops[0]!.x11DesktopNumber) {
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
        print(window.desktopFileName)
        if (window.desktops[0]?.x11DesktopNumber === desktops.randomAccess.index) {
            desktops.randomAccess.window = window
        }
    })

    print("Synced desktops for movement and tiling with ttiler")
}

function clearWindowTracking() {
    desktops.spotify.window = undefined
    desktops.signal.window = undefined
    desktops.settings.window = undefined
    desktops.vpnAndUtils.window = undefined
    desktops.browser1.window = undefined
    desktops.terminal.window = undefined
    desktops.browser2.window = undefined
    desktops.browser3.window = undefined
    desktops.notes.window = undefined
    desktops.fileExplorer.window = undefined
    desktops.randomAccess.window = undefined
    desktops.cheatsheet.window = undefined
}

function createMoveAndTileShortcut(key: string, desktop: Desktop): Shortcut {
    return {
        title: `moveAndTile.${desktop.name.replace(" ", "_")}`,
        text: `Move window from ${desktop.name} to the current desktop and then tile it to the left`,
        keySequence: key.length > 1 ? key : `Meta+Ctrl+Alt+Shift+${key}`,
        fn: () => moveAndTile(desktop),
    }
}

const shortcuts: Shortcut[] = [
    {
        title: "Debug.MoveAndTile",
        text: "Debug functions in MoveAndTile.ts",
        keySequence: "Meta+m",
        fn: debug,
    },
    {
        title: "syncWindows",
        text: "Sync window management",
        keySequence: "Meta+Ctrl+Alt+Shift+Space",
        fn: syncWindows,
    },
    {
        title: "restoreCurrentDesktop",
        text: "Restore windows on the current desktop to their original location",
        keySequence: "Meta+Ctrl+Alt+Shift+Return",
        fn: restoreCurrentDesktop,
    },
    createMoveAndTileShortcut("u", desktops.spotify),
    createMoveAndTileShortcut("h", desktops.signal),
    createMoveAndTileShortcut("o", desktops.settings),
    createMoveAndTileShortcut("p", desktops.vpnAndUtils),
    createMoveAndTileShortcut("j", desktops.browser1),
    createMoveAndTileShortcut("k", desktops.terminal),
    createMoveAndTileShortcut("l", desktops.browser2),
    createMoveAndTileShortcut("ø", desktops.browser3),
    createMoveAndTileShortcut("m", desktops.notes),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+;", desktops.fileExplorer),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+:", desktops.randomAccess),
    createMoveAndTileShortcut("Meta+Ctrl+Alt+_", desktops.cheatsheet),
]

export default { shortcuts }
