
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const startDisplayOffCountDown = async (countDown = 10) => {
		if (countDown <= 0) {
			contentElement.innerHTML = 'Turning off...';

			await sos.management.screen.powerOn();
			startDisplayOnCountDown();
		} else {
			const isDisplayOn = await sos.management.screen.isPoweredOn();
			contentElement.innerHTML = `
					On: ${isDisplayOn}
					Tuns off in ${countDown}
				`;

			setTimeout(() => {
				startDisplayOffCountDown(countDown - 1)
			}, 1000);
		}
	};

	const startDisplayOnCountDown = async (countDown = 10) => {
		if (countDown <= 0) {
			contentElement.innerHTML = 'Turning on...';

			await sos.management.screen.powerOff();
			startDisplayOffCountDown();
		} else {
			const isDisplayOn = await sos.management.screen.isPoweredOn();
			contentElement.innerHTML = `
					On: ${isDisplayOn}
					Tuns on in ${countDown}
				`;

			setTimeout(() => {
				startDisplayOffCountDown(countDown - 1)
			}, 1000);
		}
	};

	const isDisplayOn = await sos.management.screen.isPoweredOn();
	contentElement.innerHTML = `On: ${isDisplayOn}`;

	if (await sos.management.supports('DISPLAY_POWER')) {
		startDisplayOffCountDown();
	} else {
		contentElement.innerHTML = `
				On: ${isDisplayOn}<br/>
				Display power management is not supported.<br/>
			`;
	}
	
});
