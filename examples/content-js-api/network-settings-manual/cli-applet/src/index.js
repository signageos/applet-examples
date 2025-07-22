
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

	console.log('Setting manual network');
	contentElement.innerHTML += 'Setting manual network<br/>';

	const manualNetworkOption = {
		interface: 'ethernet',
		localAddress: '192.168.1.155',
		gateway: '192.168.1.1',
		netmask: '255.255.255.0',
		dns: ['192.168.1.1', '1.1.1.1'],
	};
	try {
		await sos.management.network.setManual(manualNetworkOption);
	} catch (error) {
		console.error('Manual network set failed', error);
		contentElement.innerHTML += 'Manual network set failed<br/>';
		return;
	}

	console.log('Manual network was set');
	contentElement.innerHTML += 'Manual network was set<br/>';

	let currentNetworkInfo;
	do {
		await delay(1e3);
		console.log('Checking network');
		contentElement.innerHTML += 'Checking network<br/>';
		currentNetworkInfo = await sos.management.network.getActiveInfo();
	} while (currentNetworkInfo.localAddress !== manualNetworkOption.localAddress);

	console.log('Network is correct now', currentNetworkInfo);
	contentElement.innerHTML += `Network is correct now<br/> ${JSON.stringify(currentNetworkInfo, undefined, 2)}`;

});
