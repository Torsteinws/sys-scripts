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

function syncWindows() {
    clearWindowTracking()
    const firefoxWindows: KWin.Window[] = []

    // For each open window
    workspace.stackingOrder.forEach((window) => {
        switch (window.desktopFileName) {
            case "spotify_spotify":
                desktops.spotify.window = window
                break
            case "signal":
                desktops.signal.window = window
                break
            case "firefox_firefox":
                firefoxWindows.push(window)
                break
            case "com.mitchellh.ghostty":
                desktops.terminal.window = window
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
    print("Prepare desktops for movement and tiling with ttiler")
}

function clearWindowTracking() {
    desktops.spotify.window = undefined
    desktops.signal.window = undefined
    desktops.browser1.window = undefined
    desktops.terminal.window = undefined
    desktops.browser2.window = undefined
    desktops.cheatsheet.window = undefined
}

function createMoveAndTileShortcut(key: string, desktop: Desktop): Shortcut {
    return {
        title: `moveAndTile.${desktop.name.replace(" ", "_")}`,
        text: `Move window from ${desktop.name} to the current desktop and then tile it to the left`,
        keySequence: `Meta+Ctrl+Alt+Shift+${key}`,
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
        keySequence: "Meta+Ctrl+Alt+Return",
        fn: syncWindows,
    },
    createMoveAndTileShortcut("u", desktops.spotify),
    createMoveAndTileShortcut("i", desktops.signal),
    createMoveAndTileShortcut("j", desktops.browser1),
    createMoveAndTileShortcut("k", desktops.terminal),
    createMoveAndTileShortcut("l", desktops.browser2),
    createMoveAndTileShortcut("ø", desktops.browser3),
    createMoveAndTileShortcut("-", desktops.cheatsheet),
]

export default { shortcuts }
