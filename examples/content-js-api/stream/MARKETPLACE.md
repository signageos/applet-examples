# Stream

***Play live video streams — HTTP (HLS/DASH), UDP, RTP, or RTSP — on your signage displays with native hardware decoding.***

Display live content — IPTV channels, camera feeds, event broadcasts — directly on signage hardware. The Stream applet handles adaptive bitrate streaming, buffering, and cross-platform protocol differences behind the scenes, delivering smooth low-latency playback with the device's native video decoder.

Supports HTTP-based streaming (HLS, DASH), UDP and RTP transport streams, and RTSP for direct camera and encoder feeds.

> ℹ️ Tizen devices requires different Core App version for streaming. Core App versions which supports stream are in Box marked as `x.x.x-streams.yyyy`, for example: `2.12.0-streams.5944`.

## Highlights

- **Multi-protocol support** — HTTP (HLS/DASH), UDP, RTP, and RTSP out of the box
- **Hardware-accelerated** — native video decoding for smooth, low-latency playback
- **Adaptive bitrate** — automatically adjusts quality based on available bandwidth
- **Full-screen rendering** — stream fills the entire display
- **On-screen diagnostics** — `debug` mode reveals a live log console and stream-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `uri` | string | *(demo stream)* | URL or listen address of the stream to play — e.g. an HLS/DASH URL, or a `udp://`/`rtp://` address |
| `protocolType` | enum | `HTTP` | Streaming protocol — one of `HTTP`, `HLS`, `UDP`, `RTP`, or `RTSP` |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the stream-status readout and on-screen log console |

## Use Cases

- Live TV and IPTV channel displays
- Security camera monitoring walls
- Live event and conference streaming
- Corporate town hall broadcasts
- Sports bars and hospitality venues

## Getting Started

Install from the Marketplace, assign to a device, and set the `uri` to your stream. Choose the `protocolType` that matches your source — `HTTP` for HLS/DASH URLs, `HLS` for an HLS playlist, `UDP` or `RTP` for MPEG-TS transport streams, or `RTSP` for camera/encoder feeds. Playback starts immediately. Switch `mode` to `debug` when you need the stream-status readout and on-screen log console to troubleshoot a stream.
