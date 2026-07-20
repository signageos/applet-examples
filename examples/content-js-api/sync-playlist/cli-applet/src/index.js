import sos from '@signageos/front-applet';

// Master example: a video/image playlist played in sync across a group of devices,
// with minimal configuration. All screens sharing the same `sync_group` stay aligned:
// on every item boundary the applet hits a sync barrier (`sos.sync.wait`) so every device
// switches together. See https://developers.signageos.io/sdk/sos/sync
//
// Config (all optional; sensible demo defaults):
//   sync_group  - group id; screens with the same id play in sync (default: applet default group)
//   sync_server - sync server URI; empty = signageOS default server
//   sync_engine - "sync-server" (default) or "p2p-local" (LAN-only). All screens must match.
//   items       - JSON array of { type: "video"|"image", uid, uri, duration? }
//                 (duration in ms is used for images; videos play to their natural end)

const DEFAULT_ITEMS = [
	{ type: 'video', uid: 'video-1.mp4', uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4' },
	{ type: 'image', uid: 'image-1.png', uri: 'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png', duration: 5000 },
	{ type: 'video', uid: 'video-2.mp4', uri: 'https://static.signageos.io/assets/video-test-2_e2ffa51f6a4473b815f39e7fb39239da.mp4' },
	{ type: 'image', uid: 'image-2.png', uri: 'https://static.signageos.io/assets/android-nec-roberto_3f9b985e2214b59e3d1f296e69e86fdd.png', duration: 10000 },
	{ type: 'video', uid: 'video-3.mp4', uri: 'https://static.signageos.io/assets/video-test-3_5cfd717df750e5b1d5dd8384c194a92d.mp4' },
	{ type: 'image', uid: 'image-3.png', uri: 'https://static.signageos.io/assets/android-panasonic-pikachu_347af960f123f7c56f5f967882108bdf.png', duration: 20000 },
];

// Wait until sos data is ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const statusElement = document.getElementById('status');
	const imageElement = document.getElementById('image');

	statusElement.innerHTML = 'Connecting to sync group…';

	// --- Join the sync group (current API: connect({ engine, uri }) + joinGroup) ---
	const syncGroup = sos.config.sync_group || undefined;
	const syncServer = sos.config.sync_server || undefined;
	const syncEngine = sos.config.sync_engine || 'sync-server';
	await sos.sync.connect({ engine: syncEngine, uri: syncServer });
	await sos.sync.joinGroup({ groupName: syncGroup });

	// --- Resolve the playlist (config-driven, with a demo fallback) ---
	let items;
	try {
		items = sos.config.items ? JSON.parse(sos.config.items) : DEFAULT_ITEMS;
	} catch (error) {
		console.error('Invalid `items` config, falling back to demo playlist:', error);
		items = DEFAULT_ITEMS;
	}

	statusElement.innerHTML = 'Caching media…';

	// Cache every item offline first, so the synchronized flip is not gated by a download.
	// https://developers.signageos.io/sdk/sos/offline/cache
	const clientWidth = document.documentElement.clientWidth;
	const clientHeight = document.documentElement.clientHeight;
	for (const item of items) {
		const { filePath } = await sos.offline.cache.loadOrSaveFile(item.uid, item.uri);
		item.filePath = filePath;
		if (item.type === 'video') {
			item.arguments = [item.filePath, 0, 0, clientWidth, clientHeight];
		}
	}

	statusElement.innerHTML = '';

	let previousIndex;
	let currentIndex = 0;

	while (true) {
		const previous = typeof previousIndex === 'undefined' ? undefined : items[previousIndex];
		const current = items[currentIndex];

		// Barrier: block until every device in the group reaches this item, then all receive
		// the MASTER's chosen uid — act on the returned value, not our own index.
		const realCurrentUid = await sos.sync.wait(current.uid, syncGroup);
		const realCurrentIndex = items.findIndex((item) => item.uid === realCurrentUid);
		const realCurrent = items[realCurrentIndex];

		// Play the current item.
		if (realCurrent.type === 'video') {
			await sos.video.play(...realCurrent.arguments);
		} else if (realCurrent.type === 'image') {
			imageElement.src = realCurrent.filePath;
			imageElement.style.visibility = 'visible';
		} else {
			console.error('Unrecognized item type: ' + realCurrent.type);
		}

		// Stop the previous item.
		if (previous) {
			if (previous.type === 'video') {
				await sos.video.stop(...previous.arguments);
			} else if (previous.type === 'image' && realCurrent.type !== 'image') {
				imageElement.style.visibility = 'hidden';
			}
		}

		// Prepare the "ended" signal + prefetch the next video.
		let endedPromise;
		const nextIndex = (realCurrentIndex + 1) % items.length;

		if (realCurrent.type === 'video') {
			endedPromise = sos.video.onceEnded(...realCurrent.arguments);
			const next = items[nextIndex];
			if (next.type === 'video') {
				await sos.video.prepare(...next.arguments);
			}
		} else if (realCurrent.type === 'image') {
			endedPromise = new Promise((resolve) => setTimeout(resolve, realCurrent.duration || 10000));
		} else {
			endedPromise = Promise.resolve();
		}

		await endedPromise;

		previousIndex = realCurrentIndex;
		currentIndex = nextIndex;
	}
});
