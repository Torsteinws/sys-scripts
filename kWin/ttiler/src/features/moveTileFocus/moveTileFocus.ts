import type { Shortcut } from "../../types/shortcut.js"
import { utils } from "../../utils/index.js"

function debug() {}

function moveFocus(direction: "left" | "right") {
    const tiles = utils.getCurrentTiles()
    if (!tiles.exists) return

    const leftWin = tiles.left.windows[0]
    const rightWin = tiles.right.windows[0]
    if (!leftWin || !rightWin) return print("Did not find two windows to move focus between")

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
