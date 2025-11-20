import moveAndTile from "./features/moveAndTile/moveAndTile.js"
import type { Shortcut } from "./types/shortcut.js"
import { utils } from "./utils/index.js"

const shortcuts: Shortcut[] = ([] as Shortcut[]).concat(moveAndTile.shortcuts)

shortcuts.forEach((shortcut) => {
    const shortcutTitle = `ttiler.${shortcut.title}`

    const fnWithLogger = () => {
        print("Executing shortcut..." + shortcutTitle)
        logErrors(shortcut.fn)
        print("Shortcut executed...." + Date())
    }

    registerShortcut(shortcutTitle, shortcut.text, shortcut.keySequence, fnWithLogger)
})

function logErrors(fn: () => void) {
    try {
        fn()
    } catch (err) {
        print("[ERROR] " + err)
        utils.showText(`${err}`, "dialog-error")
    }
}
