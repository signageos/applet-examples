# Synced Playlist

***Play a playlist of videos and images perfectly in sync across many screens — with minimal setup.***

Point any number of screens at the same group and they play the same playlist in lock-step: every screen switches to the next video or image at the same moment. Mixed video + image playlists are supported, media is cached offline for a smooth switch, and one screen is automatically elected to keep the rest aligned.

## Highlights

- **Group sync** — all screens sharing a group id switch together, coordinated by the sync server
- **Mixed media** — videos and images in one playlist (per-image duration, videos play to their end)
- **Offline-cached** — every item is cached before playback so the synchronized flip is not gated by a download
- **Minimal configuration** — one group id + the media list; sensible demo content out of the box
- **Automatic master election** — no manual leader setup

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_group` | string | *(default group)* | Group id — screens with the same id stay in sync |
| `sync_server` | url | *(signageOS default)* | Sync server URI; empty uses the default server |
| `sync_engine` | enum | `sync-server` | `sync-server` or `p2p-local` (LAN-only); all screens in a group must match |
| `items` | string (JSON) | *(demo playlist)* | `[{type:"video"\|"image", uid, uri, duration?}]` |
| `wait_timeout_ms` | number | `15000` | Barrier wait timeout in ms; on timeout the loop retries instead of stalling |

## Use Cases

- Multi-screen retail or lobby walls showing the same rotating content in unison
- Menuboards or promo loops across several displays that must never drift apart
- Any deployment where two or more screens should show identical content at the same instant

## Getting Started

Install on each screen, set the **same `sync_group`** on all of them, and provide your `items` playlist (or use the demo content to try it). Leave `sync_server`/`sync_engine` at their defaults unless you run your own server or a LAN-only setup. The applet joins the group, caches the media, and starts the synchronized loop automatically.

## How it works

On each item boundary the applet calls a sync **barrier** (`sos.sync.wait`): it blocks until every screen in the group has reached the boundary, then all screens are released together and receive the master's chosen item — so they switch as one. Synchronization accuracy is bounded by network round-trip to the sync server (great for coordinated switching; not intended for frame-accurate video-wall slicing — see the **Video Wall** example for that).
