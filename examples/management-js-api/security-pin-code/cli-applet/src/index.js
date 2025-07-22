
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const getPinButton = document.getElementById('get-pin-btn');
	const pinInput = document.getElementById('pin-code-input');
	const setPinButton = document.getElementById('set-pin-btn');
	const generatePinButton = document.getElementById('generate-pin-btn');

	getPinButton.onclick = async () => {
		const pinCode = await sos.management.security.getPinCode();
		contentElement.innerHTML += '<br/>Get PIN: ' + pinCode;
	};

	setPinButton.onclick = async () => {
		const newPinCode = pinInput.value;
		try {
			await sos.management.security.setPinCode(newPinCode);
			contentElement.innerHTML += '<br/>Set PIN: ' + newPinCode;
		} catch (error) {
			contentElement.innerHTML += '<br/>Set PIN failed: ' + error.message;
		}
	};

	generatePinButton.onclick = async () => {
		await sos.management.security.generateRandomPinCode();
		contentElement.innerHTML += '<br/>Generate PIN';
	};

});
