# Car Rental Demo - Kiosk part

**Components:**  
Samsung KIOSK running [signageOS SMIL Player](https://github.com/signageos/smil-player) with attached:

- Printer
- QR Code Reader
- RFID Sensor (pickup/place, by [Nexmosphere](http://nexmosphere.com/))


## signageOS SMIL Player Playlist

signageOS SMIL Player drives the Kiosk experience. Defined [SMIL Playlist](kiosk-smil.smil) features 2 widgets and an RFID trigger.

### Triggers and Sensors

Trigger and sensor definition is straightforward, requiring no programming. It's defined as below:

``` xml
<!-- SENSOR definition in the SMIL file -->
<sensors>
    <!-- keys drop off RFID sensor -->
    <sensor type="rfid" id="rfid1" driver="nexmosphere">
        <option name="address">007</option>
    </sensor>
</sensors>

<!-- TRIGGER definition in the SMIL file -->
<triggers>
    <!-- keys drop off RFID trigger-->
    <trigger id="trigger1" condition="or">
        <!-- data="1" means keys to car 1 -->
        <condition origin="rfid1" data="1" action="placed"/>
    </trigger>
</triggers>
```

You can learn more about triggers and sensors in the [signageOS SMIL Player documentation](https://docs.signageos.io/category/smil-guides/smil-guides/smil-docs-guides)

### Widgets

Widgets are zipped HTML5 applications. In this example we have 2 widgets:

- car-check-in-widget
- car-check-out-widget

Widgets are also defined in the kiosk-smil.smil playlist:

``` xml
<!-- Default widget car-check-in-widget -->
<par>
    <seq repeatCount="indefinite">
        <ref src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/kiosk/car-check-in-widget.zip" 
            type="application/widget" dur="indefinite" region="main"/>
    </seq>
</par>

<!-- Triggered widget car-check-out-widget -->
<par>
    <!-- 
        Widget is triggered if trigger1 is `true`.
        In this sample when RFID sensor detects RFID token being placed on the RFID antenna.
    -->
    <seq begin="trigger1" repeatCount="1" >
        <ref src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/kiosk/car-check-out-widget.zip" 
            type="application/widget" dur="indefinite" region="main"/>
    </seq>
</par>
```

## Widgets and the use of signageOS

You can use [signageOS JS API](https://developers.signageos.io/sdk) in your widgets. It allows you to access many of great APIs including accelerated video playback, filesystem and peripherals.

In order to use signageOS JS API you need to include the latest `sos.bundle.js` into your widget. You can get it here: [https://2.signageos.io/lib/front-applet/~LATEST-VERSION~/bundle.js](https://2.signageos.io/lib/front-applet/4.12.0/bundle.js) or by `npm install @signageos/front-applet`.

### Car Check In Widget

In this widget we used QR code reader and Printer as peripherals. Using them is as simple as calling these few lines of code:

**QR/Barcode scanner:**  
[link to source](car-check-in-widget/src/barcodeScanner.js)

``` js
async function startScanning() {
    try {
        const { stop, onData, onError } = await sos.hardware.barcodeScanner.start({
            timeout: 15000, //miliseconds
            cancelPrevious: true,
        });

        const data = await new Promise(rs => {
            onData(data => {
                afterBarCodeData(data);
                rs(data);
            });
            onError(error => {
                rs();
            });
        });
    } catch (e) {
        console.log(e);
    }
}
```

**Printer:**  
[link to source](car-check-in-widget/src/printer.js)

``` js
const serialPort = await sos.hardware.openSerialPort({ device: 'PORT1', baudRate: 9600 });
await serialPort.write(stringToHex(receipt));
await serialPort.close();
```

### Car Check Out Widget

In this widget we use direct serial communication to automatically turn on LED lights and set them to RED.

**Using serial port:**  
[link to source](car-check-out-widget/src/ledlights.js)

``` js
async function lightUpLED() {
	try {
		let serialPortLED = await sos.hardware.openSerialPort({ device: 'PORT2', baudRate: 115200 });
		await serialPortLED.write('58303036425b3235303130355d0D0A');
		await serialPortLED.close();
	} catch (e) {
		console.log(e);
	}
}
```