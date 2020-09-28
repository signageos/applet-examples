
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	contentElement.innerHTML = "Display version: " + sos.display.version + "<br>";

	try {
		await sos.management.remoteControl.disable();
		contentElement.innerHTML += "Disable Remote Control: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Disable Remote Control: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	await delay(1000);

	try {
		await sos.management.remoteControl.enable();
		contentElement.innerHTML += "Enable Remote Control: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Enable Remote Control: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	try {
		await sos.management.power.setTimer("TIMER_1", "09:00:00", "23:00:05", ["mon"], 10);
		contentElement.innerHTML += "Timer 1 Set: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Timer 1 Set: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	try {
		await sos.management.screen.setBrightness("02:00", 100, "8:00", 0);
		contentElement.innerHTML += "Brightness: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Brightness: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	try {
		await sos.management.screen.powerOff();
		contentElement.innerHTML += "Power Off: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Power Off: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	await delay(5000);

	try {
		await sos.management.screen.powerOn();
		contentElement.innerHTML += "Power On: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Power On: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	try {
		await sos.management.audio.setVolume(99);
		contentElement.innerHTML += "Volume: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Volume: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

	try {
		await sos.management.time.set(new Date(), "America/New_York");
		contentElement.innerHTML += "Set Time: OK <br>";
	} catch (e) {
		contentElement.innerHTML += "Set Time: NOT WORKING " + e.name + "<br>" + e.message + "<br>";
	}

});
