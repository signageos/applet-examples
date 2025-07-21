
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = '';

	if (await sos.display.supports('FILE_SYSTEM_EXTERNAL_STORAGE')) {
		contentElement.innerHTML += `+ FILE_SYSTEM_EXTERNAL_STORAGE SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- FILE_SYSTEM_EXTERNAL_STORAGE NOT SUPPORTED <br />`;
	}

	if (await sos.display.supports('FILE_SYSTEM_FILE_CHECKSUM')) {
		contentElement.innerHTML += `+ FILE_SYSTEM_FILE_CHECKSUM SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- FILE_SYSTEM_FILE_CHECKSUM NOT SUPPORTED <br />`;
	}

	if (await sos.display.supports('VIDEO_4K')) {
		contentElement.innerHTML += `+ VIDEO_4K SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- VIDEO_4K NOT SUPPORTED <br />`;
	}

	if (await sos.display.supports('SERIAL')) {
		contentElement.innerHTML += `+ SERIAL SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- SERIAL NOT SUPPORTED <br />`;
	}
});
