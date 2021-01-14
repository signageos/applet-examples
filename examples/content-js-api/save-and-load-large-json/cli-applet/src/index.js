
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = 'All ready, downloading JSON file.';
	
	// we recommend to use dynamic names for your JSON files to omit the HTTP cache, this sample uses just simple static file name
	const { filePath } = await sos.offline.cache.loadOrSaveFile('large-json.json', 'SET PATH TO YOUR JSON FILE');
	
	contentElement.innerHTML = 'JSON file saved ' + filePath;
	
	// this allows to get content of the large JSON File stored locally
	const readLocalFile = (filePath) => {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', filePath);
		xhr.onload = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200 || xhr.status === 0) {
					let data;
					try {
						data = JSON.stringify(xhr.responseText);
					} catch (e) {
						data = xhr.responseText;
					}
					resolve(data);
				} else {
					reject(`Error loading file ${filePath}`);
				}
			}
		};
		xhr.send();
		});
	};
	
	const response = await readLocalFile(filePath);
	contentElement.innerHTML = response;

});
