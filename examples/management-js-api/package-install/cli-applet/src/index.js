
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const installButton = document.getElementById('install-btn');

	if (await sos.management.supports('PACKAGE_INSTALL')) {
		installButton.onclick = async () => {
			contentElement.innerHTML = 'Installing package...';
			await sos.management.package.install(
				'https://cdn.your-cms.com',
				'io.signageosWebView.app.ota',
				'2.4.0',
				'benq'
			);
		};
	} else {
		contentElement.innerHTML = 'Not Supported';
	}

});
