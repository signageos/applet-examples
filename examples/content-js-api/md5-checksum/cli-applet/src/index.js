
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const files = [{
			uid: 'video-1.mp4',
			uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
		},
		{
			uid: 'image-1.png',
			uri: 'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png'
		}
	];

	// Save all files parallel
	await Promise.all(files.map(async (content) => {
		// Store files to offline storage (https://developers.signageos.io/sdk/content/js-offline-cache-media-files)
		const {
			filePath
		} = await sos.offline.cache.loadOrSaveFile(content.uid, content.uri);
		content.filePath = filePath;
	}));

	contentElement.innerHTML = 'Files are loaded\n';
	console.log('Files are loaded');

	const expectedVideoHash = 'e07fc21a7a72e3d33478243bd75d7743';
	const expectedImageHash = 'bbd9afbc0655ceb6da790a80fbd90290';

	// Generate hash for video
	const videoHash = await sos.offline.cache.getChecksumFile('video-1.mp4', 'md5');
	console.log('Video hash: ' + videoHash);
	contentElement.innerHTML += 'Video hash: ' + videoHash + '\n';

	// Generate hash for image
	const imageHash = await sos.offline.cache.getChecksumFile('image-1.png', 'md5');
	console.log('Image hash: ' + imageHash);
	contentElement.innerHTML += 'Image hash: ' + imageHash + '\n';

	// Validate hash for video
	const validHashVideo1 = await sos.offline.cache.validateChecksumFile('video-1.mp4', expectedVideoHash, 'md5');
	console.log('Has video same hash as request: ' + validHashVideo1);
	contentElement.innerHTML += 'Has video same hash as request: ' + validHashVideo1 + '\n';

	// Validate hash for image
	const validHashImage1 = await sos.offline.cache.validateChecksumFile('image-1.png', 'incorrect-hash', 'md5');
	console.log('Has image same hash as incorrect hash: ' + validHashImage1);
	contentElement.innerHTML += 'Has image same hash as incorrect hash: ' + validHashImage1 + '\n';

});
