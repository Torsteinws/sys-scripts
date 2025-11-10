# Summary

Essential Linux scripts for my workflow.

# Setup

## toggle-desktop-panel

```bash
 ln --symbolic --force "$(pwd)/plasmaShell/toggleDesktopPanelVisibility/run.sh" "$HOME/bin/toggle-desktop-panel.sh"
```

- Requires qdbus (which is included in qt)
