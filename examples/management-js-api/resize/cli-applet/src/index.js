
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const landscapeButton = document.getElementById('land-full-btn');
	const portraitButton = document.getElementById('port-ready-btn');

	if (await sos.management.supports('SCREEN_RESIZE')) {
		landscapeButton.onclick = async () => {
			await sos.management.screen.resize(
				"https://cdn.your-cms.com/tizen/1.0.4",
				"LANDSCAPE",
				"FULL_HD",
				"1.0.4"
			);
		};

		portraitButton.onclick = async () => {
			await sos.management.screen.resize(
				"https://cdn.your-cms.com/tizen/1.0.4",
				"PORTRAIT",
				"HD_READY",
				"1.0.4"
			);
		};
	} else {
		contentElement.innerHTML = 'Screen resize is not supported.';
	}

});
