
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const debugOnButton = document.getElementById('debug-on-btn');
	const debugOffButton = document.getElementById('debug-off-btn');
	
	if (await sos.management.supports('SET_DEBUG')) {
		contentElement.innerHTML = 'Waiting for user action';

		debugOnButton.onclick = async () => {
			await sos.management.debug.enable();
			contentElement.innerHTML = 'Debug enabled';
		}

		debugOffButton.onclick = async () => {
			await sos.management.debug.disable();
			contentElement.innerHTML = 'Debug disabled';
		}
	} else {
		contentElement.innerHTML = 'Not Supported';
	}
	
});
