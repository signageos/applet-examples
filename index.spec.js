const { waitUntil } = require('@signageos/sdk');
const should = require('should');
const { setupPlayerTiming, cleanTimings } = require("./tests/helper");
const { appletUid, appletVersion } = require("./tests/general");

describe('My first Applet', () => {

	let currentTiming;
	before(async function () {
		const { timing } = await setupPlayerTiming(appletUid, appletVersion);
		currentTiming = timing;

		await waitUntil(async () => {
			await currentTiming.onLoaded();
			const consoleLogs = await currentTiming.console.log.getAll();
			should(consoleLogs).containEql('sOS is ready');
		}, 60000);
	});

	after(async function() {
		await cleanTimings();
	});

	it('should load applet, make it ready, load jQuery library, show first time loaded message, fade it out, save video locally & play it in a loop', async function () {

		// Wait until content element contains correct expected text
		await waitUntil(async () => {
			const document = await currentTiming.html.getDOMDocument();
			const contentElement = document.getElementById('index');
			try {
				should(contentElement.innerHTML).startWith('First time loaded:');
			} catch (error) {
				should(contentElement.innerHTML).equal('This is loaded first time! Use REFRESH to show first load time.')
			}
		});

		// Wait until video file is saved
		let videoFile;
		await waitUntil(async () => {
			const savedList = await currentTiming.offline.cache.listFiles();
			should(savedList).containEql('intro-video');
			videoFile = await currentTiming.offline.cache.loadFile('intro-video');
		});

		// Wait until video is played
		await waitUntil(async () => {
			const playingVideos = await currentTiming.video.play.getAll();
			should(playingVideos[0].uri).equal(videoFile.filePath);
			should(playingVideos[0].x).equal(60);
			should(playingVideos[0].y).equal(100);
			should(playingVideos[0].width).greaterThan(0);
			should(playingVideos[0].height).greaterThan(0);
		});

		// Wait until video is stopped
		await waitUntil(async () => {
			const stoppedVideos = await currentTiming.video.stop.getAll();
			should(stoppedVideos[0].uri).equal(videoFile.filePath);
			should(stoppedVideos[0].x).equal(60);
			should(stoppedVideos[0].y).equal(100);
			should(stoppedVideos[0].width).greaterThan(0);
			should(stoppedVideos[0].height).greaterThan(0);
		});

		// Test infinite playing
		await waitUntil(async () => {
			const stoppedVideos = await currentTiming.video.stop.getAll();
			should(stoppedVideos[1].uri).equal(videoFile.filePath);
			should(stoppedVideos[1].x).equal(60);
			should(stoppedVideos[1].y).equal(100);
			should(stoppedVideos[1].width).greaterThan(0);
			should(stoppedVideos[1].height).greaterThan(0);
		});
	});
});
