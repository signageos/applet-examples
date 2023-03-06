
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
		const videoSet1 = [
			{ uid: 'video-2', x: 0, y: 0, width: 960, height: 540, uri: 'https://hugstatic.blob.core.windows.net/assets/test-videos-04_AME/video-test-04_15s_960x540_44ab5d401df53dd18b37690f4f98cb32.mp4', background: true },
			{ uid: 'video-4', x: 0, y: 0, width: 960, height: 540, uri: 'https://hugstatic.blob.core.windows.net/assets/test-videos-08_AME/video-test-08_15s_960x540_0d5ce0d48b1184cad78ea532426b581f.mp4', background: true },
			{ uid: 'video-5', x: 0, y: 0, width: 960, height: 540, uri: 'https://hugstatic.blob.core.windows.net/assets/test-videos-03_AME/video-test-03_15s_960x540_0000ac1c906c046c68d11bbb0423617d.mp4' }
		];

		const videoSet2 = [
			{ uid: 'video-6', x: 960, y: 0, width: 960, height: 540, uri: 'https://1.signageos.io/assets/test-videos-03_AME/video-test-03_15s_960x540_0000ac1c906c046c68d11bbb0423617d.mp4' },
			{ uid: 'video-7', x: 960, y: 0, width: 960, height: 540, uri: 'https://1.signageos.io/assets/test-videos-05_AME/video-test-05_15s_960x540_ea776c1e692e389f5f571180b749bead.mp4' },
			{ uid: 'video-9', x: 960, y: 0, width: 960, height: 540, uri: 'https://1.signageos.io/assets/test-videos-04_AME/video-test-04_15s_960x540_44ab5d401df53dd18b37690f4f98cb32.mp4' }
		];

		// Store video to offline storage for set 1 (https://docs.signageos.io/api/js/js-offline-cache-media-files)
		for (const video of videoSet1) {
			indexElement.innerHTML = "Downloading: " + video.uri;
			const { filePath } = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
			video.filePath = filePath;
			video.arguments = [
				video.filePath,
				video.x,
				video.y,
				video.width,
				video.height,
			];
			indexElement.innerHTML = "Downloaded: " + video.filePath;
		}

		// Store video to offline storage for set 2 (https://docs.signageos.io/api/js/js-offline-cache-media-files)
		for (const video of videoSet2) {
			indexElement.innerHTML = "Downloading: " + video.uri;
			const { filePath } = await sos.offline.cache.loadOrSaveFile(video.uid, video.uri);
			video.filePath = filePath;
			video.arguments = [
				video.filePath,
				video.x,
				video.y,
				video.width,
				video.height,
			];
			indexElement.innerHTML = "Downloaded: " + video.filePath;
		}

		// When is all prepared, remove loading title and play videos
		titleElement.innerHTML = '';
		displayInfoElement.innerHTML = '';
		indexElement.innerHTML = 'Ready for Playback';
		htmlContentElement.innerHTML = '';

		async function playSet1() {
			for (let i = 0; true; i = (i + 1) % videoSet1.length) {
				const previousVideoSet = videoSet1[(i + videoSet1.length - 1) % videoSet1.length];
				const currentVideoSet = videoSet1[i];
				const nextVideoSet = videoSet1[(i + 1) % videoSet1.length];

				// Videos are identificated by URI & coordination together (https://docs.signageos.io/api/sos-applet-api/#Play_video)
				await sos.video.play(...currentVideoSet.arguments);
				currentVideoSet.playing = true;

				// If previous video is playing, stop it
				if (previousVideoSet.playing) {
					console.log('stop ' + previousVideoSet.filePath);
					await sos.video.stop(...previousVideoSet.arguments);
					previousVideoSet.playing = false;
				}

				// Prepare next video for gappless playback
				await sos.video.prepare(...nextVideoSet.arguments);
				await sos.video.onceEnded(...currentVideoSet.arguments); // https://docs.signageos.io/api/sos-applet-api/#onceEnded
			}
		}

		async function playSet2() {
			setTimeout(async function () {
				for (let i = 0; true; i = (i + 1) % videoSet2.length) {
					const previousVideoSet = videoSet2[(i + videoSet2.length - 1) % videoSet2.length];
					const currentVideoSet = videoSet2[i];
					const nextVideoSet = videoSet2[(i + 1) % videoSet2.length];

					// Videos are identificated by URI & coordination together (https://docs.signageos.io/api/sos-applet-api/#Play_video)
					await sos.video.play(...currentVideoSet.arguments);
					currentVideoSet.playing = true;

					// If previous video is playing, stop it
					if (previousVideoSet.playing) {
						console.log('stop ' + previousVideoSet.filePath);
						await sos.video.stop(...previousVideoSet.arguments);
						previousVideoSet.playing = false;
					}

					// Prepare next video for gappless playback
					await sos.video.prepare(...nextVideoSet.arguments);
					await sos.video.onceEnded(...currentVideoSet.arguments); // https://docs.signageos.io/api/sos-applet-api/#onceEnded
				}
			}, 1500);
		}


		// Play everything
		Promise.all([playSet1(), playSet2()]);
	}

	typeof sos !== 'undefined' ?
		startApplet() :
		window.addEventListener('sos.loaded', startApplet);
});