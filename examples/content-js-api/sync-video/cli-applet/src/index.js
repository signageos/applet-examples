
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = '...syncing...';

	// Connect to the sync server and initialize the sync group TODO add docs link
	const syncServerUri = sos.config.sync_server || undefined;
	const syncGroup = sos.config.sync_group || undefined;
	await sos.sync.connect(syncServerUri);
	await sos.sync.init(syncGroup);

	contentElement.innerHTML = '...loading videos...';

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
		// Store video to offline storage (https://sdk.docs.signageos.io/api/js/content/latest/js-offline-cache-media-files)
		const {
			filePath
		} = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
		video.filePath = filePath;
		video.arguments = [video.filePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];
	}

	contentElement.innerHTML = '';

	let previousVideoIndex;
	let currentVideoIndex = 0;

	while (true) {
		const previousVideo = typeof previousVideoIndex === 'undefined' ? undefined : videos[previousVideoIndex];
		const currentVideo = videos[currentVideoIndex];

		const realCurrentVideoUid = await sos.sync.wait(currentVideo.uid, syncGroup);
		const realCurrentVideoIndex = videos.findIndex((video) => video.uid === realCurrentVideoUid);
		const realCurrentVideo = videos[realCurrentVideoIndex];

		// Videos are identificated by URI & coordination together (https://sdk.docs.signageos.io/api/js/content/latest/js-video)
		await sos.video.play(...realCurrentVideo.arguments);
		if (previousVideo) {
			await sos.video.stop(...previousVideo.arguments);
		}

		// https://sdk.docs.signageos.io/api/js/content/latest/js-video
		const endedPromise = sos.video.onceEnded(...realCurrentVideo.arguments);

		const nextVideoIndex = (realCurrentVideoIndex + 1) % videos.length;
		const nextVideo = videos[nextVideoIndex];
		await sos.video.prepare(...nextVideo.arguments);

		await endedPromise;

		previousVideoIndex = realCurrentVideoIndex;
		currentVideoIndex = nextVideoIndex;
	}

});
