var myVar = setInterval(function() {
  myTimer();
}, 30 * 1000);

function myTimer() {
  var d = new Date();
  document.getElementById("clock").innerHTML = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
