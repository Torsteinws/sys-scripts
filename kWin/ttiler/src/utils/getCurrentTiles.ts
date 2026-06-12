/**
 * Get left and right tile on current desktop at current screen.
 * @returns Left and right tile, or undefined if not found.
 */
export function getCurrentTiles() {
    const rootTile = workspace.rootTile(workspace.activeScreen, workspace.currentDesktop)

    const left = rootTile.tiles[0]
    const right = rootTile.tiles[1]
    if (!left || !right) {
        print("Did not find left and right tile")
        return {
            left: undefined,
            right: undefined,
            exists: false as const,
        }
    }

    return {
        left,
        right,
        exists: true as const,
    }
}
