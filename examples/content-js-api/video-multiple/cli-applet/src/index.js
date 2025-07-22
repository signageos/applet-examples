
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const videos = [{
			uid: 'video-1.mp4',
			x: 10,
			y: 15,
			width: 35,
			height: 35,
			uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
		},
		{
			uid: 'video-2.mp4',
			x: 55,
			y: 15,
			width: 35,
			height: 35,
			uri: 'https://static.signageos.io/assets/video-test-2_e2ffa51f6a4473b815f39e7fb39239da.mp4'
		},
		{
			uid: 'video-3.mp4',
			x: 30,
			y: 60,
			width: 35,
			height: 35,
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
		video.arguments = [
			video.filePath,
			Math.round(document.documentElement.clientWidth * video.x / 100),
			Math.round(document.documentElement.clientHeight * video.y / 100),
			Math.round(document.documentElement.clientWidth * video.width / 100),
			Math.round(document.documentElement.clientHeight * video.height / 100),
		];
	}

	contentElement.innerHTML = '';

	while (true) {
		const promises = [];
		for (let i = 0; i < Math.min(parseInt(sos.config.count || 2), videos.length); i++) {
			promises.push((async function() {
				const currentVideo = videos[i];

				// Videos are identificated by URI & coordination together (https://developers.signageos.io/sdk/sos/video)
				await sos.video.prepare(...currentVideo.arguments);
				await sos.video.play(...currentVideo.arguments);
				await sos.video.onceEnded(...currentVideo.arguments); // https://developers.signageos.io/sdk/sos/video
				await sos.video.stop(...currentVideo.arguments);
			})());
		}
		await Promise.all(promises);
	}

});
