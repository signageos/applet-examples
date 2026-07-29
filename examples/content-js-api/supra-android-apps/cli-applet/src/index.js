import sos from '@signageos/front-applet';

import sdkBundleUrl from './supra-screen-sdk.js?url';
import './index.css';

const DEFAULT_APP_PACKAGE_ID = 'com.rovio.angrybirds';
const header = document.getElementById('header');
const status = document.getElementById('status');
const stopButton = document.getElementById('stop');
const appButtons = Array.from(document.querySelectorAll('.app-toggle'));
let supraScreen;
let activeApp;
let activePackageId;
let busy = true;

const setStatus = (message) => {
	status.textContent = message;
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
	await appToStop.stop({ terminate: true });
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

const loadScript = (url) => new Promise((resolve, reject) => {
	const script = document.createElement('script');
	script.src = url;
	script.onload = resolve;
	script.onerror = () => reject(new Error(`Cannot load SDK from ${url}`));
	document.head.appendChild(script);
});

const createSupraScreen = () => {
	const sdk = window.SupraScreen;
	const SupraScreenClass = typeof sdk === 'function' ? sdk : sdk && sdk.SupraScreen;
	if (!SupraScreenClass) {
		throw new Error('SDK bundle does not export SupraScreen');
	}
	return new SupraScreenClass();
};

appButtons.forEach((button) => {
	button.addEventListener('click', () => switchApp(button.dataset.packageId));
});
stopButton.addEventListener('click', stopAll);
window.addEventListener('beforeunload', () => {
	if (activeApp) {
		activeApp.stop({ terminate: true });
	}
});

sos.onReady().then(async () => {
	try {
		const sdkUrl = sos.config.supraScreenSdkUrl || sdkBundleUrl;
		await loadScript(sdkUrl);
		supraScreen = createSupraScreen();
		busy = false;
		renderControls();
		await switchApp(DEFAULT_APP_PACKAGE_ID);
	} catch (error) {
		setStatus(`Failed: ${error && error.message ? error.message : String(error)}`);
	}
});
