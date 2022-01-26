
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://sdk.docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const imageThumbnailElement = document.getElementById('image-thumbnail');
	const videoThumbnailElement = document.getElementById('video-thumbnail');

	contentElement.innerHTML = '';

	const storageUnits = await sos.fileSystem.listStorageUnits();
	const internalStorageUnit = storageUnits.find((storageUnit) => !storageUnit.removable);

	const imageFilePath = {
		storageUnit: internalStorageUnit,
		filePath: 'image1.png',
	};

	if (await sos.fileSystem.exists(imageFilePath)) {
		await sos.fileSystem.deleteFile(imageFilePath);
	}
	await sos.fileSystem.downloadFile(imageFilePath, 'https://static.signageos.io/assets/android-nec-roberto_3f9b985e2214b59e3d1f296e69e86fdd.png');

	const imageFileDetails = await sos.fileSystem.getFile(imageFilePath);
	if (imageFileDetails.imageThumbnailUriTemplate) {
		imageThumbnailElement.src = imageFileDetails.imageThumbnailUriTemplate.replace('{width}', 320).replace('{height}', 240);
	} else {
		contentElement.innerHTML += `Image thumbnail is not available<br />`;
	}

	const videoFilePath = {
		storageUnit: internalStorageUnit,
		filePath: 'video1.mp4',
	};

	if (await sos.fileSystem.exists(videoFilePath)) {
		await sos.fileSystem.deleteFile(videoFilePath);
	}
	await sos.fileSystem.downloadFile(videoFilePath, 'https://static.signageos.io/assets/test-videos-01_AME/video-test-01_3s_1280x720_0d44e43c233b7630e3f5b515c706ac4a.mp4');

	const videoFileDetails = await sos.fileSystem.getFile(videoFilePath);
	if (videoFileDetails.videoThumbnailUriTemplate) {
		videoThumbnailElement.src = videoFileDetails.videoThumbnailUriTemplate.replace('{width}', 320).replace('{height}', 240);
	} else {
		contentElement.innerHTML += `Video thumbnail is not available<br />`;
	}
});
