
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/docs/applets/getting-started/)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	await sos.offline.addFile({
		uid: 'libs/fetch-2.0.4.min.js',
		uri: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js',
		type: sos.offline.types.javascript,
		flags: [sos.offline.flags.append(document.body)],
	});

	contentElement.innerHTML = 'Loading ZIP file\n';
	await sos.offline.cache.loadOrSaveFile('my-folder/test.zip', 'https://static.signageos.io/assets/applet/offline-zip-decompress/test.zip');

	contentElement.innerHTML += 'Decompressing ZIP file\n';
	await sos.offline.cache.decompressFile('my-folder/test.zip', 'my-folder/test', 'zip');

	contentElement.innerHTML += 'Loading decompressed files\n';
	const file1 = await sos.offline.cache.loadFile('my-folder/test/my-file1');
	const file2 = await sos.offline.cache.loadFile('my-folder/test/my-file2');
	const file3 = await sos.offline.cache.loadFile('my-folder/test/my-folder/my-file3');
	const file4 = await sos.offline.cache.loadFile('my-folder/test/my-folder/sub-folder/my-file4');

	const response1 = await fetch(file1.filePath);
	const content1 = await response1.text();
	contentElement.innerHTML += `File1: ${file1.filePath} -> ${content1}`;

	const response2 = await fetch(file2.filePath);
	const content2 = await response2.text();
	contentElement.innerHTML += `File2: ${file2.filePath} -> ${content2}`;

	const response3 = await fetch(file3.filePath);
	const content3 = await response3.text();
	contentElement.innerHTML += `File3: ${file3.filePath} -> ${content3}`;

	const response4 = await fetch(file4.filePath);
	const content4 = await response4.text();
	contentElement.innerHTML += `File4: ${file4.filePath} -> ${content4}`;

});
