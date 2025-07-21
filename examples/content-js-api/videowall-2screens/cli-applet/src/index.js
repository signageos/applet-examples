
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = '...syncing...';

	// Connect to the sync server and initialize the sync group TODO add docs link
	const syncServerUri = sos.config.sync_server || undefined;
	const syncGroup = sos.config.sync_group;
	await sos.sync.connect(syncServerUri);
	await sos.sync.init(syncGroup);

	contentElement.innerHTML = '...loading videos...';

	// Videos for the video wall are sliced in pre-production into separate segments, each segment for each device in the matrix
	const videosLeft = [{
			uid: 'video-1.mp4',
			uri: 'https://static.signageos.io/assets/videowall1/videowall1-left_145ee3fa78a472f39dcca5b70d65e98b.mp4'
		},
		{
			uid: 'video-2.mp4',
			uri: 'https://static.signageos.io/assets/videowall2/videowall2-left_cd0fe378929adffd4f85642bd70a7100.mp4'
		},
		{
			uid: 'video-3.mp4',
			uri: 'https://static.signageos.io/assets/videowall3/videowall3-left_4ac1f73046523ea729d0b6654dca58a6.mp4'
		},
	];
	const videosRight = [{
			uid: 'video-1.mp4',
			uri: 'https://static.signageos.io/assets/videowall1/videowall1-right_17fd879fa10927de5ccfa80f5e464b4f.mp4'
		},
		{
			uid: 'video-2.mp4',
			uri: 'https://static.signageos.io/assets/videowall2/videowall2-right_b0183cc35cb2c575546c9a63421db11a.mp4'
		},
		{
			uid: 'video-3.mp4',
			uri: 'https://static.signageos.io/assets/videowall3/videowall3-right_367c6dd00ba0bbeffb77899d87c6acc3.mp4'
		},
	];

	// based on configuration choose the correct set of videos
	const videos = sos.config.placement === 'right' ? videosRight : videosLeft;

	for (const video of videos) {
		// Store video to offline storage (https://developers.signageos.io/sdk/sos/offline/cache)
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

		// Videos are identificated by URI & coordination together (https://developers.signageos.io/sdk/sos/video)
		await sos.video.play(...realCurrentVideo.arguments);
		if (previousVideo) {
			await sos.video.stop(...previousVideo.arguments);
		}

		// https://developers.signageos.io/sdk/sos/video
		const endedPromise = sos.video.onceEnded(...realCurrentVideo.arguments);

		const nextVideoIndex = (realCurrentVideoIndex + 1) % videos.length;
		const nextVideo = videos[nextVideoIndex];
		await sos.video.prepare(...nextVideo.arguments);

		await endedPromise;

		previousVideoIndex = realCurrentVideoIndex;
		currentVideoIndex = nextVideoIndex;
	}

});
