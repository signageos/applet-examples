
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
function setColor(hexColor) {
	// Turn LED to selected color (https://developers.signageos.io/sdk/sos/hardware/)
	sos.hardware.led.setColor(hexColor);
}

sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const colorButtonsElement = document.getElementById('color-buttons');
	contentElement.innerHTML = '';
	
});
