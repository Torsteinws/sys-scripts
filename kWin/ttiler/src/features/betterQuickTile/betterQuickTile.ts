import type { Shortcut } from "../../types/shortcut.js"
import { getCurrentTiles } from "../../utils/getCurrentTiles.js"

function debug() {}

function quickTile(direction: "left" | "right") {
    const tiles = getCurrentTiles()
    if (!tiles.exists) return

    workspace.activeWindow.tile = direction === "left" ? tiles.left : tiles.right
    workspace.activeWindow.noBorder = false
}

function quickMaximize() {
    workspace.activeWindow.setMaximize(true, true)
    workspace.activeWindow.noBorder = true
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "betterQuickTile.Debug",
    //     text: "Debug functions in betterQuickTile.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
    {
        title: "betterQuickTile.quickMaximize",
        text: "Mazimize the active window",
        keySequence: "Meta+Up",
        fn: quickMaximize,
    },

    {
        title: "betterQuickTile.quickTileLeft",
        text: "Move active window to the left tile",
        keySequence: "Meta+Left",
        fn: () => quickTile("left"),
    },
    {
        title: "betterQuickTile.quickTileRight",
        text: "Move active window to the right tile",
        keySequence: "Meta+Right",
        fn: () => quickTile("right"),
    },
]

export default { shortcuts }
