
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const iframeElement = document.getElementById('iframe');

	const {
		filePath
	} = await sos.offline.cache.loadOrSaveFile('iframe1', 'https://raw.githubusercontent.com/signageos/applet-examples/master/examples/content-js-api/nested-iframes/iframe1.html');

	contentElement.innerHTML = '';

	iframeElement.src = filePath;
	iframeElement.style.display = 'block';

});
