
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const startCountDown = async (countDown = 5) => {
		const contentElement = document.getElementById('index');

		if (countDown <= 0) {
			contentElement.innerHTML = 'Restarting...';

			await sos.management.power.appRestart();
		} else {
			contentElement.innerHTML = `Restarts in ${countDown}`;

			setTimeout(() => {
				startCountDown(countDown - 1)
			}, 1000);
		}
	};

	const contentElement = document.getElementById('index');
	const restartButton = document.getElementById('restart-btn');

	if (await sos.management.supports('APP_RESTART')) {
		startCountDown();

		restartButton.onclick = async () => {
			contentElement.innerHTML = 'Restarting...';
			await sos.management.power.appRestart();
		};
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
