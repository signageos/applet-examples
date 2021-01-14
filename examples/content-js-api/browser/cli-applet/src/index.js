
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const buttonElement = document.getElementById('open-button');

	buttonElement.addEventListener('click', (event) => {
		event.preventDefault();

		// Open link in external browser on touch devices (https://docs.signageos.io/api/js/content/latest/js-browser)
		sos.browser.open('https://www.signageos.io', {
			acl: [/^https?:\/\/.*\.google\.\w+(\/.*)?$/],
			aclMode: 'blacklist', // or 'whitelist'
			readOnlyAddressBar: true,
			idleTimeout: 30e3 // milliseconds
		});

		contentElement.innerHTML = `Browser opened (idle timeout 30s).`;
	});

	buttonElement.style.display = 'inline-block';
});
