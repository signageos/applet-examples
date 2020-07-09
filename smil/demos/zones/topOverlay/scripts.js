function numProps(obj) {
  var c = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) ++c;
  }
  return c;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('klocka').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}




$( document ).ready(function() {

  var i = 0;
  var antal = numProps(days);
  var date = new Date();
  date = convertDate(date);
  
  while (i<antal) {
      
      if (days[i]["datum"]==date) {

        $('#dag').html(days[i]["dag"]);

      }

      i++;  
    }

/*
	$.ajax({
		url: 'http://www.play.centrumkanalen.se/567/widgets/top/dagar.json',
		success: function(data) {
			
			var date = new Date();
			date = convertDate(date);

			var antal = numProps(data);
			
			var i = 0;

			while (i<antal) {

				
				if (data[i]["datum"]==date) {

					$('#dag').html(data[i]["dag"]);

				}

				i++;	
			}
			

			
		},
		error: function() {
			//something went wrong, handle the error and display a message
		}
	});
*/
});
