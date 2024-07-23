
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const uri = sos.config.uri || 'https://www.rmp-streaming.com/media/bbb-360p.mp4';
	const protocolType = sos.config.protocolType || 'HTTP';

	// Stream ID for future identification for subtitles/tracks
	const streamId = {
		uri,
		x: 0,
		y: 0,
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	};

	contentElement.innerHTML = '';
	
	function streamEventListener ({type, srcArguments}) {
		contentElement.innerHTML = `Stream ${type}: ${srcArguments.uri}`;
	}

	sos.stream.onConnected(streamEventListener);
	sos.stream.onDisconnected(streamEventListener);

	// Detect changes in tracks ex. video player loaded subtitles or you called method sos.stream.selectTrack()
	// https://developers.signageos.io/sdk/content/js-video-stream#event-ontrackschanged
	sos.stream.onTracksChanged((tracks) => {
		console.log('onTracksChanged', tracks);
	});

	// Prepare stream for playback with some additional options (https://developers.signageos.io/sdk/content/js-video-stream#prepare)
	await sos.stream.prepare(uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight, {
		background: true,
		autoReconnect: true,
		trackSelection: {
			preferredAudioLanguages: ['en'],
			preferredTextLanguages: ['en'],
		},
		drm: {
			scheme: 'Widevine',
			licenseUri: 'http://some.uri/licence-uri'
		}
	});

	// Play stream forever with some additional options (https://developers.signageos.io/sdk/content/js-video-stream#play)
	await sos.stream.play(uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight, {
		protocol: protocolType
	});

	// Get all tracks of the selected stream (https://developers.signageos.io/sdk/content/js-video-stream#gettracks)
	const trackInfo = await sos.stream.getTracks(streamId);
	console.log('trackInfo', trackInfo);

	// Select subtitles, audio or video track (https://developers.signageos.io/sdk/content/js-video-stream#selecttrack)
	await sos.stream.selectTrack(streamId, 'TEXT', '0', 1);
	await sos.stream.selectTrack(streamId, 'AUDIO', '2', 3);

	// Reset back to default track (https://developers.signageos.io/sdk/content/js-video-stream#resettrack)
	await sos.stream.resetTrack(streamId, 'TEXT');
});
