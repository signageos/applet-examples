
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const statusElement = document.getElementById('status');
	const infoElement = document.getElementById('info');
	const eventsElement = document.getElementById('events');
	const networkElement = document.getElementById('network');

	let ap_ssid;
	let ap_pass;
	let pending = false;

	async function updateAPStatus () {
		try {
			if (await sos.management.wifi.isAPEnabled()) {
				statusElement.innerText = `AP is enabled, connect to ${ap_ssid}, passphrase is "${ap_pass}"`;
				infoElement.innerText = 'Press SPACE to disable AP';
			} else if (await sos.management.wifi.isClientEnabled()) {
				const connectedTo = await sos.management.wifi.getConnectedTo();
				statusElement.innerText = 'client is enabled, connected to ' + connectedTo;
				infoElement.innerText = 'Press SPACE to enable AP';
			} else {
				statusElement.innerText = 'Wi-Fi is disabled';
				infoElement.innerText = 'Press SPACE to enable AP';
			}
		} catch (error) {
			statusElement.innerText = 'Error';
			infoElement.innerText = '';
		}
	}

	async function updateNetworkInfo () {
		const networkInfo = await sos.management.network.getActiveInfo();
		networkElement.innerHTML = 'active network interface: ' + networkInfo.activeInterface + '<br>'
									+ 'IP: ' + networkInfo.localAddress + '<br>'
									+ 'Netmask: ' + networkInfo.netmask + '<br>'
									+ 'Gateway: ' + networkInfo.gateway + '<br>'
									+ 'DNS: ' + (networkInfo.dns ? networkInfo.dns.join(', ') : '');
	}

	async function updateStatus () {
		await updateAPStatus();
		await updateNetworkInfo();
	}

	const events = [];

	async function logEvent (event) {
		const EVENTS_MAX_LENGTH = 10;
		events.push({ name: event, date: new Date() });
		while (events.length > EVENTS_MAX_LENGTH) {
			events.shift();
		}
		eventsElement.innerHTML = events.map((event) => `${event.date.toISOString()}&#9;${event.name}`).join('<br>');
	}

	async function toggleAP () {
		pending = true;
		statusElement.innerText = 'pending';
		infoElement.innerText = '';
		try {
			if (await sos.management.wifi.isAPEnabled()) {
				await sos.management.wifi.disable();
			} else {
				await sos.management.wifi.disable(); // either it's already disabled or client is enabled, calling disable covers both cases
				await sos.management.wifi.enableAP(ap_ssid, ap_pass);
			}
		} finally {
			pending = false;
			await updateStatus();
		}
	}

	ap_ssid = sos.config.ssid || 'sos_device';
	ap_pass = sos.config.pass || 'signageos';

	await updateStatus();
	setInterval(async () => {
		if (!pending) {
			await updateStatus();
		}
	}, 3e3);

	window.addEventListener('keydown', async (e) => {
		if (!pending && e.code === 'Space') {
			await toggleAP();
		}
	});

	sos.management.wifi.on('client_enabled', () => logEvent('CLIENT_ENABLED'));
	sos.management.wifi.on('client_connected', () => logEvent('CLIENT_CONNECTED'));
	sos.management.wifi.on('client_disconnected', () => logEvent('CLIENT_DISCONNECTED'));
	sos.management.wifi.on('ap_enabled', () => logEvent('AP_ENABLED'));
	sos.management.wifi.on('disabled', () => logEvent('DISABLED'));

});
