# Video Wall

***Span one video across multiple synchronized screens for a seamless large-format display.***

Turn a grid of individual signage devices into one cohesive video wall. Each screen plays its assigned slice of the content while the applet keeps all devices in frame-accurate sync via a shared synchronization server. The result: one massive, seamless display from any number of independent screens.

Supports any grid arrangement — 2x1, 3x1, 2x2, 3x3, or custom layouts.

## Highlights

- **Frame-accurate sync** — all screens stay perfectly aligned via sync server
- **Instant realignment** — a screen joining or rebooting restarts the whole wall in step, with no waiting out a loop
- **Flexible grid** — supports any screen count and arrangement
- **Configurable content** — provide your own video segments per screen
- **Continuous loop** — video wall content plays 24/7
- **On-screen diagnostics** — `debug` mode reveals a live log console and playback-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server coordinating playback |
| `sync_group` | string | — | Group identifier so screens in the same wall stay in sync |
| `items` | string (JSON) | *(required)* | JSON array of video objects (`{uid, uri}`) to play on this screen. Every screen in the sync group must use the same uids in the same order — only the `uri` differs per screen |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the playback-status readout and on-screen log console |

## Use Cases

- Retail flagship window displays
- Corporate lobby statement pieces
- Event stages and conference backdrops
- Control rooms and operations centers
- Airport and transit information walls

## Getting Started

Install on each device in your wall. Set the same `sync_server` and `sync_group` on all devices, then assign each screen its `items` — the pre-sliced video segments for that position. The applet handles synchronization automatically. Switch `mode` to `debug` when you need the playback-status readout and on-screen log console to troubleshoot sync or playback.

## Synchronization

> ℹ️ **A screen joining the wall restarts the whole group.** Every device in a `sync_group` plays in lockstep by waiting for the rest of the group at each video boundary. When a screen joins — newly assigned, rebooted, or simply slower to boot — the lead (“master”) screen notices it join and restarts the wall from the first video so every screen begins the same segment together, rather than the joining screen sitting out a loop. Each screen keeps showing its current segment until the whole group is ready and then they all switch at once, so the wall never blanks while it waits for a slow device. Screens joining in quick succession — a whole wall powering on, for instance — each trigger a restart until the group settles.
