import type { Shortcut } from "../../types/shortcut.js"

function debug() {}

function moveFocus(direction: "left" | "right") {
    const screen = workspace.activeScreen
    const tileManager = workspace.tilingForScreen(screen)
    const leftTile = tileManager.bestTileForPosition(screen.geometry.left, screen.geometry.top)
    const rightTile = tileManager.bestTileForPosition(screen.geometry.right, screen.geometry.top)

    const leftWin = leftTile.windows[0]
    const rightWin = rightTile.windows[0]
    if (leftWin === undefined || rightWin === undefined) return print("Did not find two windows to move focus between")

    workspace.activeWindow = direction === "left" ? leftWin : rightWin
}

const shortcuts: Shortcut[] = [
    // {
    //     title: "MoveFocus.Debug",
    //     text: "Debug functions in moveFocus.ts",
    //     keySequence: "Meta+m",
    //     fn: debug,
    // },
    {
        title: "MoveFocus.moveLeft",
        text: "Move keyboard focus to the left window",
        keySequence: "Ctrl+Shift+h",
        fn: () => moveFocus("left"),
    },
    {
        title: "MoveFocus.moveRight",
        text: "Move keyboard focus to the right window",
        keySequence: "Ctrl+Shift+l",
        fn: () => moveFocus("right"),
    },
]

export default { shortcuts }
