// navigation menu overlay toggle
function openNav() {
	document.getElementById("myNav").classList.toggle("menu_width");
	document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}

// managing selected cars hover
var selectionBoxes = document.getElementsByClassName('car_box');

function clearAllSelection() {
	for (var carsCount = 0; carsCount < selectionBoxes.length; carsCount++) {

		if (selectionBoxes[carsCount].classList.contains('active')) {
			selectionBoxes[carsCount].classList.remove('active');
		}

	}
}

for (var i = 0; i < selectionBoxes.length; i++) {

	selectionBoxes[i].addEventListener('click', function () {

		clearAllSelection();

		if (this.classList.contains('active')) {
			this.classList.remove('active');
		} else {
			this.classList.add('active');
		}
	});
}