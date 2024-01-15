
require('./index.css');

import sos from '@signageos/front-applet';
import Nexmosphere from '@signageos/front-applet-extension-nexmosphere';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const logElement = document.getElementById('log');

	function log(message) {
		logElement.innerHTML += message + '<br>';
	}

	async function downloadNexmosphereLib() {
		try {
			// add Nexmosphere extension library to the project and cache it offline on the device
			await sos.offline.addFilesSync([
				{
					uri: "https://2.signageos.io/lib/front-applet-extension-nexmosphere/0.1.1/front-applet-extension-nexmosphere.js",
					uid: "front-applet-extension-nexmosphere.js",
					type: sos.offline.types.javascript,
					flags: [sos.offline.flags.append(document.body)],
				},
			]);
		} catch (error) {
			log('failed to download Nexmosphere library: ' + error.message);
			throw error;
		}
	}

	async function createNexmosphere() {
		try {
			const serialPort = await sos.hardware.openSerialPort({
				device: '/dev/ttyUSB0',
				baudRate: 115200,
			});

			// you can now use Nexmosphere class
			return new Nexmosphere(serialPort);
		} catch (error) {
			log('failed to create nexmosphere: ' + error.message);
			throw error;
		}
	}

	log('initializing');

	await downloadNexmosphereLib();
	const nexmosphere = await createNexmosphere();

	const buttonAddress = parseInt(sos.config.buttonAddress) || 1;
	const buttonIndex = parseInt(sos.config.buttonIndex) || 0;
	const button = nexmosphere.createButton(buttonAddress, buttonIndex);
	button.on('pressed', () => log('button is pressed'));
	button.on('released', () => log('button is released'));

	const rfidAntennaAddress = parseInt(sos.config.rfidAddress) || 1;
	const rfidAntenna = nexmosphere.createRfidAntenna(rfidAntennaAddress);
	const currentlyPlacedTags = await rfidAntenna.getPlacedTags();
	log('currently placed tags: ' + currentlyPlacedTags.join(', '));
	rfidAntenna.on('picked', (tag) => log(`tag ${tag} was picked`));
	rfidAntenna.on('placed', (tag) => log(`tag ${tag} was placed`));

	log('Ready! Try some sensors');
});
