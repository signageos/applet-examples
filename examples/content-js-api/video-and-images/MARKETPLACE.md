# Video and Images

***Play a mixed-media slideshow of videos and images with smooth transitions on any display.***

Rotate through promotional videos, product images, and branded content in a single continuous playlist. The Video and Images applet handles format mixing, transition timing, and cross-platform playback differences — you just provide the media URLs and it runs 24/7 with professional-looking crossfades.

## Highlights

- **Mixed-media playlists** — combine videos and images in a single rotation
- **Smooth crossfades** — professional transitions between content items
- **Continuous looping** — runs around the clock without manual restarts
- **Universal compatibility** — consistent playback on all signageOS-supported devices

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `items` | string (JSON) | *(demo content)* | JSON array of content items, each with `uid` (unique identifier) and `uri` (media URL). Example: `[{"uid":"img1","uri":"https://example.com/photo.jpg"}]` |

## Use Cases

- Retail product showcases and promotional displays
- Lobby and reception welcome screens
- Waiting room entertainment rotations
- Restaurant and café digital menu boards
- Trade show and event booth displays

## Getting Started

Install from the Marketplace, assign to a device, and set `items` to a JSON array of your media URLs. The applet loops through your content with smooth transitions. Falls back to demo content if no items are configured.
