
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	console.log('sOS is loaded');
	contentElement.innerHTML = 'sOS is loaded<br/>';


	// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
	await sos.onReady();
	console.log('sOS is ready');
	contentElement.innerHTML += 'sOS is ready<br/>';

	console.log('Setting DHCP network');
	contentElement.innerHTML += 'Setting DHCP network<br/>';

	try {
		await sos.management.network.setDHCP('ethernet');
	} catch (error) {
		console.error('DHCP network set failed', error);
		contentElement.innerHTML += 'DHCP network set failed<br/>';
		return;
	}

	console.log('DHCP network was set');
	contentElement.innerHTML += 'DHCP network was set<br/>';

});
