const { waitUntil } = require('@signageos/sdk');
const should = require('should');
const { setupPlayerTiming, cleanTimings } = require("../lib/helper");
const { appletUid, appletVersion } = require("../lib/general");

describe('Check content', () => {

	/** Current instance of running applet on the device */
	let currentTiming;
	// let consoleLogs;

	beforeEach(async function () {
		// Prepare timing on device with current applet and version
		const { timing } = await setupPlayerTiming(appletUid, appletVersion);
		currentTiming = timing;
	});

	afterEach(async function () {
		// We clean up device applets after each test
		await cleanTimings();
	});

	// const consoleLogs =  currentTiming.console.log.getAll();
	// console.log(consoleLogs);

	// waitUntil(async () => {
	// 	consoleLogs = await currentTiming.console.log.getAll();
	// 	console.log(consoleLogs)

	// }, 30000);

	// if (consoleLogs) {
	// 	it("Device is capable of playing 4K video", async function () {
	// 		await waitUntil(async () => {

	// 			const consoleLogs = await currentTiming.console.log.getAll();
	// 			console.log(consoleLogs)
	// 			should(consoleLogs).containEql('device supports 4K videos');
	// 			should(consoleLogs).containEql(true);
	// 		}, 30000);
	// 	});
	// }

		// it("Device is capable of playing 4K video", async function () {
		// 	await waitUntil(async () => {

		// 		const consoleLogs = await currentTiming.console.log.getAll();
		// 		console.log(consoleLogs)
		// 		should(consoleLogs).containEql('device supports 4K videos');
		// 		should(consoleLogs).containEql(true);
		// 	}, 30000);
		// });

	it("Device stored video content", async function () {
		await waitUntil(async () => {

			const files = await currentTiming.offline.cache.listFiles();
			console.log(files);
			should(files).containEql("video-1.mp4");
			should(files).containEql("video-2.mp4");
			should(files).containEql("video-3.mp4");
			should(files).containEql("video-4.mp4");
			should(files).containEql("video-5.mp4");
		}, 30000);
	});


	it.skip("Each video playing", async function () {

		await waitUntil(async () => {
			const playingVideos = await currentTiming.video.play.getAll();
			const videos = playingVideos.map(v => v.uri)

			const reg1 = /.*video-1.mp4/gm;
			const reg2 = /.*video-2.mp4/gm;
			const reg3 = /.*video-3.mp4/gm;
			const reg4 = /.*video-4.mp4/gm;
			const reg5 = /.*video-5.mp4/gm;


			const matchRegex1 = videos.some(video => reg1.test(video))
			should(matchRegex1).equal(true);

			const matchRegex2 = videos.some(video => reg2.test(video))
			should(matchRegex2).equal(true);

			const matchRegex3 = videos.some(video => reg3.test(video))
			should(matchRegex3).equal(true);

			const matchRegex4 = videos.some(video => reg4.test(video))
			should(matchRegex4).equal(true);

			const matchRegex5 = videos.some(video => reg5.test(video))
			should(matchRegex5).equal(true);

			if (matchRegex1 && matchRegex2 && matchRegex3 && matchRegex4 && matchRegex5) {
				console.log("All Videos played correctly")
			}
		}, 120000);
		// Now test passed
	});
});
