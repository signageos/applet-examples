
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const dataElement = document.getElementById('data');

	function log(message) {
		dataElement.innerHTML += message + '<br>';
	}

	const serialPort = await sos.hardware.openSerialPort({
		device: '/dev/ttyUSB0',
		baudRate: 115200,
	});

	serialPort.onData((data) => log('data: ' + data.toString()));
});
