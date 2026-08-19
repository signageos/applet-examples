# Video Wall (2 Screens)

***Synchronized two-screen video wall — one seamless canvas from two displays.***

Create a side-by-side video wall from two signageOS devices. Each screen plays its half of the content in frame-accurate lockstep, producing one wide-format display. Purpose-built for the most common two-screen setup with a simple left/right placement model.

## Highlights

- **Two-screen sync** — frame-accurate coordination between both devices
- **Instant realignment** — a screen joining or rebooting restarts both halves in step, with no waiting out a loop
- **Left/right placement** — each screen knows which half it displays
- **Easy setup** — simpler configuration than the general-purpose video wall applet
- **Continuous loop** — synchronized content plays 24/7
- **On-screen diagnostics** — `debug` mode reveals a live log console and playback-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server |
| `sync_group` | string | — | Group identifier for this video wall pair |
| `items` | string (JSON) | *(required)* | JSON array of video objects (`{uid, uri}`) — this screen's pre-sliced segments. Both screens must list the same uids in the same order; only the `uri` differs per side |
| `placement` | enum | `left` | Which half this screen displays: `left` or `right`. Labels the screen in the log; the content comes from `items` |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the playback-status readout and on-screen log console |

## Use Cases

- Reception desks and welcome displays
- Retail window displays spanning two panels
- Conference room dual-screen setups
- Menu boards and pricing displays side by side

## Getting Started

Install on both devices. Set the same `sync_server` and `sync_group` on each, then assign `placement` to `left` on one screen and `right` on the other. Give each screen its own `items` — the half of the pre-sliced content it should play — using the **same uids in the same order on both screens**, with only the `uri` differing per side. That shared uid order is what the sync barriers key on; if the two lists disagree, the screens will not stay in step. Switch `mode` to `debug` when you need the playback-status readout and on-screen log console to troubleshoot sync or playback.

## Synchronization

> ℹ️ **A screen joining the pair restarts both.** Every device in a `sync_group` plays in lockstep by waiting for the rest of the group at each video boundary. When a screen joins — newly assigned, rebooted, or simply slower to boot — the lead (“master”) screen notices it join and restarts both devices from the first video so the two halves begin the same segment together, rather than the joining screen sitting out a loop. Each screen keeps showing its current segment until both are ready and then they switch at once, so the pair never blanks while it waits for a slow device.
