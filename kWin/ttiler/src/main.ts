import * as desktopState from "./desktopState.js"
import betterQuickTile from "./features/betterQuickTile/betterQuickTile.js"
import forceFirefoxToDesktop from "./features/forceFirefoxToDesktop/forceFirefoxToDesktop.js"
import moveAndTile from "./features/moveAndTile/moveAndTile.js"
import moveTileFocus from "./features/moveTileFocus/moveTileFocus.js"
import retileDesktop from "./features/retileDesktop/retileDesktop.js"
import setTileSize from "./features/setTileSize/setTileSize.js"
import swapTile from "./features/swapTile/swapTile.js"
import toggleTitlebar from "./features/toggleTitlebar/toggleTitlebar.js"
import type { Shortcut } from "./types/shortcut.js"
import { utils } from "./utils/index.js"

desktopState.setup({
    ignoreDesktopFileName: ["org.kde.xwaylandvideobridge", "org.qbittorrent.qBittorrent", "proton.vpn.app.gtk"],
})

const shortcuts: Shortcut[] = ([] as Shortcut[])
    .concat(betterQuickTile.shortcuts)
    .concat(forceFirefoxToDesktop.shortcuts)
    .concat(moveAndTile.shortcuts)
    .concat(moveTileFocus.shortcuts)
    .concat(retileDesktop.shortcuts)
    .concat(setTileSize.shortcuts)
    .concat(swapTile.shortcuts)
    .concat(toggleTitlebar.shortcuts)
    .concat(desktopState.shortcuts)

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
