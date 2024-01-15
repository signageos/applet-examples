
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	if (await sos.management.supports('SCREENSHOT_UPLOAD')) {
		const screenshotUrl = await sos.management.screen.takeAndUploadScreenshot('https://upload-screenshot.your-cms.com');
		const screenshotTakenAt = new Date();

		contentElement.innerHTML = `
				<img 
					src="${screenshotUrl}"
					alt="Screenshot taken at ${screenshotTakenAt.toLocaleString()}"
					style="width:40vh;"
				/>
			`;
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
