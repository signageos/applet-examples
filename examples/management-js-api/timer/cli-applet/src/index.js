
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const timerButton = document.getElementById('timer-btn');

	if (await sos.management.supports('TIMERS_NATIVE')) {
		timerButton.onclick = async () => {
			const timeOnInTwoMinutes = new Date(Date.now() + 120000);
			const timeOffInFiveMinutes = new Date(Date.now() + 300000);
			const timeOn = `${timeOnInTwoMinutes.getHours()}:${timeOnInTwoMinutes.getMinutes()}`;
			const timeOff = `${timeOnInFiveMinutes.getHours()}:${timeOnInFiveMinutes.getMinutes()}`;

			contentElement.innerHTML = 'Timer set';
			await sos.management.power.setTimer(
				'TIMER_1',
				timeOn,
				timeOff,
				['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
				50
			);
		};
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
