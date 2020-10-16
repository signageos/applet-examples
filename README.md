# Example Applets for signageOS

This repository contains:

- Sample Applets code for every simple method documented in signageOS [Documentation](https://docs.signageos.io/api/js/content/js-api-introduction).

- Sample SMIL files for signageOS SMIL Player

- Benchmark test Applets for signageOS SoC and Media Player Benchmarking

**Note:**  
*Applets are written in es2017 JavaScript notation. It's supported language for every supported device.*

## List of available sample Applets:

- [Getting Started](https://github.com/signageos/applet-examples/tree/master/index.html) basic API usage
- [Restore](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/restore) display area (videos, streams etc.)

### Content-related examples
- [Browser](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/browser) on touch devices
- [Clock](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/clock)
- [Command](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/command)
- [Commands Sending](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/command/sending) for monitoring
- [Commands Receiving](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/command/receiving) for monitoring
- [CORS](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/cors)
- [File System API](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/file-system) for full featured FS manipulation
- [Fonts](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/fonts)
- [Hardware LED](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/hardware-led) for color control (some Philips)
- [HDMI and DisplayPort Streams](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/stream-hdmi-port)
- [Iframes](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/iframes) propagation of sos API
- [Iframes Nested](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/nested-iframes) propagation of sos API
- [Image and Video Thumbnail](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/image-video-thumbnail)
- [MD5 checksum](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/md5-checksum) for offline stored files
- [Network settings via DHCP](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/network-settings-dhcp)
- [Network settings via manual IP](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/network-settings-manual)
- [Offline Files](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/offline-files) for managing files
- [Offline Resources](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/offline-resources) for saving & using libraries
- [Offline ZIP Decompression](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/offline-zip-decompress) for unpacking `*.zip` files
- [Proximity Sensor](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/proximity)
- [Remote control key UP binding](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/remote-control) for bind pressing keys on remote control
- [Save and Load Large JSON file](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/save-and-load-large-json) from the internal memory
- [Sensors by Nexmosphere](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/sensors-nexmosphere) and how to use them in the JS
- [Serial Port](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/serial) management and operations
- [Streams](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/stream) like UDP, RT(S)P, HLT
- [Sync Mixed Content](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/sync-mixed-content) for playing a list of videos and images in sync on multiple devices
- [Timing Triggers](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/timing-triggers) pause & resume
- [Video & Images](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/video-and-images) loop together
- [Video, Images and HTML](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/video-and-images-and-html) loop together
- [Video file details](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/video-details) like resolution, framerate and codec
- [Video single file loop](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/video-loop-one) infinite loop
- [Video playback from internal memory](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/video-loop-offline) loop
- [Videos - multiple at once](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/video-multiple) at same time
- [Video Sync](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/sync-video) for playing a list of videos in sync on multiple devices
- [Videowall on 2 screens](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/videowall-2screens) for playing a videowall horizontally across 2 screens
- [Videowall on 4 screens](https://github.com/signageos/applet-examples/tree/master/examples/content-js-api/videowall-4screens) for playing a videowall across 4 screens

### Device management examples
- [App restart](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/app-restart)
- [App upgrade](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/app-upgrade) for updating Core App on device
- [Basic information](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/basics) like device model, serial number and temperature
- [Battery](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/battery)
- [Brightness](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/brightness)
- [Debug](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/debug) for enabling device debugger and console log access
- [Display On/Off](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/display)
- [Firmware upgrade](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/firmware)
- [JS Management Getters](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/js-management-getters) all in one
- [JS Management Setters](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/js-management-setters) all in one
- [Network Information](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/network)
- [Package Install](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/package-install) for Android and Linux packages
- [Remote Control IR Lock](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/remote)
- [Resize for changing display resolution and orientation](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/resize)
- [Screenshot upload](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/screenshot-upload) to remote server
- [Security PIN setup](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/security-pin-code)
- [System Reboot](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/system-reboot)
- [Time and timezone](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/time)
- [Timer](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/timer) for turning display On/Off based on time and day in a week 
- [Volume](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/volume) level settings
- [Wi-Fi Access Point](https://github.com/signageos/applet-examples/tree/master/examples/management-js-api/wifi-access-point) for setting up RPi via smartphone/PC
