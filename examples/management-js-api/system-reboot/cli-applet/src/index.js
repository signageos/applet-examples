
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const rebootButton = document.getElementById('reboot-btn');

	const startCountDown = async (countDown = 5) => {
		const contentElement = document.getElementById('index');

		if (countDown <= 0) {
			contentElement.innerHTML = 'Rebooting...';

			await sos.management.power.systemReboot();
		} else {
			contentElement.innerHTML = `Reboots in ${countDown}`;

			setTimeout(() => {
				startCountDown(countDown - 1)
			}, 1000);
		}
	};
	
	if (await sos.management.supports('SYSTEM_REBOOT')) {
		startCountDown();

		rebootButton.onclick = async () => {
			contentElement.innerHTML = 'Rebooting...';
			await sos.management.power.systemReboot();
		};
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
