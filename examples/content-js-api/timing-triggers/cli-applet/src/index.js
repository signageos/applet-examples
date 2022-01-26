
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const buttonElement = document.getElementById('pause-button');

	contentElement.innerHTML = '';

	let paused = false;

	buttonElement.addEventListener('click', async (event) => {
		event.preventDefault();

		// Pause or Resume timing triggers (https://sdk.docs.signageos.io/api/js/content/latest/js-timing)
		if (paused) {
			await sos.timing.triggers.resume();
			paused = false;
			buttonElement.innerHTML = 'Pause';
			contentElement.innerHTML = '';
		} else {
			await sos.timing.triggers.pause();
			paused = true;
			buttonElement.innerHTML = 'Resume';
			contentElement.innerHTML = `Timing triggers paused`;
		}
	});

	buttonElement.style.display = 'inline-block';
	
});
