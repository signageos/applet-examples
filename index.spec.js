
const sos = require('@signageos/test');
const should = require('should');

describe('My first Applet', () => {

	it('should load applet, make it ready, load jQuery library, show first time loaded message, fade it out, save video locally & play it in a loop',
		async () => {
			// Prepare timing on device with current applet & version
			const currentTiming = await sos.timing.create({
				deviceUid: sos.CURRENT_DEVICE_UID,
				appletUid: sos.CURRENT_APPLET_UID,
				appletVersion: sos.CURRENT_APPLET_VERSION,
				startsAt: sos.now(),
				endsAt: sos.now(),
				configuration: {
					sosMonitoring: true,
				},
				position: 1,
				finishEvent: {
					type: sos.timing.DURATION,
					data: null,
				},
			});

			try {
				// Wait until applet is loaded on device
				await currentTiming.onLoaded();

				// Wait until sos.onReady event is emitted 
				await sos.waitUntil(async () => {
					const consoleLogs = await currentTiming.console.log.getAll();
					should(consoleLogs).containEql('sOS is ready');
				});

				// Wait until content element contains correct expected text
				await sos.waitUntil(async () => {
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
				await sos.waitUntil(async () => {
					const savedList = await currentTiming.offline.cache.listFiles();
					should(savedList).containEql('intro-video');
					videoFile = await currentTiming.offline.cache.loadFile('intro-video');
				});

				// Wait until video is played
				await sos.waitUntil(async () => {
					const playingVideos = await currentTiming.video.play.getAll();
					should(playingVideos[0].uri).equal(videoFile.filePath);
					should(playingVideos[0].x).equal(60);
					should(playingVideos[0].y).equal(100);
					should(playingVideos[0].width).greaterThan(0);
					should(playingVideos[0].height).greaterThan(0);
				});

				// Wait until video is stopped
				await sos.waitUntil(async () => {
					const stoppedVideos = await currentTiming.video.stop.getAll();
					should(stoppedVideos[0].uri).equal(videoFile.filePath);
					should(stoppedVideos[0].x).equal(60);
					should(stoppedVideos[0].y).equal(100);
					should(stoppedVideos[0].width).greaterThan(0);
					should(stoppedVideos[0].height).greaterThan(0);
				});

				// Test infinite playing
				await sos.waitUntil(async () => {
					const stoppedVideos = await currentTiming.video.stop.getAll();
					should(stoppedVideos[1].uri).equal(videoFile.filePath);
					should(stoppedVideos[1].x).equal(60);
					should(stoppedVideos[1].y).equal(100);
					should(stoppedVideos[1].width).greaterThan(0);
					should(stoppedVideos[1].height).greaterThan(0);
				});
			} finally {
				await currentTiming.delete();
			}
		}
	);
});
