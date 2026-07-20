# Sync Demo

***A minimal visualiser that makes multi-screen synchronization obvious at a glance.***

Every screen in the same group advances a shared counter in lock-step: on each tick a narrow top band and the big number flip to the same colour, on every screen, at the same moment. The background stays dark-gray so it's comfortable to watch, and a wall-clock line shows each device's own time (handy for spotting clock differences).

## Highlights

- **Obvious sync** — the same number + colour appear on every screen at once
- **Easy on the eyes** — dark-gray background; only a top band and the number change colour
- **Master / peers readout** — shows which screen is the auto-elected master and the peer count
- **Self-healing** — a transient network hiccup is retried, so one screen can never stall the group

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sync_group` | string | *(default group)* | Group id — screens with the same id tick together |
| `sync_server` | string | *(signageOS default)* | Sync server URI; empty uses the default server |
| `sync_engine` | string | `sync-server` | `sync-server` or `p2p-local` (LAN-only); all screens in a group must match |
| `tick_ms` | string | `1000` | Dwell time on each step (ms) |
| `wait_timeout_ms` | string | `15000` | Barrier wait timeout (ms); on timeout the tick retries instead of stalling |

## Getting Started

Install on two or more screens and set the **same `sync_group`** on all of them. Leave `sync_server`/`sync_engine` at their defaults unless you run your own server or a LAN-only setup. The screens join the group and start ticking in lock-step automatically.

## How it works

On each tick every screen blocks at a sync **barrier** (`sos.sync.wait`); the server releases all peers together and returns the master's step number, and each screen flips immediately on release. Timing accuracy is bounded by the network fan-out from the sync server (sub-100&nbsp;ms), not by the devices' clocks — so it stays tight even when device clocks are not perfectly aligned.
