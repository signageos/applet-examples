
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const videoThumbnailElement = document.getElementById('video-thumbnail');

	contentElement.innerHTML = '';

	const storageUnits = await sos.fileSystem.listStorageUnits();
	const internalStorageUnit = storageUnits.find((storageUnit) => !storageUnit.removable);

	const videoFilePath = {
		storageUnit: internalStorageUnit,
		filePath: 'video1.mp4',
	};

	if (await sos.fileSystem.exists(videoFilePath)) {
		await sos.fileSystem.deleteFile(videoFilePath);
	}
	await sos.fileSystem.downloadFile(videoFilePath, 'https://static.signageos.io/assets/test-videos-01_AME/video-test-01_3s_1280x720_0d44e43c233b7630e3f5b515c706ac4a.mp4');

	const videoFileDetails = await sos.fileSystem.getFile(videoFilePath);
	contentElement.innerHTML += `Video details: ${JSON.stringify(videoFileDetails)}<br />`;

});
