
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	fetch('https://giphy.com/explore/free-gif')
	.then(function (resp) {
		console.info('response', resp);
		contentElement.innerHTML = 'CORS OK';
		return resp.text();
	})
	.then(function (text) {
		console.info('text', text);
	})
	.catch(function (error) {
		contentElement.innerHTML = 'CORS ERROR';
		console.error(error);
	});
});
