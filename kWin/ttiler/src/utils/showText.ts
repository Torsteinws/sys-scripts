/**
 *  Display some text at the center of the screen.
 *
 *  If this is called mutltiple times in succession, only the last item in the queue will be shown
 *  @param message - The message to display on the screen
 *  @param icon - The system icon to display along with the message
 */
export function showText(message: string, icon?: SystemIcon) {
    callDBus(
        "org.kde.plasmashell",
        "/org/kde/osdService",
        "org.kde.osdService",
        "showText",
        // "dialog-information",
        icon ?? "",
        message,
    )
}

//*
// Any system wide icons can be added to this list.
//
// The best way to find new icosn is to launch the systems icon picker dialog box.
// There are many ways to launch the icon picker, here is one of them:
//  1. Create a new folder on the desktop
//  2. Right click folder --> properties
//  3. Click on the folder icon (to change the folder icon)
//*
type SystemIcon =
    | "dialog-error"
    | "dialog-information"
    | "dialog-positive"
    | "dialog-warning"
    | "data-error"
    | "data-success"
    | "data-warning"
