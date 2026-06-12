import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"

function swapTile(direction: "horizontal" | "vertical") {
    if (direction === "vertical") throw "Vertical swap of windows is not implemented"

    const tiles = utils.getCurrentTiles()
    if (!tiles.exists) return

    // Ensure arrays are copied by value (not reference)
    const leftWindows = tiles.left.windows.slice()
    const rightWindows = tiles.right.windows.slice()

    leftWindows.forEach((win) => (win.tile = tiles.right))
    rightWindows.forEach((win) => (win.tile = tiles.left))
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "betterQuickTile.Debug",
    //     text: "Debug functions in betterQuickTile.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },

    {
        title: "swapTile.swapTileHorizontal",
        text: "Swap window from left to right tile",
        keySequence: "Meta+Ctrl+Alt+¨",
        fn: () => swapTile("horizontal"),
    },
]

export default { shortcuts }
