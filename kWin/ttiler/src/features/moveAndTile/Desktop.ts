export type DesktopEntry = {
    readonly name: string
    readonly index: number
    window: KWin.Window | undefined
}

export const desktops = {
    spotify: {
        name: "Spotify" as const,
        index: 1 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    signal: {
        name: "Signal" as const,
        index: 2 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    settings: {
        name: "Settings" as const,
        index: 3 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    vpnAndUtils: {
        name: "Vpn + Utils" as const,
        index: 4 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    browser1: {
        name: "Browser 1" as const,
        index: 5 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    terminal: {
        name: "Terminal" as const,
        index: 6 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    browser2: {
        name: "Browser 2" as const,
        index: 7 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    browser3: {
        name: "Browser 3" as const,
        index: 8 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    notes: {
        name: "Notes" as const,
        index: 9 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    fileExplorer: {
        name: "File Explorer" as const,
        index: 10 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    randomAccess: {
        name: "Random Access" as const,
        index: 11 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
    cheatsheet: {
        name: "Cheatsheet" as const,
        index: 12 as const,
        window: undefined as KWin.Window | undefined,
    } satisfies DesktopEntry,
} as const

export function getCurrentDesktop(): DesktopEntry {
    const index = workspace.currentDesktop.x11DesktopNumber
    return getDesktopFromIndex(index)
}

export function getDesktopFromIndex(index: number): DesktopEntry {
    switch (index) {
        case desktops.spotify.index:
            return desktops.spotify
        case desktops.signal.index:
            return desktops.signal
        case desktops.settings.index:
            return desktops.settings
        case desktops.vpnAndUtils.index:
            return desktops.vpnAndUtils
        case desktops.browser1.index:
            return desktops.browser1
        case desktops.terminal.index:
            return desktops.terminal
        case desktops.browser2.index:
            return desktops.browser2
        case desktops.browser3.index:
            return desktops.browser3
        case desktops.notes.index:
            return desktops.notes
        case desktops.fileExplorer.index:
            return desktops.fileExplorer
        case desktops.randomAccess.index:
            return desktops.randomAccess
        case desktops.cheatsheet.index:
            return desktops.cheatsheet
        default:
            throw `Could not find current desktop from desktopIndex "${index}"`
    }
}

export function getDesktopFromWindow(window: KWin.Window): DesktopEntry | undefined {
    switch (window) {
        case desktops.spotify.window:
            return desktops.spotify
        case desktops.signal.window:
            return desktops.signal
        case desktops.settings.window:
            return desktops.settings
        case desktops.vpnAndUtils.window:
            return desktops.vpnAndUtils
        case desktops.browser1.window:
            return desktops.browser1
        case desktops.terminal.window:
            return desktops.terminal
        case desktops.browser2.window:
            return desktops.browser2
        case desktops.browser3.window:
            return desktops.browser3
        case desktops.notes.window:
            return desktops.notes
        case desktops.fileExplorer.window:
            return desktops.fileExplorer
        case desktops.randomAccess.window:
            return desktops.randomAccess
        case desktops.cheatsheet.window:
            return desktops.cheatsheet
        default:
            return undefined
    }
}
