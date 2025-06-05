require('./index.css');
import sos from '@signageos/front-applet';

window.addEventListener('load', async () => {
	const QRCode = window.QRCode;

	if (!QRCode) {
		console.error('QRCode library not loaded');
		return;
	}

	const baseUrl = 'https://box.signageos.io/devices/deprovision?authHash=';
	console.log(`Base URL: -- ${baseUrl} --`);

	function generateQRcode(url) {
		if (url && typeof url === "string" && url.trim() !== "") {
			console.log("Generating QR code for URL:", url);
			QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, function (error, dataUrl) {
				if (error) {
					console.error("Error generating QR code:", error);
				} else {
					const img = new Image();
					img.src = dataUrl;
					document.getElementById('qrcode').appendChild(img);
					console.log("QR code generated successfully!");
				}
			});
		} else {
			console.error("Invalid URL: URL cannot be empty or undefined");
		}
	}

	async function getHash(url) {
		console.log("Fetching hash for URL: " + url);
		console.log(sos.authHash);
		try {
			const hasValue = await sos.authHash;
			const fullUrl = `${url}${hasValue}`;
			console.log("Generated URL with hash: " + fullUrl);
			return fullUrl;
		} catch (error) {
			console.error("Error fetching authHash:", error);
			return null;
		}
	}

	sos.onReady().then(async function () {
		const contentElement = document.getElementById('root');
		console.log('Depro App Ready !!');
		contentElement.innerHTML = 'APIs Ready !!';

		const completeUrl = await getHash(baseUrl);
		if (completeUrl) {
			generateQRcode(completeUrl);
		} else {
			console.error("Failed to generate QR code due to missing URL.");
		}
	});
});
