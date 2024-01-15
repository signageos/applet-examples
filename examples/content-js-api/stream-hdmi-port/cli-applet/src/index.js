
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const stream = {
		uid: 'stream-1',
		uri: 'internal://hdmi1'
	};

	stream.arguments = [stream.uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];

	contentElement.innerHTML = '';

	// Play stream forever (https://developers.signageos.io/sdk/content/js-video-inputs-internal-ports)
	await sos.stream.play(...stream.arguments);

	sos.stream.onDisconnected(async (event) => {
		contentElement.innerHTML = 'HDMI was disconnected';
		await sos.stream.stop(...stream.arguments);
	});

	sos.stream.onConnected(async (event) => {
		contentElement.innerHTML = '';
		await sos.stream.play(...stream.arguments);
	});

});
