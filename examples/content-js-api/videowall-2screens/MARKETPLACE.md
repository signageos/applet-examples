# Video Wall (2 Screens)

***Synchronized two-screen video wall — one seamless canvas from two displays.***

Create a side-by-side video wall from two signageOS devices. Each screen plays its half of the content in frame-accurate lockstep, producing one wide-format display. Purpose-built for the most common two-screen setup with a simple left/right placement model.

## Highlights

- **Two-screen sync** — frame-accurate coordination between both devices
- **Left/right placement** — each screen knows which half it displays
- **Easy setup** — simpler configuration than the general-purpose video wall applet
- **Continuous loop** — synchronized content plays 24/7

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server |
| `sync_group` | string | — | Group identifier for this video wall pair |
| `placement` | string | — | Which half this screen displays: `left` or `right` |

## Use Cases

- Reception desks and welcome displays
- Retail window displays spanning two panels
- Conference room dual-screen setups
- Menu boards and pricing displays side by side

## Getting Started

Install on both devices. Set the same `sync_server` and `sync_group` on each, then assign `placement` to `left` on one screen and `right` on the other. The applet handles the rest.
