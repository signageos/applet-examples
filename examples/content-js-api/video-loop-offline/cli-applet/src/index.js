
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const videos = [{
			uid: 'video-1.mp4',
			uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
		},
		{
			uid: 'video-2.mp4',
			uri: 'https://static.signageos.io/assets/video-test-2_e2ffa51f6a4473b815f39e7fb39239da.mp4'
		},
		{
			uid: 'video-3.mp4',
			uri: 'https://static.signageos.io/assets/video-test-3_5cfd717df750e5b1d5dd8384c194a92d.mp4'
		},
	];

	for (const video of videos) {
		// Store video to offline storage (https://developers.signageos.io/sdk/sos/offline/cache)
		const {
			filePath
		} = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
		video.filePath = filePath;
	}

	for (const video of videos) {
		video.arguments = [video.filePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];
	}

	contentElement.innerHTML = '';

	for (let i = 0; true; i = (i + 1) % videos.length) {
		const previousVideo = videos[(i + videos.length - 1) % videos.length];
		const currentVideo = videos[i];
		const nextVideo = videos[(i + 1) % videos.length];

		// Videos are identificated by URI & coordination together (https://developers.signageos.io/sdk/sos/video)
		await sos.video.play(...currentVideo.arguments);
		currentVideo.playing = true;
		if (previousVideo.playing) {
			await sos.video.stop(...previousVideo.arguments);
			previousVideo.playing = false;
		}
		await sos.video.prepare(...nextVideo.arguments);
		await sos.video.onceEnded(...currentVideo.arguments); // https://developers.signageos.io/sdk/sos/video
	}

});
