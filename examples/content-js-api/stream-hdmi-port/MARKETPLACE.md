# Stream Picture-in-Picture

***Show a live external video source — HDMI, DisplayPort, DVI, or PC/VGA — full-screen on your signage with native hardware playback.***

Route any physical video input straight to your displays and let the platform keep watching the port for you. Point the applet at the connector your set-top box, media player, or camera is plugged into, and its feed appears full-screen — no encoding, no streaming server, just the source itself rendered through native hardware decoding.

Built on `sos.stream`, the applet plays the selected input continuously and recovers on its own: unplug the source and it shows no-signal, replug it and playback resumes automatically.

## Highlights

- **Native hardware playback** — the raw input renders full-screen with no transcoding or streaming server
- **Any physical input** — pick from `HDMI 1`, `HDMI 2`, `HDMI 3`, `DisplayPort`, `DVI`, or `PC or VGA`
- **Self-healing playback** — recovers automatically when a disconnected source is plugged back in
- **On-screen diagnostics** — `debug` mode reveals a live log console and stream-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `videoInput` | enum | `HDMI 1` | Which physical input to display full-screen — one of `HDMI 1`, `HDMI 2`, `HDMI 3`, `DisplayPort`, `DVI`, or `PC or VGA` |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the stream-status readout and on-screen log console |

## Use Cases

- Routing a set-top box or cable receiver through your signage display
- Displaying a live camera or CCTV feed on screen
- Passing through a media player, console, or Blu-ray source
- Mirroring a connected PC or laptop over `DisplayPort` or `PC or VGA`
- Showing control-room, broadcast, or medical equipment output on a shared screen

## Getting Started

Install from the Marketplace, assign the applet to a device, and set `videoInput` to the physical port your source is plugged into. Deploy and the selected input plays full-screen immediately, resuming on its own if the source is ever unplugged. Switch `mode` to `debug` when you need the stream-status readout and on-screen log console to troubleshoot a connection.
