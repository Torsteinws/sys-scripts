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

        let targetDesktopIndex: undefined | number = undefined
        if (window.caption.endsWith("Personal — Mozilla Firefox")) {
            targetDesktopIndex = 7
        } else if (window.caption.endsWith("Work — Mozilla Firefox")) {
            targetDesktopIndex = 6
        } else if (window.caption.endsWith("Dev — Mozilla Firefox")) {
            targetDesktopIndex = 9
        } else if (window.caption.endsWith("Documentation — Mozilla Firefox")) {
            targetDesktopIndex = 10
        } else if (window.caption.endsWith("Cheatsheet — Mozilla Firefox")) {
            targetDesktopIndex = 15
        }

        if (targetDesktopIndex !== undefined) {
            moveWindowToIndex(window, targetDesktopIndex)
            window.noBorder = true
            window.setMaximize(true, true)
            window.captionChanged.disconnect(onCaptionChanged)
        }
    }

    window.captionChanged.connect(onCaptionChanged)
}

function moveWindowToIndex(window: KWin.Window, targetIndex: number) {
    const targetDesktop = workspace.desktops[targetIndex - 1]
    if (!targetDesktop)
        throw `Tried to move window "${window.desktopFileName}" to desktop at "${targetIndex}", but desktop index was out of bounds`
    window.desktops = [targetDesktop]
}

workspace.windowAdded.connect(onWindowAdded)

const shortcuts: Shortcut[] = [
    // {
    //     title: "forceFirefoxToDesktop.Debug",
    //     text: "Debug functions in forceFirefoxToDesktop.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
]

export default { shortcuts }
