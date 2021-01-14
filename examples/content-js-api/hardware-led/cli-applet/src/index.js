
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
function setColor(hexColor) {
	// Turn LED to selected color (https://docs.signageos.io/api/js/content/latest/js-hardware)
	sos.hardware.led.setColor(hexColor);
}

sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const colorButtonsElement = document.getElementById('color-buttons');
	contentElement.innerHTML = '';
	
});
