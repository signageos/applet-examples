
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const manualTimeButton = document.getElementById('manual-time-btn');
	const ntpTimeButton = document.getElementById('ntp-time-btn');

	// https://sdk.docs.signageos.io/api/js/management/latest/6-js-management-time
	const timeWatch = async () => {
		const time = await sos.management.time.get();
		contentElement.innerHTML = `
				Time: ${time.currentDate}<br/>
				Timezone: ${time.timezone}<br/>
				NTP: ${time.ntpServer}<br/>
			`;

		setTimeout(() => {
			timeWatch();
		}, 500);
	};
	timeWatch();

	manualTimeButton.focus();

	if (await sos.management.supports('SET_TIME')) {
		manualTimeButton.onclick = async () => {
			const date = new Date();
			date.setHours(10, 0);
			await sos.management.time.setManual(
				date,
				'Europe/Amsterdam',
			);
		}

		ntpTimeButton.onclick = async () => {
			const date = new Date();
			date.setHours(15, 0);
			await sos.management.time.setNTP(
				'0.pool.ntp.org',
				'Europe/London',
			);
		}
	} else {
		contentElement.innerHTML = 'Time management is not supported.';
	}

});
