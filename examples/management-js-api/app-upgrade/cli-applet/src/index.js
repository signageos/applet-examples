
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const upgradeButton = document.getElementById('upgrade-btn');

	if (await sos.management.supports('APP_UPGRADE')) {
		upgradeButton.onclick = async () => {
			contentElement.innerHTML = 'Upgrading...';
			await sos.management.app.upgrade(
				'https://cdn.your-cms.com',
				'1.0.4'
			);
		};
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
