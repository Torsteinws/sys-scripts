import { desktops, desktopState, type Desktop } from "../../desktopState.js"
import type { Optional } from "../../types/Optional.js"
import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"

const defaultConfig = {
    ignoreDesktopFileName: ["org.kde.xwaylandvideobridge"],
    desktopPriority: undefined as undefined | { x11DesktopNumber: number[] },
}

type Config = typeof defaultConfig
let config: Config = defaultConfig

function debug() {}

function setup(userConfig?: Optional<Config>) {
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

    utils.showText("=".repeat(70) + "\n\n" + availableDesktop.native.name + "\n\n" + "=".repeat(70))
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
    for (let i = 0; config.desktopPriority?.x11DesktopNumber.length ?? -1 > 0; i++) {
        const index = (config.desktopPriority?.x11DesktopNumber[i] ?? 0) - 1
        const inRange = index >= 0 && index < desktops.length
        if (inRange) {
            const desktop = desktops[index]
            const hasSpace = desktop?.windows.length === 0
            if (hasSpace) {
                return desktop
            }
        }
    }

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

const shortcuts: Shortcut[] = [
    // {
    //     title: "newWindowOnEmptyDesktop.Debug",
    //     text: "Debug functions in newWindowOnEmptyDesktop.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
]

export default { shortcuts, setup }
