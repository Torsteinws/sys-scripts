import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"

function debug() {}

function adjustTileWidth(direction: "left" | "right") {
    const leftTile = getTile("left")
    const delta = 0.015
    if (direction === "left") {
        leftTile.relativeGeometry.width -= delta
    } else {
        leftTile.relativeGeometry.width += delta
    }
}

function cycleTileWidth() {
    const leftTile = getTile("left")
    const currentWidth = leftTile.relativeGeometry.width
    const nextWidth = getNextTileWidth(currentWidth)

    leftTile.relativeGeometry.width = nextWidth
    leftTile.parent.padding = 7
}

function cycleTileWidthAllDesktops() {
    const initialLeftTile = getTile("left")
    const initialWidth = initialLeftTile.relativeGeometry.width
    const nextWidth = getNextTileWidth(initialWidth)

    const initialDesktop = workspace.currentDesktop
    workspace.desktops.forEach((desktop) => {
        workspace.currentDesktop = desktop
        const currentLeftTile = getTile("left")
        currentLeftTile.relativeGeometry.width = nextWidth
        currentLeftTile.parent.padding = 7
    })
    workspace.currentDesktop = initialDesktop
    utils.showText(`Set all left tiles to ${nextWidth * 100}%`, "dialog-positive")
}

function getNextTileWidth(currentWidth: number): number {
    const breakPoints = [0.705, 0.62, 0.5] // Percentage of the screen
    const defaultBreakPoint = breakPoints[0]!

    let nextWidth = undefined
    for (let i = 0; i < breakPoints.length; i++) {
        const breakPoint = breakPoints[i]!
        const margin = 0.002
        const min = breakPoint - margin
        const max = breakPoint + margin
        const inRange = currentWidth >= min && currentWidth <= max
        if (inRange) {
            nextWidth = breakPoints[(i + 1) % breakPoints.length] // Select the next item in the breakpoint list. If at the end, loop back to the first item
            break
        }
    }
    if (nextWidth === undefined) {
        nextWidth = defaultBreakPoint
    }
    return nextWidth
}

function adjustTilePaddingAllDesktops(adjustment: "increment" | "decrement") {
    getRootTiles().forEach((tile) => {
        adjustTilePadding(adjustment, tile)
    })
}

function adjustTilePadding(adjustment: "increment" | "decrement", rootTile?: KWin.Tile) {
    rootTile ??= workspace.tilingForScreen(workspace.activeScreen).rootTile
    const delta = 1
    if (adjustment === "increment") {
        rootTile.padding += delta
    } else {
        rootTile.padding -= delta
    }

    if (rootTile.padding < 0) {
        rootTile.padding = 0
    }
}

// The root tiles will never change, so lets save them to improve performance
const rootTiles: KWin.Tile[] = []
function getRootTiles() {
    if (rootTiles.length === 0) {
        const originalDesktop = workspace.currentDesktop
        const tilingManager = workspace.tilingForScreen(workspace.activeScreen)
        workspace.desktops.forEach((desktop) => {
            workspace.currentDesktop = desktop
            rootTiles.push(tilingManager.rootTile)
        })
        workspace.currentDesktop = originalDesktop
    }
    return rootTiles
}

function getTile(location: "left" | "right") {
    const screen = workspace.activeScreen
    const geometricX = location === "left" ? screen.geometry.left : screen.geometry.right
    const tileManager = workspace.tilingForScreen(screen)
    return tileManager.bestTileForPosition(geometricX, screen.geometry.top)
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "setTileSize.Debug",
    //     text: "Debug functions in setTileSize.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
    {
        title: "setTileSize.adjustLeft",
        text: "Adjust the tile width in leftward direction",
        keySequence: "Ctrl+Alt+Shift+h",
        fn: () => adjustTileWidth("left"),
    },
    {
        title: "setTileSize.adjustRight",
        text: "Adjust the tile width in rightward direction",
        keySequence: "Ctrl+Alt+Shift+l",
        fn: () => adjustTileWidth("right"),
    },
    {
        title: "setTileSize.cycleTileWidth",
        text: "Cycle the tile width on the current virtual desktop",
        keySequence: "Meta+Ctrl+Alt+'",
        fn: cycleTileWidth,
    },
    {
        title: "setTileSize.cycleTileWidthAllDesktops",
        text: "Reset the tile width on all virtual desktops",
        keySequence: "Meta+Ctrl+Alt+*",
        fn: cycleTileWidthAllDesktops,
    },
    {
        title: "setTileSize.incrementPadding",
        text: "Increment the padding in the tiling layout",
        keySequence: "Meta+Ctrl+Alt++",
        fn: () => adjustTilePaddingAllDesktops("increment"),
    },
    {
        title: "setTileSize.decrementPadding",
        text: "Decrement the padding in the tiling layout",
        keySequence: "Meta+Ctrl+Alt+?",
        fn: () => adjustTilePaddingAllDesktops("decrement"),
    },
]

export default { shortcuts }
