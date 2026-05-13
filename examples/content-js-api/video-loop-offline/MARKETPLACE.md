# Video Offline Playback Playlist

***Cache a playlist of videos on the device and loop them gaplessly — no internet required during playback.***

Upload your video URLs, and the applet downloads everything to device storage before playback begins. Once cached, videos play in a seamless gapless loop entirely from local storage. The next video pre-buffers while the current one plays, so there is never a loading spinner or gap between clips — even with zero network connectivity.

## Highlights

- **Configurable playlist** — provide your own video URLs, comma-separated
- **On-device caching** — all videos download before playback starts
- **Gapless transitions** — next video pre-buffers for seamless switching
- **Fully offline** — once cached, no network connectivity needed

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `items` | string | *(demo videos)* | Comma-separated list of video URLs to play. Example: `https://example.com/video1.mp4, https://example.com/video2.mp4` |

## Use Cases

- Retail promotional video loops in areas with unreliable WiFi
- Lobby and waiting area displays that must run without interruption
- Outdoor signage with limited or intermittent connectivity
- Any deployment requiring guaranteed 24/7 video playback

## Getting Started

Install from the Marketplace, assign to a device, and set `items` to a comma-separated list of video URLs. The applet downloads all videos to local storage, then starts looping. Falls back to built-in demo videos if no URLs are provided.
