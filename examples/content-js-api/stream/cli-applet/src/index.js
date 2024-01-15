
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const uri = sos.config.uri || 'https://www.rmp-streaming.com/media/bbb-360p.mp4';
	//const uri = sos.config.uri || 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov';
	const protocolType = sos.config.protocolType || 'HTTP'; // RTSP

	const stream = {
		uid: 'stream-1',
		uri
	};

	stream.arguments = [stream.uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight, { protocol: protocolType }];

	contentElement.innerHTML = '';

	function streamEventListener ({type, srcArguments}) {
		contentElement.innerHTML = `Stream ${type}: ${srcArguments.uri}`;
	}

	sos.stream.onConnected(streamEventListener);
	sos.stream.onDisconnected(streamEventListener);
	sos.stream.onError(streamEventListener);
	sos.stream.onPrepare(streamEventListener);
	sos.stream.onPlay(streamEventListener);
	sos.stream.onStop(streamEventListener);

	// Play stream forever (https://developers.signageos.io/sdk/content/js-video-stream)
	await sos.stream.play(...stream.arguments);

});
