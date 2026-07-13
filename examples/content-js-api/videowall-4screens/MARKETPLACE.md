# Video Wall (4 Screens)

***Immersive 2x2 video wall — four screens, one seamless display.***

Build a 2x2 video wall from four signageOS devices. Each screen plays its assigned quadrant while the applet keeps all four in frame-accurate lockstep. Purpose-built for the classic four-screen grid with a simple quadrant selection model.

## Highlights

- **2x2 grid layout** — designed specifically for four-screen configurations
- **Frame-accurate sync** — all four quadrants stay perfectly aligned
- **Quadrant selection** — each screen picks its position in the grid
- **Continuous loop** — video wall content plays 24/7
- **On-screen diagnostics** — `debug` mode reveals a live log console and playback-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server |
| `sync_group` | string | — | Group identifier for this video wall group |
| `placement` | enum | `top_left` | Quadrant this screen displays: `top_left`, `top_right`, `bottom_left`, or `bottom_right` |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the playback-status readout and on-screen log console |

## Use Cases

- Retail flagship high-impact displays
- Corporate lobby centerpieces
- Event and exhibition feature walls
- Museum and gallery installations
- Airport and transit information displays

## Getting Started

Install on all four devices. Set the same `sync_server` and `sync_group` on each, then assign `placement` to the appropriate quadrant (`top_left`, `top_right`, `bottom_left`, `bottom_right`). The applet synchronizes playback automatically. Switch `mode` to `debug` when you need the playback-status readout and on-screen log console to troubleshoot sync or playback.

## Synchronization

> ⚠️ **A screen that starts after the others needs one loop to sync up.** Every device in a `sync_group` plays in lockstep by waiting for the rest of the group at each video boundary. Follower (“slave”) screens align to the lead (“master”) screen, so one that joins the wall late — newly assigned, rebooted, or simply slower to boot — can’t drop into the middle of a video without breaking alignment. Instead it holds at the shared sync point and waits for the master to come back around: it sits out the current round and begins playing in sync from the next video. Expect up to one full video loop of catch-up after powering on the wall or adding/restarting a screen.
