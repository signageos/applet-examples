
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const NOT_SUPPORTED = 'Not Supported';

	const networkInfo = await sos.management.supports('NETWORK_INFO') ?
		await sos.management.getNetworkInfo() :
		NOT_SUPPORTED;

	if (networkInfo === NOT_SUPPORTED) {
		contentElement.innerHTML = NOT_SUPPORTED;
	} else {
		contentElement.innerHTML = `
				IP Address: ${networkInfo.localAddress}
				Interface: ${networkInfo.activeInterface}
			`;
	}

});
