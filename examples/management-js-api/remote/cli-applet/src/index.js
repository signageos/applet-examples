
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const enableButton = document.getElementById('enable-btn');
	const disableButton = document.getElementById('disable-btn');

	const isRemoteEnabled = await sos.management.remoteControl.isEnabled();
	contentElement.innerHTML = `Enabled: ${isRemoteEnabled}`;

	if (await sos.management.supports('SET_REMOTE_CONTROL_ENABLED')) {
		enableButton.onclick = async () => {
			await sos.management.remoteControl.enable();

			const isRemoteEnabled = await sos.management.remoteControl.isEnabled();
			contentElement.innerHTML = `Enabled: ${isRemoteEnabled}`;
		};

		disableButton.onclick = async () => {
			await sos.management.remoteControl.disable();

			const isRemoteEnabled = await sos.management.remoteControl.isEnabled();
			contentElement.innerHTML = `Enabled: ${isRemoteEnabled}`;
		};
	} else {
		contentElement.innerHTML = `
				Enabled: ${isRemoteEnabled}<br/>
				Managing remote is not supported.<br/>
			`;
	}

});
