import sos from '@signageos/front-applet';

import { SupraScreen } from '@signageos/supra-screen/es6/sdk';
import './index.css';

const DEFAULT_APP_PACKAGE_IDS = ['com.rovio.angrybirds', 'com.rovio.BadPiggies'];
const header = document.getElementById('header');
const apps = document.getElementById('apps');
const status = document.getElementById('status');
const stopButton = document.getElementById('stop');
const appButtons = [];
let supraScreen;
let activeApp;
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
	stopButton.disabled = busy || !activeApp;
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

const terminateActiveApp = async () => {
	if (!activeApp) {
		return;
	}

	const appToStop = activeApp;
	activeApp = undefined;
	activePackageId = undefined;
	await appToStop.stop();
};

const switchApp = async (packageId) => {
	if (busy || packageId === activePackageId) {
		return;
	}

	busy = true;
	renderControls();
	setStatus('Switching application...');

	try {
		await terminateActiveApp();
		activeApp = await supraScreen.start({
			androidApp: packageId,
			geometry: getGeometry(),
		});
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

const stopAll = async () => {
	if (busy || !activeApp) {
		return;
	}

	busy = true;
	renderControls();
	setStatus('Stopping Android application...');

	try {
		await terminateActiveApp();
		setStatus('All Android applications stopped');
	} catch (error) {
		setStatus(`Failed to stop: ${error && error.message ? error.message : String(error)}`);
	} finally {
		busy = false;
		renderControls();
	}
};

stopButton.addEventListener('click', stopAll);
window.addEventListener('beforeunload', () => {
	if (activeApp) {
		activeApp.stop();
	}
});

sos.onReady().then(async () => {
	try {
		const appPackageIds = getAppPackageIds();
		createAppButtons(appPackageIds);
		supraScreen = new SupraScreen();
		busy = false;
		renderControls();
		await switchApp(appPackageIds[0]);
	} catch (error) {
		setStatus(`Failed: ${error && error.message ? error.message : String(error)}`);
	}
});
