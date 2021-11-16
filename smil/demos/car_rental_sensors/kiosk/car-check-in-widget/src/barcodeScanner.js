var scanningModal = document.getElementById("scanningModal");
var modalBackdrop = document.getElementById("modal-backdrop");
var startScanningButton = document.getElementById("startScanning");
var carSelectorSection = document.getElementById("carSelector");

// wait function
function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/*********
 * signageOS JS API usage
 * sos.hardware.barcodeScanner.start
 ************/
async function startScanning() {
    try {
        const { stop, onData, onError } = await sos.hardware.barcodeScanner.start({
            timeout: 15000, //miliseconds
            cancelPrevious: true,
        });

        const data = await new Promise(rs => {
            onData(data => {
                afterBarCodeData(data);
                rs(data);
            });
            onError(error => {
                rs();
            });
        });
    } catch (e) {
        console.log(e);
    }
}
async function afterBarCodeData(data) {
    console.log(data);

    // play some funny sound to acknowledge the scan succeeded
    try {
        let hornAudio = document.getElementById('hornAudio');
        hornAudio.muted = false;
        hornAudio.volume = 1.0;
        hornAudio.currentTime = 0;
        hornAudio.play();
    } catch(e) {
        console.log(e);
    }

    let scanningInProgressGif = document.getElementById('scanningInProgressGif');
    scanningInProgressGif.style.display = "none";

    
    let scanningDoneGif = document.getElementById('scanningDoneGif');
    scanningDoneGif.style.display = "block";
    
    /**
     * Here is a good spot to implement call to an external system,
     * in this demo we do not have one so we are adding a short wait() to simulate 
     * such external communication
     */
    console.log('a')
    await wait(3000);
    console.log('b')

    scanningModal.style.display = "none";
    scanningModal.style.opacity = 0;
    modalBackdrop.style.display = "none";
    carSelectorSection.scrollIntoView(true);

    scanningInProgressGif.style.display = "block";
    scanningDoneGif.style.display = "none";

}

startScanningButton.addEventListener("click", function(){
    scanningModal.style.display = "block";
    scanningModal.style.opacity = 1;
    modalBackdrop.style.display = "block";

    startScanning();

});