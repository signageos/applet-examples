
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const NOT_SUPPORTED = 'Not Supported';

	const batteryStatus = await sos.management.supports('BATTERY_STATUS') ?
		await sos.management.getBatteryStatus() :
		NOT_SUPPORTED;

	if (batteryStatus === NOT_SUPPORTED) {
		contentElement.innerHTML = NOT_SUPPORTED;
	} else {
		contentElement.innerHTML = `
				Charge: ${batteryStatus.chargeType}<br/>
				Charging: ${batteryStatus.isCharging}<br/>
				Last Charging At: ${batteryStatus.lastChargingTime}<br/>
				Percentage: ${batteryStatus.percentage}<br/>
				Updated At: ${batteryStatus.updatedAt}<br/>
			`;
	}

});
