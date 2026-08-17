import sos from '@signageos/front-applet';

import SupraAppLauncher from '@signageos/supra-app-launcher';
import './index.css';

const DEFAULT_APP_PACKAGE_IDS = ['com.rovio.angrybirds', 'com.rovio.BadPiggies'];
const header = document.getElementById('header');
const apps = document.getElementById('apps');
const status = document.getElementById('status');
const stopButton = document.getElementById('stop');
const appButtons = [];
let supraAppLauncher;
// Handles of all started apps keyed by package id. Apps keep running in the
// background; switching only re-attaches rendering.
const runningApps = new Map();
let activePackageId;
let busy = true;

const setStatus = (message) => {
	status.textContent = message;
};

const getAppPackageIds = () => {
	if (!sos.config['appId.1']) {
		return DEFAULT_APP_PACKAGE_IDS;
	}

	const packageIds = [];
	for (let index = 1; sos.config[`appId.${index}`]; index += 1) {
		packageIds.push(sos.config[`appId.${index}`]);
	}
	return packageIds;
};

const renderControls = () => {
	appButtons.forEach((button) => {
		button.disabled = busy;
		button.setAttribute('aria-pressed', String(button.dataset.packageId === activePackageId));
	});
	stopButton.disabled = busy || !activePackageId;
};

const getGeometry = () => {
	const headerHeight = Math.ceil(header.getBoundingClientRect().height);
	return {
		x: 0,
		y: headerHeight,
		width: window.innerWidth,
		height: Math.max(1, window.innerHeight - headerHeight),
	};
};

const switchApp = async (packageId) => {
	if (busy || packageId === activePackageId) {
		return;
	}

	busy = true;
	renderControls();
	setStatus('Switching application...');

	try {
		// Re-attaching an already running app keeps its background runtime;
		// starting a different app does not stop the previously running one.
		const app = await supraAppLauncher.start({
			androidApp: packageId,
			geometry: getGeometry(),
		});
		runningApps.set(packageId, app);
		activePackageId = packageId;
		setStatus(`Running ${packageId}`);
	} catch (error) {
		setStatus(`Failed: ${error && error.message ? error.message : String(error)}`);
	} finally {
		busy = false;
		renderControls();
	}
};

const createAppButtons = (packageIds) => {
	packageIds.forEach((packageId) => {
		const button = document.createElement('button');
		button.className = 'button app-toggle';
		button.dataset.packageId = packageId;
		button.textContent = packageId;
		button.setAttribute('aria-pressed', 'false');
		button.addEventListener('click', () => switchApp(packageId));
		apps.appendChild(button);
		appButtons.push(button);
	});
};

const hideActiveApp = async () => {
	if (busy || !activePackageId) {
		return;
	}

	busy = true;
	renderControls();
	setStatus('Hiding Android application...');

	try {
		// stop() only detaches rendering; the app keeps running in the background.
		await runningApps.get(activePackageId)?.stop();
		activePackageId = undefined;
		setStatus('Android application hidden');
	} catch (error) {
		setStatus(`Failed to hide: ${error && error.message ? error.message : String(error)}`);
	} finally {
		busy = false;
		renderControls();
	}
};

stopButton.addEventListener('click', hideActiveApp);

sos.onReady().then(async () => {
	try {
		const appPackageIds = getAppPackageIds();
		createAppButtons(appPackageIds);
		supraAppLauncher = new SupraAppLauncher();
		busy = false;
		renderControls();
		await switchApp(appPackageIds[0]);
	} catch (error) {
		setStatus(`Failed: ${error && error.message ? error.message : String(error)}`);
	}
});
