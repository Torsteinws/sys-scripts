import { desktopState } from "../../desktopState.js"
import type { Shortcut } from "../../types/shortcut.js"

const loginTime = new Date()

function debug() {}

function setup() {
    workspace.windowAdded.connect(onWindowAdded)
}

function onWindowAdded(window: KWin.Window) {
    const currentTime = new Date()
    const timeDiffMs = currentTime.getTime() - loginTime.getTime()
    if (timeDiffMs > 60_000) {
        workspace.windowAdded.disconnect(onWindowAdded)
        return
    }

    window.demandsAttention = false
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "blockDemandsAttentionOnLogin.Debug",
    //     text: "Debug functions in blockDemandsAttentionOnLogin.ts",
    //     keySequence: "Meta+,",
    //     fn: debug,
    // },
]

export default { shortcuts, setup }
