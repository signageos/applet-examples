
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	contentElement.innerHTML = '...syncing...';

	// Connect to the sync server and initialize the sync group TODO add docs link
	const syncServerUri = sos.config.sync_server || undefined;
	const syncGroup = sos.config.sync_group;
	await sos.sync.connect(syncServerUri);
	await sos.sync.init(syncGroup);

	contentElement.innerHTML = '...loading videos...';

	const videoUri = sos.config.video_uri || 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4';
	const uid = 'video-' + Math.random();

	// Store video to offline storage (https://sdk.docs.signageos.io/api/js/content/latest/js-offline-cache-media-files)
	const {
		filePath: videoFilePath
	} = await sos.offline.cache.loadOrSaveFile(uid, videoUri);
	const videoArguments = [videoFilePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];

	contentElement.innerHTML = '';

	await sos.video.prepare(...videoArguments);

	while (true) {
		await sos.sync.wait('video', syncGroup);

		// Videos are identificated by URI & coordination together (https://sdk.docs.signageos.io/api/js/content/latest/js-video)
		await sos.video.play(...videoArguments);

		// https://sdk.docs.signageos.io/api/js/content/latest/js-video
		await sos.video.onceEnded(...videoArguments);
	}

});
