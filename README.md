# Example Applets for signageOS

This repository contains:

- Sample Applets code for every simple method documented in our [documentation](https://docs.signageos.io/api/js/content/js-api-introduction).

- Sample SMIL files for signageOS SMIL Player

- Benchmark test Applets for signageOS SoC and Media Player Benchmarking

**Note:**  
*Applets are written in es2017 JavaScript notation. It's supported language for every supported device.*

## List of available sample Applets:

- [Getting Started](/index.html) basic API usage
- [Restore](/examples/content-js-api/restore) display area (videos, streams etc.)

### Content-related examples
- [Browser](/examples/content-js-api/browser) on touch devices
- [Clock](/examples/content-js-api/clock)
- [Command](/examples/content-js-api/command)
- [Commands Sending](/examples/content-js-api/command/sending) for monitoring
- [Commands Receiving](/examples/content-js-api/command/receiving) for monitoring
- [CORS](/examples/content-js-api/cors)
- [File System API](/examples/content-js-api/file-system) for full featured FS manipulation
- [Fonts](/examples/content-js-api/fonts)
- [Hardware LED](/examples/content-js-api/hardware-led) for color control (some Philips)
- [HDMI and DisplayPort Streams](/examples/content-js-api/stream-hdmi-port)
- [Iframes](/examples/content-js-api/iframes) propagation of sos API
- [Iframes Nested](/examples/content-js-api/nested-iframes) propagation of sos API
- [Image and Video Thumbnail](/examples/content-js-api/image-video-thumbnail)
- [MD5 checksum](/examples/content-js-api/md5-checksum) for offline stored files
- [Network settings via DHCP](/examples/content-js-api/network-settings-dhcp)
- [Network settings via manual IP](/examples/content-js-api/network-settings-manual)
- [Offline Files](/examples/content-js-api/offline-files) for managing files
- [Offline Resources](/examples/content-js-api/offline-resources) for saving & using libraries
- [Offline ZIP Decompression](/examples/content-js-api/offline-zip-decompression) for unpacking `*.zip` files
- [Proximity Sensor](/examples/content-js-api/proximity)
- [Remote control key UP binding](/examples/content-js-api/remote-control) for bind pressing keys on remote control
- [Save and Load Large JSON file](/examples/content-js-api/save-and-load-large-json) from the internal memory
- [Sensors by Nexmosphere](/examples/content-js-api/sensors-nexmosphere) and how to use them in the JS
- [Serial Port](/examples/content-js-api/serial) management and operations
- [Streams](/examples/content-js-api/stream) like UDP, RT(S)P, HLT
- [Sync Mixed Content](/examples/content-js-api/sync-mixed-content) for playing a list of videos and images in sync on multiple devices
- [Timing Triggers](/examples/content-js-api/timing-triggers) pause & resume
- [Video & Images](/examples/content-js-api/video-and-images) loop together
- [Video, Images and HTML](/examples/content-js-api/video-and-images-and-html) loop together
- [Video file details](/examples/content-js-api/video-details) like resolution, framerate and codec
- [Video single file loop](/examples/content-js-api/video-loop-one) infinite loop
- [Video playback from internal memory](/examples/content-js-api/video-loop-offline) loop
- [Videos - multiple at once](/examples/content-js-api/video-multiple) at same time
- [Video Sync](/examples/content-js-api/sync-video) for playing a list of videos in sync on multiple devices
- [Videowall on 2 screens](/examples/content-js-api/videowall-2screens) for playing a videowall horizontally across 2 screens
- [Videowall on 4 screens](/examples/content-js-api/videowall-4screens) for playing a videowall across 4 screens

### Device management examples
- [App restart](/examples/management-js-api/app-restart)
- [App upgrade](/examples/management-js-api/app-upgrade) for updating Core App on device
- [Basic information](/examples/management-js-api/basics) like device model, serial number and temperature
- [Battery](/examples/management-js-api/battery)
- [Brightness](/examples/management-js-api/brightness)
- [Debug](/examples/management-js-api/debug) for enabling device debugger and console log access
- [Display On/Off](/examples/management-js-api/display)
- [Firmware upgrade](/examples/management-js-api/firmware)
- [JS Management Getters](/examples/management-js-api/js-management-getters) all in one
- [JS Management Setters](/examples/management-js-api/js-management-setters) all in one
- [Network Information](/examples/management-js-api/network)
- [Package Install](/examples/management-js-api/package-install) for Android and Linux packages
- [Remote Control IR Lock](/examples/management-js-api/remote)
- [Reszte for change display resolution and orientation](/examples/management-js-api/resize)
- [Screenshot upload](/examples/management-js-api/screenshot-upload) to remote server
- [Security PIN setup](/examples/management-js-api/security-pin-code)
- [System Reboot](/examples/management-js-api/system-reboot)
- [Time and timezone](/examples/management-js-api/time)
- [Timer](/examples/management-js-api/timer) for turning display On/Off based on time and day in a week 
- [Volume](/examples/management-js-api/volume) level settings
- [Wi-Fi Access Point](/examples/management-js-api/wifi-access-point) for setting up RPi via smartphone/PC
