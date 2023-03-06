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

// 	it("Device is capable of playing 4K video", async function () {

// 	console.log(currentTiming.display.supports('VIDEO_4K'));
// 	// should(await sos.display.supports('VIDEO_4K')).equal(true);


// 	// if (await sos.display.supports('VIDEO_4K')) {
// 	// 	// play 4K video
// 	// }


// });


	it("each video playing", async function () {

		await waitUntil(async () => {

		const playingVideos = await currentTiming.video.play.getAll();
		const videos = playingVideos.map(v => v.uri)

		const reg1 = /.*video-2/gm;
		const reg2 = /.*video-6/gm;
		const reg3 = /.*video-4/gm;
		const reg4 = /.*video-7/gm;
		const reg5 = /.*video-5/gm;
		const reg6 = /.*video-9/gm;

console.log(videos)

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

		const matchRegex6 = videos.some(video => reg5.test(video))
		should(matchRegex5).equal(true);
	

		if (matchRegex1 && matchRegex2 && matchRegex3 && matchRegex4 && matchRegex5 && matchRegex6) {
			console.log("All Videos played correctly")
		}
	}, 120000);
	// Now test passed
	});
});
