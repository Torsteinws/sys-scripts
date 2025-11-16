import moveAndTile from "./actions/moveAndTile.js"
import type { Shortcut } from "./types/shortcut.js"

const shortcuts: Shortcut[] = ([] as Shortcut[]).concat(moveAndTile.shortcuts)

shortcuts.forEach((shortcut) => {
    const fnWithErrorLogger = () => logErrors(shortcut.fn)
    registerShortcut(
        `ttiler.${shortcut.title}`,
        shortcut.text,
        shortcut.keySequence,
        fnWithErrorLogger
    )
})

function logErrors(fn: () => void) {
    try {
        fn()
    } catch (err) {
        print("[ERROR] " + err)
    }
}
