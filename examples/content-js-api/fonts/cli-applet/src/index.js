
require('./index.css');

import sos from '@signageos/front-applet';

// Wait on sos data are ready (https://docs.signageos.io/api/js/content/latest/js-applet-basics)
sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	
	const montserratBold = {
		uid: 'font-montserrat-bold',
		fontFamily: 'MontserratBold',
		formats: {
			woff2: 'https://static.signageos.io/assets/Montserrat-Bold.woff2',
			woff: 'https://static.signageos.io/assets/Montserrat-Bold.woff',
			svg: 'https://static.signageos.io/assets/Montserrat-Bold.svg',
			ttf: 'https://static.signageos.io/assets/Montserrat-Bold.ttf',
			eot: 'https://static.signageos.io/assets/Montserrat-Bold.eot',
		},
		append: document.head
	};
	const montserratRegular = {
		uid: 'font-montserrat-regular',
		fontFamily: 'Montserrat',
		formats: {
			woff2: 'https://static.signageos.io/assets/Montserrat-Regular.woff2',
			woff: 'https://static.signageos.io/assets/Montserrat-Regular.woff',
			svg: 'https://static.signageos.io/assets/Montserrat-Regular.svg',
			ttf: 'https://static.signageos.io/assets/Montserrat-Regular.ttf',
			eot: 'https://static.signageos.io/assets/Montserrat-Regular.eot',
		},
		append: document.head
	};

	await sos.offline.addFont(montserratBold);
	await sos.offline.addFont(montserratRegular);
	console.log('Font face was created and was appended to document.head element');
});
