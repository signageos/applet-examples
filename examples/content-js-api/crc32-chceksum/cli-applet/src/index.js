
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
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
		// Store files to offline storage (https://developers.signageos.io/sdk/sos/offline/cache)
		const {
			filePath
		} = await sos.offline.cache.loadOrSaveFile(content.uid, content.uri);
		content.filePath = filePath;
	}));

	contentElement.innerHTML = 'Files are loaded\n';
	console.log('Files are loaded');

	const expectedVideoHash = 'd33ec790';
	const expectedImageHash = 'b3651db1';

	// Generate hash for video
	const videoHash = await sos.offline.cache.getChecksumFile('video-1.mp4', 'crc32');
	console.log('Video hash: ' + videoHash);
	contentElement.innerHTML += 'Video hash: ' + videoHash + '\n';

	// Generate hash for image
	const imageHash = await sos.offline.cache.getChecksumFile('image-1.png', 'crc32');
	console.log('Image hash: ' + imageHash);
	contentElement.innerHTML += 'Image hash: ' + imageHash + '\n';

	// Validate hash for video
	const validHashVideo1 = await sos.offline.cache.validateChecksumFile('video-1.mp4', expectedVideoHash, 'crc32');
	console.log('Has video same hash as request: ' + validHashVideo1);
	contentElement.innerHTML += 'Has video same hash as request: ' + validHashVideo1 + '\n';

	// Validate hash for image
	const validHashImage1 = await sos.offline.cache.validateChecksumFile('image-1.png', 'incorrect-hash', 'crc32');
	console.log('Has image same hash as incorrect hash: ' + validHashImage1);
	contentElement.innerHTML += 'Has image same hash as incorrect hash: ' + validHashImage1 + '\n';

});
