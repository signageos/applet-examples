
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	if (await sos.management.supports('SCREENSHOT_UPLOAD')) {
		const { screenshotUrl, aHash } = await sos.management.screen.takeAndUploadScreenshot(
			'https://upload-screenshot.your-cms.com',
			{
				computeHash: true, // optional, default is false
				headers: { // Additional headers if needed
					'Authorization': 'Bearer yourTokenHere',
					'Custom-Header': 'CustomValue'
				}
			}
		);
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
