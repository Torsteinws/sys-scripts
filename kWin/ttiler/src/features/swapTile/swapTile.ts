import type { Shortcut } from "../../types/shortcut.js"

function swapTile(direction: "horizontal" | "vertical") {
    if (direction === "vertical") throw "Vertical swap of windows is not implemented"

    const screen = workspace.activeScreen
    const tileManager = workspace.tilingForScreen(screen)

    const leftTile = tileManager.bestTileForPosition(screen.geometry.left, screen.geometry.top)
    const rightTile = tileManager.bestTileForPosition(screen.geometry.right, screen.geometry.top)

    // Ensure arrays are copied by value (not reference)
    const leftWindows = leftTile.windows.slice()
    const rightWindows = rightTile.windows.slice()

    leftWindows.forEach((win) => (win.tile = rightTile))
    rightWindows.forEach((win) => (win.tile = leftTile))
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
