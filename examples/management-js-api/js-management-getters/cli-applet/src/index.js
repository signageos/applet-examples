
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = "Display version: " + sos.display.version + "<br>";

	try {
		const model = await sos.management.getModel();
		contentElement.innerHTML += "Model: " + model + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Model: NOT WORKING <br>";
	}

	try {
		const serialNumber = await sos.management.getSerialNumber();
		contentElement.innerHTML += "Serial Number: " + serialNumber + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Serial Number: NOT WORKING <br>";
	}

	try {
		const networkInfo = await sos.management.getNetworkInfo();
		contentElement.innerHTML += "Network Info: " + JSON.stringify(networkInfo) + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Network Info: NOT WORKING <br>";
	}

	try {
		const batteryStatus = await sos.management.getBatteryStatus();
		contentElement.innerHTML += "Battery: " + JSON.stringify(batteryStatus) + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Battery: NOT WORKING <br>";
	}

	try {
		const temperature = await sos.management.getTemperature();
		contentElement.innerHTML += "Temperature: " + temperature + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Temperature: NOT WORKING <br>";
	}

	try {
		const appType = await sos.management.app.getType();
		contentElement.innerHTML += "App Type: " + appType + "<br>";
	} catch (e) {
		contentElement.innerHTML += "App Type: NOT WORKING <br>";
	}

	try {
		const fw = await sos.management.firmware.getVersion();
		contentElement.innerHTML += "FW: " + fw + "<br>";
	} catch (e) {
		contentElement.innerHTML += "FW: NOT WORKING <br>";
	}

	try {
		const remoteControl = await sos.management.remoteControl.isEnabled();
		contentElement.innerHTML += "Remote Control Lock: " + remoteControl + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Remote Control Lock: NOT WORKING <br>";
	}

	try {
		const brightness = await sos.management.screen.getBrightness();
		contentElement.innerHTML += "Brightness: " + JSON.stringify(brightness) + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Brightness: NOT WORKING <br>";
	}

	try {
		const isOn = await sos.management.screen.isPoweredOn();
		contentElement.innerHTML += "InDisplayOn: " + isOn + "<br>";
	} catch (e) {
		contentElement.innerHTML += "InDisplayOn: NOT WORKING <br>";
	}

	try {
		const time = await sos.management.time.get();
		contentElement.innerHTML += "Time: " + JSON.stringify(time) + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Time: NOT WORKING <br>";
	}

	try {
		const volume = await sos.management.audio.getVolume();
		contentElement.innerHTML += "Volume: " + volume + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Volume: NOT WORKING <br>";
	}

});
