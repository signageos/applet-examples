# Synced Takeover Menuboard

***An HTML5 menuboard that all screens interrupt together, on schedule, with a synchronized full-screen promo — then return to the menu as one.***

Run a live menuboard on every screen, and on a shared interval (default every 30&nbsp;s) the whole group flips to a full-screen "takeover" (a promo video or image) at the same moment, plays it, and returns to the menuboard together. Great for a group-wide "pop-up ad" moment across a bank of displays.

## Highlights

- **Group-synchronized takeover** — every screen enters and leaves the takeover together via a sync barrier
- **Always-on menuboard** — a lightweight HTML5 menu (items + clock) runs continuously underneath
- **Rotating promos** — cycles through your takeover assets (video or image), the same one on every screen each round
- **Offline-cached** — takeover assets are cached up front so the flip is instant
- **Configurable timing** — set the menuboard interval and takeover duration

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_group` | string | *(default group)* | Group id — screens with the same id take over together |
| `sync_server` | string | *(signageOS default)* | Sync server URI; empty uses the default server |
| `sync_engine` | string | `sync-server` | `sync-server` or `p2p-local` (LAN-only); all screens in a group must match |
| `interval_ms` | string | `30000` | Menuboard time between takeovers (ms) |
| `takeover_ms` | string | `10000` | Image takeover duration (ms); videos play to their end |
| `menuboard_items` | string (JSON) | *(demo menu)* | `[{name, price}]` rows |
| `takeover_assets` | string (JSON) | *(demo assets)* | `[{type:"video"\|"image", uid, uri}]` rotated each cycle |

## Use Cases

- Cafe / QSR menuboards with a synchronized promo across all screens
- Retail displays that periodically interrupt with a group-wide announcement
- Any menuboard bank that should show the same "pop-up" content at the same instant

## Getting Started

Install on each screen and set the **same `sync_group`** on all of them. Provide your `menuboard_items` and `takeover_assets` (or use the demo content). Tune `interval_ms` / `takeover_ms` to taste. Leave `sync_server`/`sync_engine` at defaults unless you run your own server or a LAN-only setup.

## How it works

The menuboard runs continuously; each screen times `interval_ms` locally, then all screens meet at a sync **barrier** (`sos.sync.wait`) and are released together with the master's chosen promo — so the takeover appears on every screen at once. A second barrier ends the takeover in sync. Alignment is re-established at each barrier (accuracy bounded by network round-trip to the sync server); a late-joining screen falls into step at the next cycle.
