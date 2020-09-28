
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const video = {
		uid: 'video-1',
		uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
	};

	// Store video to offline storage (https://docs.signageos.io/api/sos-applet-api/#Load_or_Save_specific_file_into_internal_memory)
	const {
		filePath
	} = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
	video.filePath = filePath;
	video.arguments = [video.filePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];

	contentElement.innerHTML = '';

	await sos.video.prepare(...video.arguments);
	while (true) {
		// Videos are identificated by URI & coordination together (https://docs.signageos.io/api/sos-applet-api/#Play_video)
		await sos.video.play(...video.arguments);
		// Don't stop video to gapless loop
		await sos.video.onceEnded(...video.arguments); // https://docs.signageos.io/api/sos-applet-api/#onceEnded
	}

});
