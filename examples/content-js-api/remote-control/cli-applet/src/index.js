
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	contentElement.innerHTML = '';

	// Bind every key up of a remote control (except remote control is locked) (https://sdk.docs.signageos.io/api/js/content/latest/js-input)
	await sos.input.onKeyUp((keyUpEvent) => {
		contentElement.innerHTML = contentElement.innerHTML + `Pressed: ${keyUpEvent.keyCode} (${keyUpEvent.keyName})\n`;
	});

	contentElement.innerHTML = `Try press keys on a remote control.\n\n`;

});
