
var start = document.getElementById("start");

/*********
 * signageOS JS API usage
 * sos.hardware.openSerialPort
 ************/

async function lightUpLED() {
	try {
		let serialPortLED = await sos.hardware.openSerialPort({ device: 'PORT2', baudRate: 115200 });
		await serialPortLED.write('58303036425b3235303130355d0D0A');
		await serialPortLED.close();
	} catch (e) {
		console.log(e);
	}
}

// Get the button
var goToThankYouButton = document.getElementById("goToThankYou");
var goToThankYouButton2 = document.getElementById("goToThankYou2");

goToThankYouButton.addEventListener("click", function(){
		lightUpLED();
		thankYouSection.scrollIntoView(true);
		thankYouVideo.play();
		thankYouVideo.style.display = "block";
		thankYouVideo.style.opacity = 1;
		clearAllSelection();
	
	setTimeout(function(){
		thankYouVideo.style.display = "none";
		start.scrollIntoView(true);
		thankYouVideo.pause();
		thankYouVideo.currentTime = 0;
	}, 20000);
});

goToThankYouButton2.addEventListener("click", function(){
		lightUpLED();
		thankYouSection.scrollIntoView(true);
		thankYouVideo.play();
		thankYouVideo.style.display = "block";
		thankYouVideo.style.opacity = 1;
		clearAllSelection();
	
	setTimeout(function(){
		thankYouVideo.style.display = "none";
		start.scrollIntoView(true);
		thankYouVideo.pause();
		thankYouVideo.currentTime = 0;
	}, 20000);
});
