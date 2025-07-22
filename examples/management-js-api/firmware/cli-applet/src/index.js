
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const upgradeButton = document.getElementById('upgrade-btn');
	
	const firmwareVersion = await sos.management.firmware.getVersion();
	contentElement.innerHTML = `Current firmware: ${firmwareVersion}`;

	if (await sos.management.supports('FIRMWARE_UPGRADE')) {
		upgradeButton.onclick = async () => {
			await sos.management.firmware.upgrade(
				'https://cdn.your-cms.com/tizen/pmf/fw/2080_4.bem',
				'T-HKMLAKUC-2080.4'
			);
		};
	} else {
		contentElement.innerHTML = `
				Current firmware: ${firmwareVersion}<br/>
				Firmware upgrade is not supported.<br/>
			`;
	}

	if (sos.config.autoUpdateUrl) {
		if (await sos.management.supports('FIRMWARE_UPGRADE')) {
			if (firmwareVersion !== sos.config.autoUpdateVersion) {
				console.info('Firmware upgrade is happening.', sos.config.autoUpdateUrl, sos.config.autoUpdateVersion);
				await sos.management.firmware.upgrade(
					sos.config.autoUpdateUrl,
					sos.config.autoUpdateVersion,
				);
			} else {
				console.info('Firmware is already installed.', sos.config.autoUpdateUrl, sos.config.autoUpdateVersion);
			}
		} else {
			console.error('Firmware upgrade is not supported.', sos.config.autoUpdateUrl);
		}
	}

});
