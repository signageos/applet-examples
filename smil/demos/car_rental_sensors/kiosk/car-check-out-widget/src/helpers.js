
var selectionBoxes = document.getElementsByClassName('car_box');

function clearAllSelection() {
	for (var carsCount = 0; carsCount < selectionBoxes.length; carsCount++) {

		if (selectionBoxes[carsCount].classList.contains('active')) {
			selectionBoxes[carsCount].classList.remove('active');
		}

	}
}

for (var i = 0; i < selectionBoxes.length; i++) {

	selectionBoxes[i].addEventListener('click', function() {

		clearAllSelection();

		if (this.classList.contains('active')) {
			this.classList.remove('active');
		// alert("remove faq display!");
		} else {
			this.classList.add('active');
		// alert("add faq display!");
		}

	});
}
