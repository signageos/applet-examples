# Synced Takeover Menuboard

***An HTML5 menuboard that all screens interrupt together, on schedule, with a synchronized full-screen takeover — then return to the menu as one.***

Run a live menuboard on every screen, and on a shared interval (default every 15&nbsp;s) the whole group flips to a full-screen "takeover" at the same moment, holds it, and returns to the menuboard together. Great for a group-wide "pop-up" moment across a bank of displays. The demo takeover is a synced number + colour so the synchronization is obvious; swap in your own content as needed.

## Highlights

- **Group-synchronized takeover** — every screen enters and leaves the takeover together via a sync barrier
- **Always-on menuboard** — a lightweight HTML5 menu (items + clock) runs continuously underneath
- **Obvious sync** — the takeover shows the same lock-step number + colour on every screen at once
- **Self-healing** — a transient network hiccup is retried, so one screen can never stall the group
- **Configurable timing** — set the menuboard interval and takeover duration

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_group` | string | *(default group)* | Group id — screens with the same id take over together |
| `sync_server` | url | *(signageOS default)* | Sync server URI; empty uses the default server |
| `sync_engine` | enum | `sync-server` | `sync-server` or `p2p-local` (LAN-only); all screens in a group must match |
| `interval_ms` | number | `15000` | Menuboard time between takeovers (ms) |
| `takeover_ms` | number | `6000` | Takeover duration (ms) |
| `menuboard_items` | string (JSON) | *(demo menu)* | `[{name, price}]` rows |
| `wait_timeout_ms` | number | `15000` | Barrier wait timeout (ms); on timeout the loop retries instead of stalling |

## Use Cases

- Cafe / QSR menuboards with a synchronized takeover across all screens
- Retail displays that periodically interrupt with a group-wide announcement
- Any menuboard bank that should show the same "pop-up" content at the same instant

## Getting Started

Install on each screen and set the **same `sync_group`** on all of them. Optionally provide your `menuboard_items` (or use the demo menu) and tune `interval_ms` / `takeover_ms`. Leave `sync_server`/`sync_engine` at defaults unless you run your own server or a LAN-only setup.

## How it works

The menuboard runs continuously; each screen times `interval_ms` locally, then all screens meet at a sync **barrier** (`sos.sync.wait`) and are released together — so the takeover appears on every screen at once. A second barrier ends the takeover in sync. Timing accuracy is bounded by the network fan-out from the sync server (sub-100&nbsp;ms), not by the devices' clocks; a late-joining screen falls into step at the next cycle.
