import type { Shortcut } from "../types/shortcut.js"

function debug() {
    print("--------- script start ---------")

    const windows = workspace.stackingOrder
    for (let i = 0; i < windows.length; i++) {
        const win = windows[i]
        print("--------------------------------------")
        print(win?.desktopFileName)
        print(win?.resourceName)
        print(win?.caption)
        print(win?.desktops[0]?.x11DesktopNumber)
        print(win?.desktops[0]?.name)
    }

    print("--------- script end ---------")
}

const shortcuts: Shortcut[] = [
    {
        title: "Debug",
        text: "Debug ttiler",
        keySequence: "Meta+m",
        fn: debug,
    },
]

export default { shortcuts }
