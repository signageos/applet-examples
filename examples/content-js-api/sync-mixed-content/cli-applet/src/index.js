
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const imageElement = document.getElementById('image');
	contentElement.innerHTML = '...syncing...';

	// Connect to the sync server and initialize the sync group TODO add docs link
	const syncServerUri = sos.config.sync_server || undefined;
	const syncGroup = sos.config.sync_group || undefined;
	await sos.sync.connect(syncServerUri);
	await sos.sync.init(syncGroup);

	contentElement.innerHTML = '...loading files...';

	const items = [{
			type: 'video',
			uid: 'video-1',
			uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4',
		},
		{
			type: 'image',
			uid: 'image-1',
			uri: 'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png',
			duration: 5000,
		},
		{
			type: 'video',
			uid: 'video-2',
			uri: 'https://static.signageos.io/assets/video-test-2_e2ffa51f6a4473b815f39e7fb39239da.mp4',
		},
		{
			type: 'image',
			uid: 'image-2',
			uri: 'https://static.signageos.io/assets/android-nec-roberto_3f9b985e2214b59e3d1f296e69e86fdd.png',
			duration: 10000,
		},
		{
			type: 'video',
			uid: 'video-3',
			uri: 'https://static.signageos.io/assets/video-test-3_5cfd717df750e5b1d5dd8384c194a92d.mp4',
		},
		{
			type: 'image',
			uid: 'image-3',
			uri: 'https://static.signageos.io/assets/android-panasonic-pikachu_347af960f123f7c56f5f967882108bdf.png',
			duration: 20000,
		},
	];

	for (const item of items) {
		// Store file to offline storage (https://docs.signageos.io/api/sos-applet-api/#Load_or_Save_specific_file_into_internal_memory)
		const {
			filePath
		} = await sos.offline.cache.loadOrSaveFile(item.uid, item.uri);
		item.filePath = filePath;
		if (item.type === 'video') {
			item.arguments = [item.filePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];
		}
	}

	contentElement.innerHTML = '';

	let previousIndex;
	let currentIndex = 0;

	while (true) {
		const previous = typeof previousIndex === 'undefined' ? undefined : items[previousIndex];
		const current = items[currentIndex];

		const realCurrentUid = await sos.sync.wait(current.uid, syncGroup);
		const realCurrentIndex = items.findIndex((item) => item.uid === realCurrentUid);
		const realCurrent = items[realCurrentIndex];

		// play current

		// Videos are identificated by URI & coordination together (https://docs.signageos.io/api/sos-applet-api/#Play_video)
		if (realCurrent.type === 'video') {
			await sos.video.play(...realCurrent.arguments);
		} else if (realCurrent.type === 'image') {
			imageElement.src = realCurrent.filePath;
			imageElement.style.visibility = 'visible';
		} else {
			console.error('Unrecognized item type: ' + realCurrent.type);
		}

		// stop previous

		if (previous) {
			if (previous.type === 'video') {
				await sos.video.stop(...previous.arguments);
			} else if (previous.type === 'image' && current.type !== 'image') {
				imageElement.style.visibility = 'hidden';
			} else {
				console.error('Unrecognized item type: ' + previous.type);
			}
		}

		// prepare next

		let endedPromise;
		const nextIndex = (realCurrentIndex + 1) % items.length;

		if (realCurrent.type === 'video') {
			// https://docs.signageos.io/api/sos-applet-api/#onceEnded
			endedPromise = sos.video.onceEnded(...realCurrent.arguments);

			const next = items[nextIndex];
			if (next.type === 'video') {
				await sos.video.prepare(...next.arguments);
			}
		} else if (realCurrent.type === 'image') {
			endedPromise = new Promise((resolve) => setTimeout(resolve, realCurrent.duration));
		} else {
			console.error('Unrecognized item type: ' + realCurrent.type);
			endedPromise = Promise.resolve();
		}

		await endedPromise;

		previousIndex = realCurrentIndex;
		currentIndex = nextIndex;
	}

});
