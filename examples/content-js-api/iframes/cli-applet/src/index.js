
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const iframeElement = document.getElementById('iframe');
	
	const iframeUri = sos.config.iframeUri || 'https://raw.githubusercontent.com/signageos/applet-examples/master/examples/iframes/singlefile-applet/iframe.html';

	const {
		filePath
	} = await sos.offline.cache.loadOrSaveFile('iframe.html', iframeUri);

	contentElement.innerHTML = '';

	iframeElement.src = filePath;
	iframeElement.style.display = 'block';

});
