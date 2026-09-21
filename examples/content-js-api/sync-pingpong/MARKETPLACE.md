# Sync Ping-Pong

***A ball bounces across a whole row of screens as one continuous field - a lively way to show multi-screen synchronization.***

Line several screens up side by side and a single ball travels across the full width and back, bouncing as it goes, crossing seamlessly from one TV to the next. Every screen computes the ball position from the same shared clock, so the ball stays continuous across the seams. White shaded ball on a dark-green "table".

## Highlights

- **One field across many screens** — the ball crosses seams as if the screens were a single display
- **Ordered by config** — each screen's place in the row is set with `screen_index` / `screen_count`
- **Drift-proof timing** — a sync barrier gives all screens a shared start; each then animates on its own monotonic frame clock and re-syncs every cycle (device wall clocks are not used)
- **Self-healing** — a transient network hiccup is retried, so one screen can never stall the group

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `screen_index` | number | `0` | 0-based position of this screen in the row (0 = leftmost); set a different value per screen |
| `screen_count` | number | `1` | Total number of screens in the row; same on every screen |
| `cycle_ms` | number | `10000` | Time for one full round trip across the field and back (ms) |
| `hop_count` | number | `10` | Number of bounces during one cycle (whole number) |
| `sync_group` | string | *(default group)* | Group id — screens with the same id animate together |
| `sync_server` | url | *(signageOS default)* | Sync server URI; empty uses the default server |
| `sync_engine` | enum | `sync-server` | `sync-server` or `p2p-local` (LAN-only); all screens in a group must match |
| `wait_timeout_ms` | number | `15000` | Barrier wait timeout (ms); on timeout the loop retries instead of stalling |

## Getting Started

Install on every screen in the row and set the **same `sync_group`** and **same `screen_count`** on all of them. Set **`screen_index`** to each screen's left-to-right position (`0`, `1`, `2`, ...). Assumes all screens share the same resolution and are mounted edge to edge. Leave `sync_server`/`sync_engine` at their defaults unless you run your own server or a LAN-only setup.

## How it works

The full field is `screen_count` screens wide. On each cycle every screen meets at a sync **barrier** (`sos.sync.wait`) so they all start together, then each animates the ball with its own `requestAnimationFrame` clock and draws only the slice that falls on its screen. Because the barrier re-aligns them every cycle and the frame clock does not drift over a few seconds, the ball stays continuous across the seams. Timing alignment is bounded by the network fan-out from the sync server (sub-100&nbsp;ms), not by the devices' clocks.
