# Video Wall

***Span one video across multiple synchronized screens for a seamless large-format display.***

Turn a grid of individual signage devices into one cohesive video wall. Each screen plays its assigned slice of the content while the applet keeps all devices in frame-accurate sync via a shared synchronization server. The result: one massive, seamless display from any number of independent screens.

Supports any grid arrangement — 2x1, 3x1, 2x2, 3x3, or custom layouts.

## Highlights

- **Frame-accurate sync** — all screens stay perfectly aligned via sync server
- **Flexible grid** — supports any screen count and arrangement
- **Configurable content** — provide your own video segments per screen
- **Continuous loop** — video wall content plays 24/7
- **On-screen diagnostics** — `debug` mode reveals a live log console and playback-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server coordinating playback |
| `sync_group` | string | — | Group identifier so screens in the same wall stay in sync |
| `items` | string (JSON) | *(demo videos)* | JSON array of video objects (`{uid, uri}`) to play on this screen |
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

> ⚠️ **A screen that starts after the others needs one loop to sync up.** Every device in a `sync_group` plays in lockstep by waiting for the rest of the group at each video boundary. Follower (“slave”) screens align to the lead (“master”) screen, so one that joins the wall late — newly assigned, rebooted, or simply slower to boot — can’t drop into the middle of a video without breaking alignment. Instead it holds at the shared sync point and waits for the master to come back around: it sits out the current round and begins playing in sync from the next video. Expect up to one full video loop of catch-up after powering on the wall or adding/restarting a screen.
