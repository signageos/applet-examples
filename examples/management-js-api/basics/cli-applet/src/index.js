
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const applicationType = await sos.management.app.getType();


	const deviceModel = await sos.management.supports('MODEL') ?
		await sos.management.getModel() :
		'Not Supported';

	const deviceSerialNumber = await sos.management.supports('SERIAL_NUMBER') ?
		await sos.management.getSerialNumber() :
		'Not Supported';

	const currentTemperature = await sos.management.supports('TEMPERATURE') ?
		await sos.management.getTemperature() :
		'Not Supported';

	contentElement.innerHTML = `
			Application Type: ${applicationType}<br/>
			Model: ${deviceModel}<br/>
			Serial Number: ${deviceSerialNumber}<br/>
			Device Temperature: ${currentTemperature}<br/>
		`;

});
