import { desktops, desktopState } from "../../desktopState.js"
import type { Shortcut } from "../../types/shortcut.js"

function debug() {}

function onWindowAdded(window: KWin.Window) {
    if (!window.normalWindow) return
    if (window.desktopFileName.substring(0, 7) !== "firefox") return

    const onCaptionChanged = () => {
        if (window.caption.startsWith("about:blank")) {
            window.captionChanged.disconnect(onCaptionChanged)
            return
        }

        let x11DesktopNumber: undefined | number = undefined
        if (window.caption.endsWith("Tools — Mozilla Firefox")) {
            x11DesktopNumber = 6
        } else if (window.caption.endsWith("Personal — Mozilla Firefox")) {
            x11DesktopNumber = 12
        } else if (window.caption.endsWith("Work — Mozilla Firefox")) {
            x11DesktopNumber = 11
        } else if (window.caption.endsWith("Personal — Mozilla Firefox")) {
            x11DesktopNumber = 12
        } else if (window.caption.endsWith("Dev — Mozilla Firefox")) {
            x11DesktopNumber = 14
        } else if (window.caption.endsWith("Documentation — Mozilla Firefox")) {
            x11DesktopNumber = 15
        } else if (window.caption.endsWith("Videos — Mozilla Firefox")) {
            x11DesktopNumber = 16
        } else if (window.caption.endsWith("Projects — Mozilla Firefox")) {
            x11DesktopNumber = 19
        } else if (window.caption.endsWith("Cheatsheet — Mozilla Firefox")) {
            x11DesktopNumber = 20
        }

        if (x11DesktopNumber === undefined) return

        const targetDesktop = desktops[x11DesktopNumber - 1]
        if (targetDesktop === undefined) return

        moveWindowToIndex(window, x11DesktopNumber)
        workspace.currentDesktop = targetDesktop.native
        window.noBorder = true
        window.setMaximize(true, true)

        window.captionChanged.disconnect(onCaptionChanged)
    }

    window.captionChanged.connect(onCaptionChanged)
}

function moveWindowToIndex(window: KWin.Window, targetIndex: number) {
    const targetDesktop = workspace.desktops[targetIndex - 1]
    if (!targetDesktop)
        throw `Tried to move window "${window.desktopFileName}" to desktop at "${targetIndex}", but desktop index was out of bounds`
    window.desktops = [targetDesktop]
    desktopState.resyncWindow(window)
}

function setup() {
    workspace.windowAdded.connect(onWindowAdded)
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
