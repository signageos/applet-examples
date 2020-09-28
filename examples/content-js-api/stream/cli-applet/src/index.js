
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const uri = sos.config.uri || 'https://www.rmp-streaming.com/media/bbb-360p.mp4';
	//const uri = sos.config.uri || 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov';
	const protocolType = sos.config.protocolType || 'HTTP'; // RTSP
	const format = sos.config.format || 'MP4';

	const stream = {
		uid: 'stream-1',
		uri
	};

	stream.arguments = [stream.uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight, protocolType, format];

	contentElement.innerHTML = '';

	function streamEventListener ({type, srcArguments}) {
		contentElement.innerHTML = `Stream ${type}: ${srcArguments.uri}`;
	}

	sos.stream.onConnected(streamEventListener);
	sos.stream.onDisconnected(streamEventListener);

	// Play stream forever (https://docs.signageos.io/api/sos-applet-api/#Play_stream)
	await sos.stream.play(...stream.arguments);

});
