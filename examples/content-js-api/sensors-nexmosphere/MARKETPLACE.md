# Nexmosphere Sensors

***Make your signage interactive — trigger content with presence, touch, and gestures via Nexmosphere hardware.***

Connect Nexmosphere sensor controllers to your signage displays and let content react to the physical world in real time. Detect when someone walks up, picks up a product, waves a hand, or scans an RFID tag — then instantly swap what is on screen. Static signage becomes a two-way experience.

The applet integrates with the signageOS Nexmosphere SDK, handling sensor communication and event routing so you can focus on the content, not the wiring.

## Highlights

- **Presence and motion detection** — trigger content when someone approaches
- **Touch and lift-and-learn** — swap screens based on physical product interactions
- **RFID tag scanning** — identify tagged objects and show relevant content
- **Real-time response** — content updates instantly on sensor input

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `buttonAddress` | number | `1` | Address of the Nexmosphere button sensor |
| `buttonIndex` | number | `0` | Index of the button within the sensor unit |
| `rfidAddress` | number | `1` | Address of the Nexmosphere RFID antenna |

## Use Cases

- Retail product displays with lift-and-learn experiences
- Interactive museum and exhibition installations
- Wayfinding kiosks that activate on approach
- Showroom displays responding to customer presence
- Trade show booths with gesture-driven content

## Getting Started

Install from the Marketplace, connect a Nexmosphere controller to your signage device, and assign the applet. Set sensor addresses in the configuration to match your hardware setup. The applet listens for sensor events and updates the display in real time.
