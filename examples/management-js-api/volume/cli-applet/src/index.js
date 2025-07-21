
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const halfVolumeButton = document.getElementById('half-volume-btn');
	const fullVolumeButton = document.getElementById('full-volume-btn');

	const volumeWatch = async () => {
		const volume = await sos.management.audio.getVolume();
		contentElement.innerHTML = `Volume: ${volume}`;

		setTimeout(() => {
			volumeWatch();
		}, 500);
	};
	volumeWatch();

	if (await sos.management.supports('SET_VOLUME')) {
		halfVolumeButton.onclick = async () => {
			await sos.management.audio.setVolume(50);
		};

		fullVolumeButton.onclick = async () => {
			await sos.management.audio.setVolume(100);
		};
	} else {
		contentElement.innerHTML = 'Volume management is not supported.';
	}

});
