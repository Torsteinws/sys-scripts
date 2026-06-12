import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"

function debug() {}

function adjustTileWidth(direction: "left" | "right") {
    const tiles = utils.getCurrentTiles()
    if (!tiles.exists) return

    const delta = 0.015
    if (direction === "left") {
        tiles.left.relativeGeometry.width -= delta
    } else {
        tiles.left.relativeGeometry.width += delta
    }
}

function cycleTileWidth() {
    const tiles = utils.getCurrentTiles()
    if (!tiles.exists) return

    const currentWidth = tiles.left.relativeGeometry.width
    const nextWidth = getNextTileWidth(currentWidth)

    tiles.left.relativeGeometry.width = nextWidth
}

function cycleTileWidthAllDesktops() {
    const initialTiles = utils.getCurrentTiles()
    if (!initialTiles.exists) return

    const initialWidth = initialTiles.left.relativeGeometry.width
    const nextWidth = getNextTileWidth(initialWidth)

    workspace.desktops.forEach((desktop) => {
        workspace.screens.forEach((screen) => {
            const rootTile = workspace.rootTile(screen, desktop)
            const leftTile = rootTile.tiles[0]
            if (leftTile) {
                leftTile.relativeGeometry.width = nextWidth
            }
        })
    })

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

const shortcuts: Shortcut[] = [
    // {
    //     title: "setTileSize.Debug",
    //     text: "Debug functions in setTileSize.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
    {
        title: "setTileSize.adjustLeft1",
        text: "Adjust the tile width in leftward direction",
        keySequence: "Ctrl+Alt+Shift+h",
        fn: () => adjustTileWidth("left"),
    },
    {
        title: "setTileSize.adjustLeft2",
        text: "Adjust the tile width in leftward direction",
        keySequence: "Ctrl+Alt+Shift+Left",
        fn: () => adjustTileWidth("left"),
    },
    {
        title: "setTileSize.adjustRight1",
        text: "Adjust the tile width in rightward direction",
        keySequence: "Ctrl+Alt+Shift+l",
        fn: () => adjustTileWidth("right"),
    },
    {
        title: "setTileSize.adjustRight2",
        text: "Adjust the tile width in rightward direction",
        keySequence: "Ctrl+Alt+Shift+Right",
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
