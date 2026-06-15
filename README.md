# Summary

Essential Linux scripts for my workflow.

# Setup

## toggle-desktop-panel

```bash
 ln --symbolic --force "$(pwd)/plasmaShell/toggleDesktopPanelVisibility/run.sh" "$HOME/bin/toggle-desktop-panel.sh"
```

- Requires qdbus (which is included in qt)

## toggle-bluetooth-connection

```bash
ln --symbolic --force "$(pwd)/shell/actions/toggle-bluetooth-connection.sh" "$HOME/bin/toggle-bluetooth-connection.sh"
```

## ttiler

**Requires:**

- [task](https://taskfile.dev/)
- [node](https://nodejs.org/en)

```bash
cd kWin/ttiler
task install
```

## on login scripts

Add every file in `shell/onLogin` to autostart in KDE system settings
