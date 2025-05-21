
// Returns the first panel that has the system tray widget. 
// Returns null if not found
function findSysTrayPanel() {
    
    // Iterate over all panels
    const allPanels = panels()
    for (let i = 0; i < allPanels.length; i++) {
        const panel = allPanels[i]
    
        // Iterate over all widgets
        const widgets = panel.widgets()
        for (let j = 0; j < widgets.length; j++) {
            const widget = widgets[j]
            
            if(widget.type === "org.kde.plasma.systemtray") {
                return panel
            }
        }
    }

    return null
}

// Toggles the visibility state of the given plasma panel
function togglePanelVisibility(panel) {
    const newValue = panel.hiding === "none" || panel.hiding === "windowsgobelow" 
        ? "dodgewindows"
        : panel.lengthMode === "fill" 
            ? "none"
            : "windowsgobelow" 

    print("Changed panel.hiding:    " + panel.hiding + " -> " + newValue)
    panel.hiding = newValue
}

// Script entry point
function main() {
    const panel = findSysTrayPanel()
    if(panel) {
        togglePanelVisibility(panel)
    }
}

main()
