
var start = document.getElementById("start");
var thankYouVideo = document.getElementById("thankYouVideo");
var thankYouSection = document.getElementById("thankYouSection");
var paymentModal = document.getElementById("paymentModal");
var modalBackdrop = document.getElementById("modal-backdrop");

// Get the button
var startPaymentButton = document.getElementById("initiatePayment");
var startScanningButton = document.getElementById("startScanning");

async function print() {
    try {
      const stringToHex = (tmp) => {
          let str = '';
          let tmp_len = tmp.length;
          let c;

          for (let i = 0; i < tmp_len; i += 1) {
              c = tmp.charCodeAt(i).toString(16);
              if (c === 'a') {
                  c = '0A';
              }
              str += c;
              if (i === tmp_len - 1) {
                  str += '1D56410004';
              }
          }
          return str;
      }
      const receipt =
        '                                          \n' +
        '******************************************\n' +
        '         CAR RENT PREMIUM CHECKOUT        \n' +
        '          Pick up your vehicle at         \n' +
        '                  STATION 1               \n' +
        '******************************************\n' +
        '                                          \n' +
        '        S I G N A G E O S . I O           \n' +
        '                                          \n';
      const serialPort = await sos.hardware.openSerialPort({ device: 'PORT1', baudRate: 115200 });
      await serialPort.write(stringToHex(receipt));
      await serialPort.close();
    } catch (e) {
        console.log(e);
    }
}

startPaymentButton.addEventListener("click", function(){
    paymentModal.style.display = "block";
    paymentModal.style.opacity = 1;
    modalBackdrop.style.display = "block";

    setTimeout(function(){
        print();
        paymentModal.style.display = "none";
        paymentModal.style.opacity = 0;
        modalBackdrop.style.display = "none";
        thankYouSection.scrollIntoView(true);
        thankYouVideo.play();
        thankYouVideo.style.display = "block";
        thankYouVideo.style.opacity = 1;
        clearAllSelection();
    }, 4000);
    
    setTimeout(function(){
        thankYouVideo.style.display = "none";
        start.scrollIntoView(true);
        thankYouVideo.pause();
        thankYouVideo.currentTime = 0;
    }, 20000);
});