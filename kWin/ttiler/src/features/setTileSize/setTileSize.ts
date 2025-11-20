import type { Shortcut } from "../../types/shortcut.js"

function debug() {}

function adjustTileWidth(direction: "left" | "right") {
    const screen = workspace.activeScreen
    const tileManager = workspace.tilingForScreen(screen)
    const leftTile = tileManager.bestTileForPosition(screen.geometry.left, screen.geometry.top)

    const delta = 0.02
    if (direction === "left") {
        leftTile.relativeGeometry.width -= delta
    } else {
        leftTile.relativeGeometry.width += delta
    }
}

const shortcuts: Shortcut[] = [
    {
        title: "setTileSize.Debug",
        text: "Debug functions in setTileSize.ts",
        keySequence: "Meta+m",
        fn: debug,
    },
    {
        title: "setTileSize.adjustLeft",
        text: "Adjust the tile width in leftward direction",
        keySequence: "Ctrl+Shift+h",
        fn: () => adjustTileWidth("left"),
    },
    {
        title: "setTileSize.adjustRight",
        text: "Adjust the tile width in rightward direction",
        keySequence: "Ctrl+Shift+l",
        fn: () => adjustTileWidth("right"),
    },
]

export default { shortcuts }
