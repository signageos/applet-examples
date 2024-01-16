
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://developers.signageos.io/sdk/applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	contentElement.innerHTML = '';

	// Storage units are equivalent to disk volumes (C:, D: etc on Windows; /mnt/disc1, /mnt/disc2 on Unix)
	const storageUnits = await sos.fileSystem.listStorageUnits();

	// Every platform has at least one not removable storage unit (internal storage unit)
	const internalStorageUnit = storageUnits.find((storageUnit) => !storageUnit.removable);

	// Empty string '' refers to root directory. Here is root directory of internal storage
	const rootDirectoryFilePaths = await sos.fileSystem.listFiles({
		filePath: '',
		storageUnit: internalStorageUnit
	});

	contentElement.innerHTML += `Internal storage root directory listing: <br />`;
	for (const filePath of rootDirectoryFilePaths) {
		// Property filePath.filePath contains string representation of path separated by slash / for nested files (or dirs)
		contentElement.innerHTML += `- ${filePath.filePath} <br />`;
	}

	// Any listed filePaths can contain even directories
	const rootDirectoryPaths = await Promise.all(
		rootDirectoryFilePaths.filter(async (filePath) => await sos.fileSystem.isDirectory(filePath))
	);

	contentElement.innerHTML += `Internal storage root directory listing directories only: <br />`;
	for (const dirPath of rootDirectoryPaths) {
		// Property filePath.filePath contains string representation of path separated by slash / for nested files (or dirs)
		contentElement.innerHTML += `- ${dirPath.filePath} <br />`;
	}

	// You can create directory in root directory of internal storage (not rescursive)
	// First clean path if exists
	if (await sos.fileSystem.exists({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir'
		})) {
		await sos.fileSystem.deleteFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir'
		}, true);
	}

	await sos.fileSystem.createDirectory({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir'
	});
	contentElement.innerHTML += `Directory created <br />`;

	// You can download file to specific existing directory
	await sos.fileSystem.downloadFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/downloaded-file.png'
		},
		'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png', {
			'Authentication-Token': 'MySecretToken'
		}, // Optionally, you can use headers for download file
	);
	contentElement.innerHTML += `File downloaded <br />`;

	// Checking whether file really exists
	const fileExists = await sos.fileSystem.exists({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/downloaded-file.png'
	});
	contentElement.innerHTML += `Downloaded ${fileExists ? 'exists' : 'does not exist'} <br />`;

	// Another file can be writen directly (string support only, override only, no append)
	await sos.fileSystem.writeFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.txt'
		},
		'My awesome log line\n',
	);
	contentElement.innerHTML += `Log file written <br />`;

	// Written file can be read (coming soon)
	const logFileContent = await sos.fileSystem.readFile({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/log.txt'
	});
	contentElement.innerHTML += `Log file contains: <pre>${logFileContent}</pre> <br />`;

	// Any file (or dir) can be moved or renamed to existing directory
	await sos.fileSystem.moveFile({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/log.txt'
	}, {
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/log.1.txt'
	}, );
	contentElement.innerHTML += `Log file moved<br />`;

	// Or copied
	await sos.fileSystem.copyFile({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/log.1.txt'
	}, {
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/log.1.txt.backup'
	}, );
	contentElement.innerHTML += `Log file copied<br />`;

	// Or copied
	await sos.fileSystem.deleteFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.1.txt'
		},
		true, // Optinally, directories can be deleted recursivelly
	);
	contentElement.innerHTML += `Log file deleted<br />`;

	// Check the file md5 checksum (no other algorythm are supported widelly, sometimes sha1, sha256 or others)
	const md5Checksum = await sos.fileSystem.getFileChecksum({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/log.1.txt.backup'
	}, 'md5');
	contentElement.innerHTML += `Log file MD5 checksum: ${md5Checksum} <br />`;

	// You can even unzip files
	await sos.fileSystem.downloadFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/test.zip'
		},
		'https://signageostest.blob.core.windows.net/front-display/test_542d76e5d64d81483dfa9b1ef9c4a4f8.zip',
	);
	await sos.fileSystem.extractFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/test.zip'
		}, {
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/test-extracted'
		},
		'zip',
	);
	contentElement.innerHTML += `Test archive extracted<br />`;

	const testExtractedFilePaths = await sos.fileSystem.listFiles({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/test-extracted'
	});
	contentElement.innerHTML += `Archive extracted files: <br />`;
	for (const filePath of testExtractedFilePaths) {
		// Property filePath.filePath contains string representation of path separated by slash / for nested files (or dirs)
		contentElement.innerHTML += `- ${filePath.filePath} <br />`;
	}

	// For access file in your HTML applet or more information on file
	const file = await sos.fileSystem.getFile({
		storageUnit: internalStorageUnit,
		filePath: 'test-dir/test.zip'
	});
	contentElement.innerHTML += `HTML access URL: ${file.localUri}<br />`;
	// All other properties are optional (depends on platform support)
	contentElement.innerHTML += `File detailed info: ${JSON.stringify(file)}<br />`;
});
