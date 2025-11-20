/**
 * Set clipboard content
 * @param text - Text to set in clipboard
 */
export function setClipboard(text: string) {
    callDBus("org.kde.klipper", "/klipper", "org.kde.klipper.klipper", "setClipboardContents", text)
}
