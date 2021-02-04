
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	if (await sos.management.supports('NETWORK_INFO')) {
		const interfaces = await sos.management.network.listInterfaces();
		contentElement.innerHTML = '';

		for (const iface of interfaces) {
			contentElement.innerHTML +=
				`Type: ${iface.type}, ` +
				`Name: ${iface.name}, ` +
				`MAC: ${iface.macAddress}`;
			if (iface.localAddress) {
				contentElement.innerHTML +=
					`IP: ${iface.localAddress}, ` +
					`Gateway: ${iface.gateway}, ` +
					`Netmask: ${iface.netmask}, ` +
					`DNS: ${(iface.dns || []).join(', ')}`;
			}
			contentElement.innerHTML += '<br>';
		}
	} else {
		contentElement.innerHTML = 'Not Supported';
	}
});
