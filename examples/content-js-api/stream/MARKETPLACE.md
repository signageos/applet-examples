# Stream

***Play live HLS, DASH, or RTSP video streams on your signage displays with native hardware decoding.***

Display live content — IPTV channels, camera feeds, event broadcasts — directly on signage hardware. The Stream applet handles adaptive bitrate streaming, buffering, and cross-platform protocol differences behind the scenes, delivering smooth low-latency playback with the device's native video decoder.

Supports HTTP-based streaming (HLS, DASH) and RTSP for direct camera and encoder feeds.

## Highlights

- **Multi-protocol support** — HLS, DASH, and RTSP streaming out of the box
- **Hardware-accelerated** — native video decoding for smooth, low-latency playback
- **Adaptive bitrate** — automatically adjusts quality based on available bandwidth
- **Full-screen rendering** — stream fills the entire display

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `uri` | string | *(demo stream)* | URL of the stream to play (HLS, DASH, or RTSP) |
| `protocolType` | string | `HTTP` | Streaming protocol: `HTTP` or `RTSP` |

## Use Cases

- Live TV and IPTV channel displays
- Security camera monitoring walls
- Live event and conference streaming
- Corporate town hall broadcasts
- Sports bars and hospitality venues

## Getting Started

Install from the Marketplace, assign to a device, and set the `uri` to your stream URL. Select `HTTP` for HLS/DASH streams or `RTSP` for direct camera feeds. Playback starts immediately.
