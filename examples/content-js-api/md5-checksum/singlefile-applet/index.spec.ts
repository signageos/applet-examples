import Timing from "@signageos/sdk/dist/RestApi/Timing/Timing";
import { cleanTimings, setupPlayerTiming } from "../../../../tests/helper";
import { waitUntil } from "@signageos/sdk";
import should from "should";
import { appletUid, appletVersion } from "../../../../tests/general";

describe('md5-checksum', function () {

	let currentTiming: Timing;
	before(async function () {
		const { timing } = await setupPlayerTiming(appletUid, appletVersion);
		currentTiming = timing;
		await waitUntil(async () => {
			await currentTiming.onLoaded;
			const consoleLogs = await currentTiming.console.log.getAll();
			should(consoleLogs).containEql('sOS is ready');
		}, 60000);
	});

	after(async function() {
		await cleanTimings();
	});

	it("should generate and validate md5 checksum", async function() {

		const files = [
			{
				uid: 'video-1.mp4',
				uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
			},
			{
				uid: 'image-1.png',
				uri: 'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png'
			}
		];

		await Promise.all(files.map(async (content: any) => {
			const {
				filePath
			} = await currentTiming.offline.cache.loadOrSaveFile(content.uid, content.uri);
			content.filePath = filePath;
		}));

		await waitUntil(async () => {
			const savedList = await currentTiming.offline.cache.listFiles();
			should(savedList).containEql("video-1");
			should(savedList).containEql("image-1");
			await currentTiming.offline.cache.loadFile("video-1");
			await currentTiming.offline.cache.loadFile("image-1");
		});

		const videoHash = await currentTiming.offline.cache.getChecksumFile('video-1.mp4', 'md5');
		const validateVideoHash = await currentTiming.offline.cache.validateChecksumFile('video-1.mp4', videoHash, 'md5');
		should(validateVideoHash).be.true();

		const imageHash = await currentTiming.offline.cache.getChecksumFile('image-1.png', 'md5');
		const validateImageHash = await currentTiming.offline.cache.validateChecksumFile('image-1.png', imageHash, 'md5');
		should(validateImageHash).be.true();
	});
});
