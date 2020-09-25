
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const bodyElement = document.getElementById('body');
	const textElement = document.getElementById('text');

	sos.sensors.proximity.onStateChange((detected) => {
		if (detected) {
			bodyElement.className = 'detected';
			textElement.innerText = 'Something is detected!';
		} else {
			bodyElement.className = 'not_detected';
			textElement.innerText = 'Nothing is detected!';
		}
	});
	
});
