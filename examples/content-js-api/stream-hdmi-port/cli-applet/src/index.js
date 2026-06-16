
require('./index.css');

import sos from '@signageos/front-applet';

// Maps the human-readable videoInput config option to its internal source URI.
const VIDEO_INPUT_URIS = {
	'HDMI 1': 'internal://hdmi1',
	'HDMI 2': 'internal://hdmi2',
	'HDMI 3': 'internal://hdmi3',
	'DisplayPort': 'internal://dp',
	'DVI': 'internal://dvi',
	'PC or VGA': 'internal://pc'
};

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const uri = VIDEO_INPUT_URIS[sos.config.videoInput] || 'internal://hdmi1';

	const stream = {
		uid: 'stream-1',
		uri
	};

	stream.arguments = [stream.uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];

	contentElement.innerHTML = '';

	// Play stream forever (https://developers.signageos.io/sdk/sos/stream)
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
