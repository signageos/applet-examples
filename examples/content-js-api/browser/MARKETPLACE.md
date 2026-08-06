# Browser

***Embed any webpage directly on your signage display — dashboards, portals, live feeds, web apps.***

Turn any URL into full-screen signage content. The Browser applet opens a live webpage in the device's own browser window as soon as the applet starts, keeping the content interactive and auto-refreshing as the source updates. Domain access can be restricted and the address bar locked down, so the screen stays on the page you chose.

Works across all signageOS-supported devices with consistent rendering behavior regardless of the underlying hardware platform.

## Highlights

- **Opens automatically** — the page loads full-screen on startup, no interaction needed
- **Self-healing** — if the window is ever closed, the applet reopens it within seconds
- **Live and interactive** — the page stays active, auto-refreshing with source updates
- **Native browser engine** — uses the device's built-in browser for optimal performance
- **Locked down by default** — read-only address bar and domain access control
- **On-screen diagnostics** — `debug` mode reveals a live log console and browser-status readout for troubleshooting

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | url | `https://www.signageos.io` | Webpage to open full-screen on the device |
| `mode` | enum | `production` | Either `production` to show only the title and device-info header, or `debug` to also reveal the browser-status readout and on-screen log console |

## Use Cases

- KPI dashboards and real-time analytics (Grafana, Looker, Power BI)
- Internal company portals and intranet pages
- Social media walls and live feeds
- Third-party web applications and booking systems
- Web-based CMS-powered menu boards

## Device Support

The browser window is opened through the device's native browser. Full support — including the address bar and theming — is available on Android 5+ players. Samsung Tizen (SSSP 4+), LG webOS (3.0+), BrightSign and Linux players open the page full-screen in headless mode, without an address bar or theme options.

## Getting Started

Install from the Marketplace, assign to a device, and set `url` to the page you want to display. The applet opens it full-screen as soon as it starts — no interaction required — and keeps it there, reopening the window if it is ever closed.

Switch `mode` to `debug` when you need the browser-status readout and on-screen log console to troubleshoot.
