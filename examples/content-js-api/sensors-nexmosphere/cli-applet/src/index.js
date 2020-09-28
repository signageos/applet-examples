
require('./index.css');

import sos from '@signageos/front-applet';
import Nexmosphere from '@signageos/front-applet-extension-nexmosphere';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const logElement = document.getElementById('log');

	function log(message) {
		logElement.innerHTML += message + '<br>';
	}

	const serialPort = await sos.hardware.openSerialPort({
		device: '/dev/ttyUSB0',
		baudRate: 115200,
	});

	const nexmosphere = new Nexmosphere(serialPort);

	const buttonAddress = 3;
	const buttonIndex = 0;
	const button = nexmosphere.createButton(buttonAddress, buttonIndex);
	button.on('pressed', () => log('button is pressed'));
	button.on('released', () => log('button is released'));

	const rfidAntennaAddress = 5;
	const rfidAntenna = nexmosphere.createRfidAntenna(rfidAntennaAddress);
	const currentlyPlacedTags = await rfidAntenna.getPlacedTags();
	log('currently placed tags: ' + currentlyPlacedTags.join(', '));
	rfidAntenna.on('picked', (tag) => log(`tag ${tag} was picked`));
	rfidAntenna.on('placed', (tag) => log(`tag ${tag} was placed`));
});
