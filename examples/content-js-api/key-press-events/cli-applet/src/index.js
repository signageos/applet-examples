
require('./index.css');

import sos from '@signageos/front-applet';


function uniCharCode(event) {
	var char = event.which || event.keyCode;
	const contentElement = document.getElementById('index');
	contentElement.innerHTML = "Unicode CHARACTER code: " + char;
}

function uniKeyCode(event) {
	var key = event.keyCode;
	const contentElement = document.getElementById('index2');
	contentElement.innerHTML = "Unicode KEY code: " + key;
}

window.document.addEventListener("keyup", uniCharCode);
window.document.addEventListener("keydown", uniKeyCode);

sos.onReady().then(async function () {
	const contentElement = document.getElementById('index');
	contentElement.innerHTML = 'sOS Ready';
	
});
