import sos from '@signageos/front-applet';

import { SupraScreen } from '@signageos/supra-screen/es6/sdk';
import './index.css';

const DEFAULT_APP_PACKAGE_IDS = ['com.rovio.angrybirds', 'com.rovio.BadPiggies'];
const header = document.getElementById('header');
const apps = document.getElementById('apps');
const status = document.getElementById('status');
const stage = document.getElementById('stage');
const stopButton = document.getElementById('stop');
const terminateButton = document.getElementById('terminate');
const appButtons = [];
const startedApps = Object.create(null);
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
	terminateButton.disabled = busy || Object.keys(startedApps).length === 0;
	if (activeApp) {
		stage.setAttribute('hidden', '');
	} else {
		stage.removeAttribute('hidden');
	}
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

const stopActiveApp = async () => {
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
		await stopActiveApp();
		activeApp = await supraScreen.start({
			androidApp: packageId,
			geometry: getGeometry(),
		});
		activePackageId = packageId;
		startedApps[packageId] = activeApp;
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
		await stopActiveApp();
		setStatus('All Android applications stopped');
	} catch (error) {
		setStatus(`Failed to stop: ${error && error.message ? error.message : String(error)}`);
	} finally {
		busy = false;
		renderControls();
	}
};

const terminateAll = async () => {
	const packageIds = Object.keys(startedApps);
	if (busy || packageIds.length === 0) {
		return;
	}

	busy = true;
	renderControls();
	setStatus('Terminating all Android applications...');

	const errors = [];
	for (const packageId of packageIds) {
		try {
			await startedApps[packageId].stop({ terminate: true });
			delete startedApps[packageId];
			if (activePackageId === packageId) {
				activeApp = undefined;
				activePackageId = undefined;
			}
		} catch (error) {
			errors.push(error);
		}
	}

	if (errors.length > 0) {
		const error = errors[0];
		setStatus(`Failed to terminate: ${error && error.message ? error.message : String(error)}`);
	} else {
		setStatus('All Android applications terminated');
	}
	busy = false;
	renderControls();
};

stopButton.addEventListener('click', stopAll);
terminateButton.addEventListener('click', terminateAll);
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
