import Timing from "@signageos/sdk/dist/RestApi/Timing/Timing";
import { cleanTimings, setupPlayerTiming } from "./helper";
import { it } from "mocha";
import { waitUntil } from "@signageos/sdk";
import should from "should";

describe("File System", function () {

	let currentTiming: Timing;
	before(async function () {
		const { timing } = await setupPlayerTiming("d1aa183da1a70ca702f9f58bb991454363e37e3c21a6c1dc42", "2.0.0");
		currentTiming = timing;

		await waitUntil(async () => {
			const consoleLogs = await currentTiming.console.log.getAll();
			should(consoleLogs).containEql('sOS is ready');
		}, 60000);
	});

	after(async function() {
		await cleanTimings();
	});

	let storageUnits: any, internalStorageUnit: any, rootDirectoryFilePaths: any;

	it("should get list of storage units & verify one internal storage", async function() {

		storageUnits = await currentTiming.fileSystem.listStorageUnits();
		should(storageUnits).be.Array();

		internalStorageUnit = storageUnits.find((storageUnit: any) => !storageUnit.removable);
		should(internalStorageUnit).not.be.undefined()
	});

	it("should get list of files from root directory", async function() {
		rootDirectoryFilePaths = await currentTiming.fileSystem.listFiles({
			filePath: '',
			storageUnit: internalStorageUnit
		});
		should(rootDirectoryFilePaths).be.Array();
	});

	it("should create, delete and check if folder exists", async function() {
		if (await currentTiming.fileSystem.exists({storageUnit: internalStorageUnit, filePath: "test-dir"})) {
			await currentTiming.fileSystem.deleteFile({storageUnit: internalStorageUnit, filePath: "test-dir"}, true);
		}
		await currentTiming.fileSystem.createDirectory({storageUnit: internalStorageUnit, filePath: "test-dir"});
		const temporaryRootPathAfterCreatedFolder = await currentTiming.fileSystem.listFiles({
			filePath: '',
			storageUnit: internalStorageUnit
		});
		const folderExists = await temporaryRootPathAfterCreatedFolder.find((object) => object.filePath === "test-dir");
		should(folderExists!.filePath).be.equal("test-dir");
	});

	it("should return true if existing path is directory", async function() {
		const isDirectory = await currentTiming.fileSystem.isDirectory({storageUnit: internalStorageUnit, filePath: "test-dir"});
		should(isDirectory).be.true();
	});

	it("should download file to specific directory and check of if really exists", async function() {
		await currentTiming.fileSystem.downloadFile({
				storageUnit: internalStorageUnit,
				filePath: 'test-dir/downloaded-file.png'
			},
			'https://static.signageos.io/assets/android-benq-amy_bbd9afbc0655ceb6da790a80fbd90290.png',
		);
		const fileExists = await currentTiming.fileSystem.exists({
			storageUnit: internalStorageUnit,
			filePath: "test-dir/downloaded-file.png"
		});
		should(fileExists).be.true();
	});

	it("should write new file and verify if file contains content", async function() {
		await currentTiming.fileSystem.writeFile({
				storageUnit: internalStorageUnit,
				filePath: 'test-dir/log.txt'
			},
			'My awesome log line\n',
		);

		const logFileContent = await currentTiming.fileSystem.readFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.txt'
		});
		should(logFileContent).deepEqual("My awesome log line\n");
	});

	it("should rename file and overwrite existing file", async function() {
		await currentTiming.fileSystem.moveFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.txt'
		}, {
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.1.txt'
		}, { overwrite: true });

		const temporaryFilePath = await currentTiming.fileSystem.listFiles({
			filePath: 'test-dir',
			storageUnit: internalStorageUnit
		});
		const fileExists = await temporaryFilePath.find((object) => object.filePath === "test-dir/log.1.txt");
		should(fileExists!.filePath).be.equal("test-dir/log.1.txt");
	});

	it("should copy file and overwrite existing file", async function() {
		await currentTiming.fileSystem.copyFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.1.txt'
		}, {
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.1.txt.backup'
		}, { overwrite: true });

		const temporaryFilePath = await currentTiming.fileSystem.listFiles({
			filePath: 'test-dir',
			storageUnit: internalStorageUnit
		});
		const fileExists = await temporaryFilePath.find((object) => object.filePath === "test-dir/log.1.txt.backup");
		should(fileExists!.filePath).be.equal("test-dir/log.1.txt.backup");
	});

	it("should delete file from directory", async function() {
		await currentTiming.fileSystem.deleteFile({
				storageUnit: internalStorageUnit,
				filePath: 'test-dir/log.1.txt'
			},
			true,
		);
		const temporaryFilePath = await currentTiming.fileSystem.listFiles({
			filePath: 'test-dir',
			storageUnit: internalStorageUnit
		});
		const fileExists = await temporaryFilePath.find((object) => object.filePath === "test-dir/log.1.txt");
		should(fileExists).be.undefined();
	});

	it("should verify md5 checksum of file", async function() {
		const md5Checksum = await currentTiming.fileSystem.getFileChecksum({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/log.1.txt.backup'
		}, 'md5');
		should(md5Checksum).be.deepEqual("b3c6930b9306b8e35a978d342cf5a01e");
	});

	it("should download and unzip files", async function() {
		await currentTiming.fileSystem.downloadFile({
				storageUnit: internalStorageUnit,
				filePath: 'test-dir/test.zip'
			},
			'https://signageostest.blob.core.windows.net/front-display/test_542d76e5d64d81483dfa9b1ef9c4a4f8.zip',
		);
		await currentTiming.fileSystem.extractFile({
				storageUnit: internalStorageUnit,
				filePath: 'test-dir/test.zip'
			}, {
				storageUnit: internalStorageUnit,
				filePath: 'test-dir/test-extracted'
			},
			'zip',
		);
		const testExtractedFilePaths = await currentTiming.fileSystem.listFiles({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/test-extracted'
		});
		should(testExtractedFilePaths).be.Array();
		should(testExtractedFilePaths[0].filePath).equal("test-dir/test-extracted/my-file1");
	});

	it("should get content of downloaded file", async function() {
		const file = await currentTiming.fileSystem.getFile({
			storageUnit: internalStorageUnit,
			filePath: 'test-dir/test.zip'
		});
		should(file).be.Object();
		should(file!.localUri).be.not.undefined();
	})
});
