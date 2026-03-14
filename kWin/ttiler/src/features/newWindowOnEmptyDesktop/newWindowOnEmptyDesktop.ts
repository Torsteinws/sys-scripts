import { desktops, desktopState, type Desktop } from "../../desktopState.js"
import type { Shortcut } from "../../types/shortcut.js"

const defaultConfig = {
    ignoreDesktopFileName: ["org.kde.xwaylandvideobridge"],
}

type Config = typeof defaultConfig
let config: Config = defaultConfig

function debug() {}

function setup(userConfig?: Partial<Config>) {
    if (userConfig) {
        Object.assign(config, userConfig)
    }
    workspace.windowAdded.connect(onWindowAdded)
}

function onWindowAdded(window: KWin.Window) {
    if (!isValidWindow(window)) return

    const availableDesktop = findAvailableDesktop()
    if (!availableDesktop) return

    window.desktops = [availableDesktop.native]
    window.setMaximize(true, true)
    workspace.currentDesktop = availableDesktop.native
    workspace.activeWindow = window

    desktopState.resyncWindow(window)
}

function isValidWindow(window: KWin.Window) {
    if (!window.normalWindow) return false

    // Do not support windows that are at multiple desktops at once
    if (window.desktops.length !== 1) return false

    const isEmpty = !window.desktopFileName
    if (isEmpty) return false

    const inIgnoreList = config.ignoreDesktopFileName.indexOf(window.desktopFileName) !== -1
    if (inIgnoreList) return false

    // Check if window is spawned by an existing window
    const hasOwner = workspace.stackingOrder.filter((w) => w !== window && w.pid === window.pid).length > 0
    if (hasOwner) return false

    return true
}

function findAvailableDesktop() {
    for (let i = 0; i < desktops.length; i++) {
        const desktop = desktops[i]
        const isRandom = desktop?.windows.length === 0
        const hasSpace = desktop?.native.name.toLowerCase().startsWith("random")
        if (isRandom && hasSpace) {
            return desktop
        }
    }
    return undefined
}

function moveWindowToIndex(window: KWin.Window, targetIndex: number) {
    const targetDesktop = workspace.desktops[targetIndex - 1]
    if (!targetDesktop)
        throw `Tried to move window "${window.desktopFileName}" to desktop at "${targetIndex}", but desktop index was out of bounds`
    window.desktops = [targetDesktop]
    desktopState.resyncWindow(window)
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "forceFirefoxToDesktop.Debug",
    //     text: "Debug functions in forceFirefoxToDesktop.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
]

export default { shortcuts, setup }
