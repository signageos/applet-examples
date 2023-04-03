const { waitUntil } = require('@signageos/sdk');
const should = require('should');
const { setupPlayerTiming, cleanTimings } = require("../lib/helper");
const { appletUid, appletVersion } = require("../lib/general");

describe('Check content', () => {

	/** Current instance of running applet on the device */
	let currentTiming;
	beforeEach(async function () {
		// Prepare timing on device with current applet and version
		const { timing } = await setupPlayerTiming(appletUid, appletVersion);
		currentTiming = timing;
	});

	afterEach(async function () {
		// We clean up device applets after each test
		await cleanTimings();
	});

	// it("each video saved", async function () {
	// 	currentTiming.listFiles()

	// }, 120000);



	// it("Video 1 stored", async function () {

	// 	// check that device content has been loaded to the chache memory
	// 	await waitUntil(async () => {
	// 		const files = await currentTiming.offline.cache.listFiles();
	// 		console.log("video 1 before assertion", files);
	// 		// should(files).containEql("video-0");
	// 		console.log("video 1 after assertion", files);
	// 	}, 900000);
	// });


	it("Device stored video content", async function () {
		await waitUntil(async () => {

			const files = await currentTiming.offline.cache.listFiles();
			console.log(files);
			should(files).containEql("video1.mp4");
			should(files).containEql("video1.mp4");
			should(files).containEql("video2.mp4");
		}, 30000);
	})



	// it("Video 2 stored", async function () {

	// 	// check that device content has been loaded to the chache memory
	// 	await waitUntil(async () => {
	// 		const files = await currentTiming.offline.cache.listFiles();
	// 		console.log("video 2 before assertion");
	// 		should(files).containEql("video-1");
	// 		console.log("video 2 after assertion");
	// 	}, 900000);
	// });

	// it("Video 3 stored", async function () {

	// 	// check that device content has been loaded to the chache memory
	// 	await waitUntil(async () => {
	// 		const files = await currentTiming.offline.cache.listFiles();
	// 		console.log("video 3 before assertion");
	// 		should(files).containEql("video-2");
	// 		console.log("video 3 after assertion");
	// 	}, 900000);
	// });


	it("Each video playing", async function () {

		await waitUntil(async () => {

		const playingVideos = await currentTiming.video.play.getAll();
		const videos = playingVideos.map(v => v.uri)

		const reg1 = /.*video0/gm;
		const reg2 = /.*video1/gm;
		const reg3 = /.*video2/gm;

		const matchRegex1 = videos.some(video => reg1.test(video))
		should(matchRegex1).equal(true);
	

		const matchRegex2 = videos.some(video => reg2.test(video))
		should(matchRegex2).equal(true);

		const matchRegex3 = videos.some(video => reg3.test(video))
		should(matchRegex3).equal(true);

		 if (matchRegex1 && matchRegex2 && matchRegex3 ) {
			console.log("All Videos played correctly")
		}
	}, 120000);
	// Now test passed
	});
});
