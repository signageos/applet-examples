
function makeIframe(baseUrl) {
	var iframeUid = 'iframe';
	var iframeOnlineUri = baseUrl + '/iframe.html';
	sos.offline.cache.loadOrSaveFile(iframeUid, iframeOnlineUri)
	.then(function (iframeOfflineFile) {
		var $iframe = $('<iframe/>').attr('src', iframeOfflineFile.filePath);
		$(document.body).append($iframe);
	});
}
