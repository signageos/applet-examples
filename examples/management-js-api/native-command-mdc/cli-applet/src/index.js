
require('./index.css');

import sos from '@signageos/front-applet';
import { CodesMDC } from '@signageos/front-applet/es6/FrontApplet/NativeCommands/MDC/CodesMDC';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const commandResponse1 = document.getElementById('commandResponse-1');
	const commandResponse2 = document.getElementById('commandResponse-2');
	const commandResponse3 = document.getElementById('commandResponse-3');

	contentElement.innerHTML = "Display version: " + sos.display.version + "<br>";

	// MDC Command - Get Brightness
	const commandBrightnessResponse = await sos.native.mdc.sendOne('localhost', CodesMDC.BRIGHTNESS_CONTROL);
	if (commandBrightnessResponse.type === 'ACK') {
		commandResponse1.innerHTML = "Brightness: " + commandBrightnessResponse.result;
	} else {
		commandResponse1.innerHTML = "Brightness command failed: " + commandBrightnessResponse.result;
	}

	// MDC Command - Set Volume to 50%
	const commandVolumeResponse = await sos.native.mdc.sendOne('localhost', CodesMDC.VOLUME_CONTROL, [50]);
	if (commandVolumeResponse.type === 'ACK') {
		commandResponse2.innerHTML = "Volume set to 50%";
	} else {
		commandResponse2.innerHTML = "Volume command failed: " + commandVolumeResponse.result;
	}

	// MDC Command - Set Gamma Mode to S-Curve
	const commandGammaResponse = await sos.native.mdc.sendOne('localhost', CodesMDC.PICTURE_CONTROL, [0x54, 0x03]);
	if (commandGammaResponse.type === 'ACK') {
		commandResponse3.innerHTML = "Gamma Mode set to S-Curve";
	} else {
		commandResponse3.innerHTML = "Gamma Mode command failed: " + commandGammaResponse.result;
	}

});
