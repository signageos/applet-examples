
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const video = {
		uid: 'video-1',
		uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
	};

	const {
		filePath
	} = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
	video.filePath = filePath;
	video.arguments = [video.filePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];

	contentElement.innerHTML = '';

	await sos.video.play(...video.arguments);

	await new Promise((resolve) => setTimeout(resolve, 3e3));

	// To restore whole display area. Simply stop all videos, streams etc. (https://docs.signageos.io/api/js/content/latest/js-applet-basics#restore)
	sos.restore();

	contentElement.innerHTML = 'Restored.';

});
