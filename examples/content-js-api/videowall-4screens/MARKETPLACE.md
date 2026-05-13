# Video Wall (4 Screens)

***Immersive 2x2 video wall — four screens, one seamless display.***

Build a 2x2 video wall from four signageOS devices. Each screen plays its assigned quadrant while the applet keeps all four in frame-accurate lockstep. Purpose-built for the classic four-screen grid with a simple quadrant selection model.

## Highlights

- **2x2 grid layout** — designed specifically for four-screen configurations
- **Frame-accurate sync** — all four quadrants stay perfectly aligned
- **Quadrant selection** — each screen picks its position in the grid
- **Continuous loop** — video wall content plays 24/7

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server |
| `sync_group` | string | — | Group identifier for this video wall group |
| `mode` | string | `top_left` | Quadrant this screen displays: `top_left`, `top_right`, `bottom_left`, or `bottom_right` |

## Use Cases

- Retail flagship high-impact displays
- Corporate lobby centerpieces
- Event and exhibition feature walls
- Museum and gallery installations
- Airport and transit information displays

## Getting Started

Install on all four devices. Set the same `sync_server` and `sync_group` on each, then assign `mode` to the appropriate quadrant (`top_left`, `top_right`, `bottom_left`, `bottom_right`). The applet synchronizes playback automatically.
