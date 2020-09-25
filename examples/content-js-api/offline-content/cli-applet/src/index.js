
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	try {
		await sos.offline.cache.saveContent('TestKey', 'TestValue')
		contentElement.innerHTML += "Save content: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Save content: NOT WORKING <br>";
	}

	try {
		const loadedContent = await sos.offline.cache.loadContent('TestKey')
		contentElement.innerHTML += "Saved value: " + loadedContent + "<br>";
	} catch (e) {
		contentElement.innerHTML += "Saved value: NOT WORKING <br>";
	}

	try {
		const listedContents = await sos.offline.cache.listContents();
		contentElement.innerHTML += "List contents: " + JSON.stringify(listedContents) + "<br>";
	} catch (e) {
		contentElement.innerHTML += "List contents: NOT WORKING <br>";
	}

	try {
		await sos.offline.cache.deleteContent('TestKey');
		contentElement.innerHTML += "Delete content: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Delete content: NOT WORKING <br>";
	}

});
