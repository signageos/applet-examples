
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics#onready)
sos.onReady().then(async function () {
	//const contentElement = document.getElementById('root');
	console.log('sOS is ready');

	async function startApplet() {

		// Load static files
		let files = [
			{
				"uri": "https://demo.signageos.io/benchmark/styles.css?v=1.0.0",
				"uid": "styles.css-v1.0.0",
				"type": sos.offline.types.css,
				"flags": [sos.offline.flags.append(document.head)]
			}
		];
		await sos.offline.addFiles(files);

		const titleElement = document.getElementById('title');
		const displayInfoElement = document.getElementById('displayInfo');
		const indexElement = document.getElementById('index');
		const htmlContentElement = document.getElementById('htmlContent');

		await sos.onReady(); // Wait until signageOS app is loaded and ready
		console.log('sos ready');
		
	  
		//Get display details
		try {
			const fw = await sos.management.firmware.getVersion();
			const pl = await sos.management.app.getType();
			const model = await sos.management.getModel();
			const displayInfo = document.getElementById('displayInfo');
			displayInfo.innerHTML = "Platform: " + pl + " Model: " + model + " FW: " + fw;
		} catch (e) {
			console.log(e);
		}

		// Videos that will be downloaded and prepared for playing 
		const videos = [
			{ uid: 'video0', x: 0, y: 0, width: 100, height: 100, uri: 'https://static.signageos.io/assets/test-videos-01_AME/video-test-01_15s_1920x1080_19c539e7982228ae0527409aeadb5b88.mp4' },
			{ uid: 'video1', x: 70, y: 70, width: 30, height: 30, uri: 'https://static.signageos.io/assets/test-videos-04_AME/video-test-04_15s_1920x1080_88f90af5fa281d7efb8eae17848e71d9.mp4' },
		];

		for (const video of videos) {
			// Store video to offline storage (https://docs.signageos.io/api/js/js-offline-cache-media-files)
			indexElement.innerHTML = "Downloading: " + video.uri;
			const { filePath } = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
			video.filePath = filePath;
			indexElement.innerHTML = "Downloaded: " + video.filePath;
		}

		// Set video properties for proper play on screen
		for (const video of videos) {
			video.arguments = [
				video.filePath,
				Math.round(document.body.clientWidth * video.x / 100),
				Math.round(document.body.clientHeight * video.y / 100),
				Math.round(document.body.clientWidth * video.width / 100),
				  Math.round(document.body.clientHeight * video.height / 100),
			];
		}

		// When is all prepared, remove loading title and play videos
		titleElement.innerHTML = '';
		displayInfoElement.innerHTML = '';
		indexElement.innerHTML = '';
		htmlContentElement.innerHTML = '';

		while (true) {
			const promises = [];
			for (let i = 0; i < Math.min(2, videos.length); i++) { // In this applet whe have 4 videos on same screen
				promises.push((async function () {
					const currentVideo = videos[i];

					// Videos are identificated by URI & coordination together (https://docs.signageos.io/api/js/js-video)
					await sos.video.prepare(...currentVideo.arguments);
					await sos.video.play(...currentVideo.arguments);
					await sos.video.onceEnded(...currentVideo.arguments); // Wait until video ends
					await sos.video.stop(...currentVideo.arguments); // Stop the video
				})());
			}
			await Promise.all(promises);
		}
	}
	// Needed check for distinction between sos open and platform in box
	typeof sos !== 'undefined' ?
		startApplet() :
		window.addEventListener('sos.loaded', startApplet);
});