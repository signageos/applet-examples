
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	contentElement.innerHTML = '';

	for (let i = 0; i < 10; i++) {
		// Send commands to be safely stored for reports, monitoring etc. even when goes offline (https://developers.signageos.io/sdk/content/js-command)
		await sos.command.dispatch({
			type: 'Loop.Item.Iterate', // mandatory *type* and custom value
			iteration: i, // custom parameter and value
		});
		contentElement.innerHTML = `Iteration: ${i}`;
		await new Promise((resolve) => setTimeout(resolve, 1e3));
	}

	contentElement.innerHTML = `Iterations done.`;
});
