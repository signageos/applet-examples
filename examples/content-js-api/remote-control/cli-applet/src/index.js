
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	contentElement.innerHTML = '';

	// Bind every key up of a remote control (except remote control is locked) (https://docs.signageos.io/api/sos-applet-api/#input)
	await sos.input.onKeyUp((keyUpEvent) => {
		contentElement.innerHTML = contentElement.innerHTML + `Pressed: ${keyUpEvent.keyCode} (${keyUpEvent.keyName})\n`;
	});

	contentElement.innerHTML = `Try press keys on a remote control.\n\n`;

});
