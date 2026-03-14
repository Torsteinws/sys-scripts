import type { Shortcut } from "./types/shortcut.js"
import { utils } from "./utils/index.js"

const defaultConfig = {
    ignoreDesktopFileName: ["org.kde.xwaylandvideobridge"],
    ignoreEmptyDesktopFilename: true,
}

type Config = typeof defaultConfig
let config: Config = defaultConfig

type desktop = {
    native: KWin.VirtualDesktop
    windows: KWin.Window[]
    rootTile: KWin.Tile
}

let desktops: desktop[] = []
let windows: KWin.Window[] = []

function debug() {
    desktops.forEach((desk, i) => {
        print(i, desk.native.name)
        desk.windows.forEach((win) => {
            print("    ", win.caption.substring(0, 40) + (win.caption.length > 41 ? "..." : ""))
        })
    })
}

function setup(userConfig: Partial<Config>) {
    if (userConfig) {
        Object.assign(config, userConfig)
    }
    fullSync()
    workspace.windowAdded.connect(onWindowAdded)
    workspace.windowRemoved.connect(onWindowRemoved)
    workspace.desktopLayoutChanged.connect(onDesktopLayoutChanged)
}

// ---- Resync windows ----

function onResyncWindowsRequest() {
    resyncAllWindows()
    utils.showText("Synced windows", "dialog-positive")
}

function onDesktopLayoutChanged() {
    fullSync()
}

function fullSync() {
    desktops = new Array(workspace.desktops.length)
    for (let i = 0; i < workspace.desktops.length; i++) {
        desktops[i] = {
            native: workspace.desktops[i]!,
            windows: [],
            rootTile: workspace.rootTile(workspace.activeScreen, workspace.desktops[i]!),
        }
    }
    resyncAllWindows()
}

function resyncAllWindows() {
    desktops.forEach((desk) => (desk.windows = []))
    windows = []

    workspace.stackingOrder.forEach((win) => {
        addWindow(win)
    })
}

function resyncWindow(window: KWin.Window) {
    desktops.forEach((desk) => {
        desk.windows = desk.windows.filter((win) => win !== window)
    })
    addWindow(window)
}

// ---- Add/Remove window ----

function onWindowAdded(window: KWin.Window) {
    // Quick exit if not valid
    if (!isValidWindow(window)) return

    // This event might fire mutliple times for same window, so let's check if it is allready tracked by us
    if (windows.indexOf(window) === -1) {
        addWindow(window)
    }
}

function onWindowRemoved(window: KWin.Window) {
    removeWindow(window)
}

function isValidWindow(window: KWin.Window) {
    if (!window.normalWindow) return false

    // Do not support windows that are at multiple desktops at once
    if (window.desktops.length !== 1) return false

    if (config.ignoreEmptyDesktopFilename && !window.desktopFileName) return false

    if (config.ignoreDesktopFileName.indexOf(window.desktopFileName) !== -1) return false

    return true
}

function addWindow(window: KWin.Window) {
    if (!isValidWindow(window)) return

    const desktopNumber = window.desktops[0]!.x11DesktopNumber - 1
    if (desktopNumber < 0) return

    Array.prototype.push.apply(desktops[desktopNumber]!.windows, [window])
    Array.prototype.push.apply(windows, [window])
}

function removeWindow(window: KWin.Window) {
    // Since we are already iterating over every window, let's also remove undefined itmes if they exists
    desktops.forEach((desk) => {
        desk.windows = desk.windows.filter((win) => win !== window && win !== undefined)
    })
    windows = windows.filter((win) => win !== window && win !== undefined)
}

// ---- Exports ----

const shortcuts: Shortcut[] = [
    {
        title: "desktopState.Debug",
        text: "Debug desktopState",
        keySequence: "Meta+m",
        fn: debug,
    },
    {
        title: "desktopState.resyncWindows",
        text: "Resync windows",
        keySequence: "Meta+Ctrl+Alt+Shift+Space",
        fn: onResyncWindowsRequest,
    },
]

const publicUtils = {
    resyncAllWindows: resyncAllWindows,
    resyncWindow: resyncWindow,
}

export { setup, shortcuts, desktops, publicUtils as desktopState }
