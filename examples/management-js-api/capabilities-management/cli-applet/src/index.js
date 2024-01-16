
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = '';

	if (await sos.management.supports('BATTERY_STATUS')) {
		contentElement.innerHTML += `+ BATTERY_STATUS SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- BATTERY_STATUS NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('WIFI')) {
		contentElement.innerHTML += `+ WIFI SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- WIFI NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('WIFI_SCAN')) {
		contentElement.innerHTML += `+ WIFI_SCAN SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- WIFI_SCAN NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('WIFI_AP')) {
		contentElement.innerHTML += `+ WIFI_AP SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- WIFI_AP NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('SET_BRIGHTNESS')) {
		contentElement.innerHTML += `+ SET_BRIGHTNESS SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- SET_BRIGHTNESS NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('SET_TIME')) {
		contentElement.innerHTML += `+ SET_TIME SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- SET_TIME NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('NTP_TIME')) {
		contentElement.innerHTML += `+ NTP_TIME SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- NTP_TIME NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('PACKAGE_INSTALL')) {
		contentElement.innerHTML += `+ PACKAGE_INSTALL SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- PACKAGE_INSTALL NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('SET_VOLUME')) {
		contentElement.innerHTML += `+ SET_VOLUME SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- SET_VOLUME NOT SUPPORTED <br />`;
	}

	if (await sos.management.supports('SET_REMOTE_CONTROL_ENABLED')) {
		contentElement.innerHTML += `+ SET_REMOTE_CONTROL_ENABLED SUPPORTED <br />`;
	} else {
		contentElement.innerHTML += `- SET_REMOTE_CONTROL_ENABLED NOT SUPPORTED <br />`;
	}
});
