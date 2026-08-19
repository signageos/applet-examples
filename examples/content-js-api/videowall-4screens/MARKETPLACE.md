# Video Wall (4 Screens)

***Immersive 2x2 video wall — four screens, one seamless display.***

Build a 2x2 video wall from four signageOS devices. Each screen plays its assigned quadrant while the applet keeps all four in frame-accurate lockstep. Purpose-built for the classic four-screen grid with a simple quadrant selection model.

## Highlights

- **2x2 grid layout** — designed specifically for four-screen configurations
- **Frame-accurate sync** — all four quadrants stay perfectly aligned
- **Instant realignment** — a screen joining or rebooting restarts all four quadrants in step, with no waiting out a loop
- **Quadrant selection** — each screen picks its position in the grid
- **Continuous loop** — video wall content plays 24/7
- **On-screen diagnostics** — `debug` mode reveals a live log console and playback-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server |
| `sync_group` | string | — | Group identifier for this video wall group |
| `items` | string (JSON) | *(required)* | JSON array of video objects (`{uid, uri}`) — this screen's pre-sliced segments. All four screens must list the same uids in the same order; only the `uri` differs per screen |
| `placement` | enum | `top_left` | Quadrant this screen displays: `top_left`, `top_right`, `bottom_left`, or `bottom_right`. Labels the screen in the log; the content comes from `items` |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the playback-status readout and on-screen log console |

## Use Cases

- Retail flagship high-impact displays
- Corporate lobby centerpieces
- Event and exhibition feature walls
- Museum and gallery installations
- Airport and transit information displays

## Getting Started

Install on all four devices. Set the same `sync_server` and `sync_group` on each, then assign `placement` to the appropriate quadrant (`top_left`, `top_right`, `bottom_left`, `bottom_right`). Give each screen its own `items` — the quadrant of the pre-sliced content it should play — using the **same uids in the same order on all four screens**, with only the `uri` differing per screen. That shared uid order is what the sync barriers key on; if the lists disagree, the screens will not stay in step. Switch `mode` to `debug` when you need the playback-status readout and on-screen log console to troubleshoot sync or playback.

## Synchronization

> ℹ️ **A screen joining the grid restarts all four.** Every device in a `sync_group` plays in lockstep by waiting for the rest of the group at each video boundary. When a screen joins — newly assigned, rebooted, or simply slower to boot — the lead (“master”) screen notices it join and restarts the grid from the first video so all four quadrants begin the same segment together, rather than the joining screen sitting out a loop. Each screen keeps showing its current segment until the whole grid is ready and then they all switch at once, so the grid never blanks while it waits for a slow device. Screens joining in quick succession — the whole grid powering on, for instance — each trigger a restart until the group settles.
