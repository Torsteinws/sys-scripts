import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"

function debug() {}

function adjustTileWidth(direction: "left" | "right") {
    const leftTile = getTile("left")
    const delta = 0.02
    if (direction === "left") {
        leftTile.relativeGeometry.width -= delta
    } else {
        leftTile.relativeGeometry.width += delta
    }
}

function resetTileChanges() {
    const leftTile = getTile("left")
    leftTile.relativeGeometry.width = 0.62
    leftTile.parent.padding = 2
}

function resetTileChangesAllDesktops() {
    const originalDesktop = workspace.currentDesktop
    workspace.desktops.forEach((desktop) => {
        workspace.currentDesktop = desktop
        resetTileChanges()
    })
    workspace.currentDesktop = originalDesktop
    utils.showText("Reset all tiling layouts", "dialog-positive")
}

function adjustTilePadding(adjustment: "increment" | "decrement") {
    const tilingManager = workspace.tilingForScreen(workspace.activeScreen)
    const tile = tilingManager.rootTile

    const delta = 1
    if (adjustment === "increment") {
        tile.padding += delta
    } else {
        tile.padding -= delta
    }

    if (tile.padding < 0) {
        tile.padding = 0
    }
}

function getTile(location: "left" | "right") {
    const screen = workspace.activeScreen
    const tileManager = workspace.tilingForScreen(screen)
    const geometricX = location === "left" ? screen.geometry.left : screen.geometry.right
    return tileManager.bestTileForPosition(geometricX, screen.geometry.top)
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
    {
        title: "setTileSize.resetTileWidth",
        text: "Reset the tile width on the current virtual desktop",
        keySequence: "Meta+Ctrl+Alt+'",
        fn: resetTileChanges,
    },
    {
        title: "setTileSize.resetTileWidthAllDesktops",
        text: "Reset the tile width on all virtual desktops",
        keySequence: "Meta+Ctrl+Alt+*",
        fn: resetTileChangesAllDesktops,
    },
    {
        title: "setTileSize.incrementPadding",
        text: "Increment the padding in the tiling layout",
        keySequence: "Meta+Ctrl+Alt++",
        fn: () => adjustTilePadding("increment"),
    },
    {
        title: "setTileSize.decrementPadding",
        text: "Decrement the padding in the tiling layout",
        keySequence: "Meta+Ctrl+Alt+?",
        fn: () => adjustTilePadding("decrement"),
    },
]

export default { shortcuts }
