
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
function setColor(hexColor) {
	// Turn LED to selected color (https://docs.signageos.io/api/sos-applet-api/#LED)
	sos.hardware.led.setColor(hexColor);
}

sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const colorButtonsElement = document.getElementById('color-buttons');
	contentElement.innerHTML = '';
	
});
