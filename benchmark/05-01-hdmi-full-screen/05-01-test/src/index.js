
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
				"uri": "https://demo.signageos.io/benchmark/styles.css?v=1.0",
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

		// Set properties like ID and URL for stream
		const stream = {
			uid: 'stream-1',
			uri: 'internal://hdmi1'
		};

		// Set url, resolution on screen (full screen) - (https://sdk.docs.signageos.io/api/js/content/latest/js-video-stream#play-stream)
		stream.arguments = [stream.uri, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];

		// Remove loading title
		titleElement.innerHTML = '';
		displayInfoElement.innerHTML = '';
		indexElement.innerHTML = '';
		htmlContentElement.innerHTML = '';

		// Play stream forever (https://sdk.docs.signageos.io/api/js/content/latest/js-video-stream#play-stream)
		await sos.stream.play(...stream.arguments);

		// If stream is disconnected, stop the stream (https://sdk.docs.signageos.io/api/js/content/latest/js-video-inputs-internal-ports)
		sos.stream.onDisconnected(async (event) => {
			contentElement.innerHTML = 'HDMI was disconnected';
			await sos.stream.stop(...stream.arguments);
		});

		// If HDMI is successfully connected, start the stream (https://sdk.docs.signageos.io/api/js/content/latest/js-video-inputs-internal-ports)
		sos.stream.onConnected(async (event) => {
			await sos.stream.play(...stream.arguments);
		});
	}
	// Needed check for distinction between sos open and platform in box
	typeof sos !== 'undefined' ?
		startApplet() :
		window.addEventListener('sos.loaded', startApplet);
});