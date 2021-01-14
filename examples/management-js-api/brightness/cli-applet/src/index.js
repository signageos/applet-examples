
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const halfBrightnessButton = document.getElementById('half-brightness-btn');
	const fullBrightnessButton = document.getElementById('full-brightness-btn');
	
	const brightnessWatch = async () => {
		const brightness = await sos.management.screen.getBrightness();
		contentElement.innerHTML = `
				Time from 1: ${brightness.timeFrom1}<br/>
				Brightness 1: ${brightness.brightness1}<br/>
				Time from 2: ${brightness.timeFrom2}<br/>
				Brightness 2: ${brightness.brightness2}<br/>
			`;

		setTimeout(() => {
			brightnessWatch();
		}, 500);
	};
	brightnessWatch();

	if (await sos.management.supports('SET_BRIGHTNESS')) {
		halfBrightnessButton.onclick = async () => {
			await sos.management.screen.setBrightness(
				"00:00",
				50,
				"00:00",
				50
			);
		};

		fullBrightnessButton.onclick = async () => {
			await sos.management.screen.setBrightness(
				"00:00",
				100,
				"00:00",
				100
			);
		};
	} else {
		contentElement.innerHTML = 'Brightness management is not supported.';
	}
	
});
