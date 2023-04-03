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


	it("Video 1 stored", async function () {

		// check that device content has been loaded to the chache memory
		await waitUntil(async () => {
			const files = await currentTiming.offline.cache.listFiles();
			console.log("video 1 before assertion");
			should(files).containEql("video-2");
			console.log("video 1 after assertion");
		}, 900000);
	});

	it("Video 2 stored", async function () {

		// check that device content has been loaded to the chache memory
		await waitUntil(async () => {
			const files = await currentTiming.offline.cache.listFiles();
			console.log("video 2 before assertion");
			should(files).containEql("video-4");
			console.log("video 2 after assertion");
		}, 900000);
	});

	it("Video 3 stored", async function () {

		// check that device content has been loaded to the chache memory
		await waitUntil(async () => {
			const files = await currentTiming.offline.cache.listFiles();
			console.log("video 3 before assertion");
			should(files).containEql("video-5");
			console.log("video 3 after assertion");
		}, 900000);
	});

	it("Video 4 stored", async function () {

		// check that device content has been loaded to the chache memory
		await waitUntil(async () => {
			const files = await currentTiming.offline.cache.listFiles();
			console.log("video 4 before assertion");
			should(files).containEql("video-6");
			console.log("video 4 after assertion");
		}, 900000);
	});

	it("Video 5 stored", async function () {

		// check that device content has been loaded to the chache memory
		await waitUntil(async () => {
			const files = await currentTiming.offline.cache.listFiles();
			console.log("video 5 before assertion");
			should(files).containEql("video-7");
			console.log("video 5 after assertion");
		}, 900000);
	});

	it("Video 6 stored", async function () {

		// check that device content has been loaded to the chache memory
		await waitUntil(async () => {
			const files = await currentTiming.offline.cache.listFiles();
			console.log("video 6 before assertion");
			should(files).containEql("video-9");
			console.log("video 6 after assertion");
		}, 900000);
	});

	// // it("Device stored video content", async function () {

	// // 	// check that device content has been loaded to the chache memory
	// // 	await waitUntil(async () => {
	// // 		const files = await currentTiming.offline.cache.listFiles();
	// // 		console.log(files);
	// // 		should(files).containEql("video-2");
	// // 		should(files).containEql("video-4");
	// // 		// should(files).containEql("video-5");
	// // 		// should(files).containEql("video-6");
	// // 		// should(files).containEql("video-7");
	// // 		// should(files).containEql("video-9");
	// // 	}, 30000);
	// // });

	it("each video playing", async function () {

		await waitUntil(async () => {

		const playingVideos = await currentTiming.video.play.getAll();
		const videos = playingVideos.map(v => v.uri)

		const reg1 = /.*video-4/gm;
		const reg2 = /.*video-7/gm;
		const reg3 = /.*video-5/gm;
		const reg4 = /.*video-9/gm;
		const reg5 = /.*video-2/gm;
		const reg6 = /.*video-6/gm;

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

		const matchRegex6 = videos.some(video => reg6.test(video))
		should(matchRegex6).equal(true);


		 if (matchRegex1 && matchRegex2 && matchRegex3  && matchRegex4  && matchRegex5 && matchRegex6 ) {
			console.log("All Videos played correctly")
		}
	}, 120000);
	// Now test passed
	});
});
