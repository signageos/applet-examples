
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
	},
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

// Videos that will be downloaded and prepared for playing
const videos = [
	{ uid: 'video-1', uri: 'https://static.signageos.io/assets/test-videos-layers_AME/layers_15s_3840x2160_ed05ed5ac196c6b9f17feb6b084eda60.mp4' },
	{ uid: 'video-2', uri: 'https://static.signageos.io/assets/test-videos-02_AME/video-test-02_15s_3840x2160_09c01fa898c80160edde2a1218ac6043.mp4' },
	{ uid: 'video-3', uri: 'https://static.signageos.io/assets/test-videos-03_AME/video-test-03_15s_3840x2160_cfe034b73dd2965904f1667d09c10aad.mp4' },
	{ uid: 'video-4', uri: 'https://static.signageos.io/assets/test-videos-04_AME/video-test-04_15s_3840x2160_0709865ecbabb57c871771acce8a3bce.mp4' },
	{ uid: 'video-5', uri: 'https://static.signageos.io/assets/test-videos-01_AME/video-test-01_15s_3840x2160_5534e6c6e73facb818340fc2316ec89c.mp4' },
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
	video.arguments = [video.filePath, 0, 0, document.body.offsetWidth, document.body.offsetHeight, {'4k' : true}];
}

titleElement.innerHTML = '';
displayInfoElement.innerHTML = '';
indexElement.innerHTML = 'Ready for Playback';
htmlContentElement.innerHTML = '';
await sos.video.prepare(...videos[0].arguments);

for (let i = 0; true; i = (i + 1) % videos.length) {
	const previousVideo = videos[(i + videos.length - 1) % videos.length];
	const currentVideo = videos[i];
	const nextVideo = videos[(i + 1) % videos.length];

	// Videos are identificated by URI & coordination together (https://docs.signageos.io/api/js/js-video)
	await sos.video.play(...currentVideo.arguments);
	currentVideo.playing = true;
	if (previousVideo.playing) {
		await sos.video.stop(...previousVideo.arguments);
		previousVideo.playing = false;
	}
	await sos.video.prepare(...nextVideo.arguments); // Before the first video end, prepare the second one
	await sos.video.onceEnded(...currentVideo.arguments); // Wait until video ends
}
}

// Needed check for distinction between sos open and platform in box
typeof sos !== 'undefined' ?
startApplet() :
window.addEventListener('sos.loaded', startApplet);
});
