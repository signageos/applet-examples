
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	const imgElements = [document.getElementById('image-1'), document.getElementById('image-2')]

	const iframeElement = document.getElementById('iframe');

	function getImgElement(...args) {
		return imgElements.find((imgElement) => imgElement.getAttribute('data-args') === JSON.stringify(args)) ||
			imgElements.find((imgElement) => imgElement.style.display === 'none');
	}

	const contents = sos.config.contents ? JSON.parse(sos.config.contents) : [{
			uid: 'video-1',
			uri: 'https://static.signageos.io/assets/video-test-1_e07fc21a7a72e3d33478243bd75d7743.mp4'
		},
		{
			uid: 'image-1',
			uri: 'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png'
		},
		{
			uid: 'image-2',
			uri: 'https://static.signageos.io/assets/android-nec-roberto_3f9b985e2214b59e3d1f296e69e86fdd.png'
		},
		{
			uid: 'iframe-1',
			uri: 'https://www.signageos.io' //BEWARE!!! Only websites that are allowed to be loaded in IFRAME will be displayed.
		},
	];

	// Save all files parallel
	await Promise.all(contents.map(async (content) => {
		if (content.uid.indexOf('iframe-') !== 0) {
			// Store files to offline storage (https://docs.signageos.io/api/sos-applet-api/#Load_or_Save_specific_file_into_internal_memory)
			const {
				filePath
			} = await sos.offline.cache.loadOrSaveFile(content.uid, content.uri);
			content.filePath = filePath;
		}
	}));

	for (const content of contents) {
		if (content.uid.indexOf('iframe-') !== 0) {
			content.arguments = [content.filePath, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight];
		}
	}

	contentElement.innerHTML = '';

	async function playContent(content) {
		if (content.uid.indexOf('video-') === 0) {
			await sos.video.play(...content.arguments);
		}
		if (content.uid.indexOf('image-') === 0) {
			getImgElement(...content.arguments).style.display = 'block';
		}
		if (content.uid.indexOf('iframe-') === 0) {
			iframeElement.style.display = 'block';
			if(!iframeElement.src) {
				iframeElement.src = content.uri
			}
		}
		content.playing = true;
	}

	async function stopContent(content) {
		if (content.playing) {
			if (content.uid.indexOf('video-') === 0) {
				await sos.video.stop(...content.arguments);
			}
			if (content.uid.indexOf('image-') === 0) {
				const imgElement = getImgElement(...content.arguments);
				imgElement.src = '';
				imgElement.setAttribute('data-args', '');
				imgElement.style.display = 'none';
			}
			if (content.uid.indexOf('iframe-') === 0) {
				iframeElement.style.display = 'none';
			}
			content.playing = false;
		}
	}

	async function prepareContent(content) {
		if (content.uid.indexOf('video-') === 0) {
			await sos.video.prepare(...content.arguments);
		}
		if (content.uid.indexOf('image-') === 0) {
			const imgElement = getImgElement(...content.arguments);
			imgElement.src = content.filePath;
			imgElement.setAttribute('data-args', JSON.stringify(content.arguments));
		}
		if (content.uid.indexOf('iframe-') === 0) {
			iframeElement.style.display = 'block';
		}
	}

	async function waitEndedContent(content) {
		if (content.uid.indexOf('video-') === 0) {
			await sos.video.onceEnded(...content.arguments);
		}
		if (content.uid.indexOf('image-') === 0) {
			await new Promise((resolve) => setTimeout(resolve, 3e3));
		}
		if (content.uid.indexOf('iframe-') === 0) {
			await new Promise((resolve) => setTimeout(resolve, 30e3));
		}
	}

	await prepareContent(contents[0]);

	for (let i = 0; true; i = (i + 1) % contents.length) {
		const previousContent = contents[(i + contents.length - 1) % contents.length];
		const currentContent = contents[i];
		const nextContent = contents[(i + 1) % contents.length];

		await playContent(currentContent);
		await stopContent(previousContent);
		await prepareContent(nextContent);
		await waitEndedContent(currentContent);
	}

});
