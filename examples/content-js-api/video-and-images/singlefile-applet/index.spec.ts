import should from 'should';
import Timing from "@signageos/sdk/dist/RestApi/Timing/Timing";
import { waitUntil } from "@signageos/sdk";
import { cleanTimings, setupPlayerTiming } from "../../../../tests/helper";
import { appletUid, appletVersion } from "../../../../tests/general";

describe('video-and-images', function () {

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

	it('should load applet, save video and images & play it in a loop', async function () {

		const contents = [
			{
				uid: 'video-1.mp4',
				uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
			},
			{
				uid: 'image-1.png',
				uri: 'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png'
			},
			{
				uid: 'image-2.png',
				uri: 'https://static.signageos.io/assets/android-nec-roberto_3f9b985e2214b59e3d1f296e69e86fdd.png'
			},
			{
				uid: 'image-3.png',
				uri: 'https://static.signageos.io/assets/android-panasonic-pikachu_347af960f123f7c56f5f967882108bdf.png'
			},
			{
				uid: 'video-2.mp4',
				uri: 'https://static.signageos.io/assets/video-test-3_5cfd717df750e5b1d5dd8384c194a92d.mp4'
			}
		];

		await Promise.all(contents.map(async (content: any) => {
			const {
				filePath
			} = await currentTiming.offline.cache.loadOrSaveFile(content.uid, content.uri);
			content.filePath = filePath;
		}));

		let videoFileList: any[] = [];
		let imageFileList: any[] = [];
		await waitUntil(async () => {
			const savedList = await currentTiming.offline.cache.listFiles();
			should(savedList).containEql('video-1.mp4');
			should(savedList).containEql('image-1.png');
			should(savedList).containEql('image-2.png');
			should(savedList).containEql('image-3.png');
			should(savedList).containEql('video-2.mp4');
			const video1 = await currentTiming.offline.cache.loadFile('video-1.mp4');
			const image1 = await currentTiming.offline.cache.loadFile('image-1.png');
			const image2 = await currentTiming.offline.cache.loadFile('image-2.png');
			const image3 = await currentTiming.offline.cache.loadFile('image-3.png');
			const video2 = await currentTiming.offline.cache.loadFile('video-2.mp4');
			videoFileList.push(video1, video2);
			imageFileList.push(image1, image2, image3);

		});

		// Wait until video is ends
		await waitUntil(async () => {
			const playingVideos = await currentTiming.video.play.getAll();
			should(playingVideos[0].uri).equal(videoFileList[0].filePath);
			should(playingVideos[0].x).equal(0);
			should(playingVideos[0].y).equal(0);
			should(playingVideos[0].width).greaterThan(0);
			should(playingVideos[0].height).greaterThan(0);
		});

		// Wait until video is stopped
		await waitUntil(async () => {
			const stoppedVideos = await currentTiming.video.stop.getAll();
			should(stoppedVideos[0].uri).equal(videoFileList[0].filePath);
			should(stoppedVideos[0].x).equal(0);
			should(stoppedVideos[0].y).equal(0);
			should(stoppedVideos[0].width).greaterThan(0);
			should(stoppedVideos[0].height).greaterThan(0);
		});

		// Test if image is played
		await waitUntil(async () => {
			const document = await currentTiming.html.getDOMDocument();
			const imageElement = document.getElementById('image-1');
			should(imageElement!.getAttribute("data-args")).containEql(imageFileList[0].filePath);
		});

		// Test infinite playing
		await waitUntil(async () => {
			const stoppedVideos = await currentTiming.video.play.getAll();
			should(stoppedVideos[1].uri).equal(videoFileList[1].filePath);
			should(stoppedVideos[1].x).equal(0);
			should(stoppedVideos[1].y).equal(0);
			should(stoppedVideos[1].width).greaterThan(0);
			should(stoppedVideos[1].height).greaterThan(0);
		});

	});
});
