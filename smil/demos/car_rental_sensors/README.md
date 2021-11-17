# Car Rental Demo

## Featuring

- [signageOS SMIL Player](https://github.com/signageos/smil-player)
- Widgets with extra signageOS API
    - Printer
    - QR code reader
- Keyboard triggers
- Sensor triggers
    - gender sensor
    - RFID sensor

## Setup

Demo was tested on the following setup:
![Setup](setup.jpg)

### Kiosk

**Components:**  
Samsung KIOSK running [signageOS SMIL Player](https://github.com/signageos/smil-player) with attached:

- Printer
- QR Code Reader
- RFID Sensor (pickup/place, by [Nexmosphere](http://nexmosphere.com/))

Learn more about [Kiosk setup](kiosk/README.md).


### Display

**Components:**  
Samsung QMH running [signageOS SMIL Player](https://github.com/signageos/smil-player) with attached:

- RFID Sensor (pickup/place, by [Nexmosphere](http://nexmosphere.com/))
- Gender Sensor (by [Nexmosphere](http://nexmosphere.com/))
- connected via serial-HID cable

Learn more about [Display setup](display/README.md)
