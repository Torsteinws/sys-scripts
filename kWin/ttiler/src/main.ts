import moveAndTile from "./actions/moveAndTile.js"
import type { Shortcut } from "./types/shortcut.js"

const shortcuts: Shortcut[] = ([] as Shortcut[]).concat(moveAndTile.shortcuts)

shortcuts.forEach((shortcut) => {
    const shortcutTitle = `ttiler.${shortcut.title}`

    const fnWithLogger = () => {
        print("Executing shortcut..." + shortcutTitle)
        logErrors(shortcut.fn)
        print("Shortcut executed...." + Date())
    }

    registerShortcut(
        shortcutTitle,
        shortcut.text,
        shortcut.keySequence,
        fnWithLogger
    )
})

function logErrors(fn: () => void) {
    try {
        fn()
    } catch (err) {
        print("[ERROR] " + err)
    }
}
