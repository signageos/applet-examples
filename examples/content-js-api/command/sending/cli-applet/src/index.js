
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	contentElement.innerHTML = '';

	for (let i = 0; i < 10; i++) {
		// Send commands to be safely stored for reports, monitoring etc. even when goes offline (https://docs.signageos.io/api/sos-applet-api/#Command_Dispatching)
		await sos.command.dispatch({
			type: 'Loop.Item.Iterate',
			iteration: i,
		});
		contentElement.innerHTML = `Iteration: ${i}`;
		await new Promise((resolve) => setTimeout(resolve, 1e3));
	}

	contentElement.innerHTML = `Iterations done.`;
});
