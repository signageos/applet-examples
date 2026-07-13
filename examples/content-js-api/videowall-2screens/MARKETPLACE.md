# Video Wall (2 Screens)

***Synchronized two-screen video wall — one seamless canvas from two displays.***

Create a side-by-side video wall from two signageOS devices. Each screen plays its half of the content in frame-accurate lockstep, producing one wide-format display. Purpose-built for the most common two-screen setup with a simple left/right placement model.

## Highlights

- **Two-screen sync** — frame-accurate coordination between both devices
- **Left/right placement** — each screen knows which half it displays
- **Easy setup** — simpler configuration than the general-purpose video wall applet
- **Continuous loop** — synchronized content plays 24/7
- **On-screen diagnostics** — `debug` mode reveals a live log console and playback-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_server` | string | — | URI of the synchronization server |
| `sync_group` | string | — | Group identifier for this video wall pair |
| `placement` | enum | `left` | Which half this screen displays: `left` or `right` |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the playback-status readout and on-screen log console |

## Use Cases

- Reception desks and welcome displays
- Retail window displays spanning two panels
- Conference room dual-screen setups
- Menu boards and pricing displays side by side

## Getting Started

Install on both devices. Set the same `sync_server` and `sync_group` on each, then assign `placement` to `left` on one screen and `right` on the other. The applet handles the rest. Switch `mode` to `debug` when you need the playback-status readout and on-screen log console to troubleshoot sync or playback.

## Synchronization

> ⚠️ **A screen that starts after the others needs one loop to sync up.** Every device in a `sync_group` plays in lockstep by waiting for the rest of the group at each video boundary. Follower (“slave”) screens align to the lead (“master”) screen, so one that joins the wall late — newly assigned, rebooted, or simply slower to boot — can’t drop into the middle of a video without breaking alignment. Instead it holds at the shared sync point and waits for the master to come back around: it sits out the current round and begins playing in sync from the next video. Expect up to one full video loop of catch-up after powering on the wall or adding/restarting a screen.
