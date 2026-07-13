# Video and Images

***Play a mixed-media slideshow of videos and images with smooth transitions on any display.***

Rotate through promotional videos, product images, and branded content in a single continuous playlist. The Video and Images applet handles format mixing, transition timing, and cross-platform playback differences — you just provide the media URLs and it runs 24/7 with professional-looking crossfades.

## Highlights

- **Mixed-media playlists** — combine videos and images in a single rotation
- **Smooth crossfades** — professional transitions between content items
- **Continuous looping** — runs around the clock without manual restarts
- **Universal compatibility** — consistent playback on all signageOS-supported devices
- **On-screen diagnostics** — `debug` mode shows a live log console, playback status, and device info during startup and whenever an error occurs, playing full-screen the rest of the time

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `items` | string (JSON) | *(demo content)* | JSON array of content items, each with `uid` (unique identifier) and `uri` (media URL). Video vs. image is detected from the file extension (e.g. `.mp4` → video, `.png` → image). Must be valid JSON — double-quoted keys and values. Example: `[{"uid":"clip.mp4","uri":"https://example.com/clip.mp4"}]` |
| `mode` | enum | `production` | Either `production` to always play full-screen, or `debug` to show a diagnostic dashboard (device info, playback status, live log console) during startup and on errors, playing full-screen otherwise |

## Use Cases

- Retail product showcases and promotional displays
- Lobby and reception welcome screens
- Waiting room entertainment rotations
- Restaurant and café digital menu boards
- Trade show and event booth displays

## Getting Started

Install from the Marketplace, assign to a device, and set `items` to a JSON array of your media URLs. The applet loops through your content with smooth transitions. Falls back to demo content if no items are configured. Switch `mode` to `debug` to see the diagnostic dashboard during startup and whenever a playback error occurs — it plays full-screen the rest of the time, just like production.
