
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const buttonElement = document.getElementById('open-button');

	buttonElement.addEventListener('click', (event) => {
		event.preventDefault();

		// Open link in external browser on touch devices (https://developers.signageos.io/sdk/sos/browser)
		sos.browser.open('https://www.signageos.io', {
			readOnlyAddressBar: true,
			idleTimeout: 30e3 // milliseconds
			// Restrict where the page may navigate with a domain allow/deny list:
			// aclDomains: ['google.com'], aclMode: 'blacklist' // or 'whitelist'
		});

		contentElement.innerHTML = `Browser opened (idle timeout 30s).`;
	});

	buttonElement.style.display = 'inline-block';
});
