function updateStylesBasedOnDarkMode() {
	const darkModeLocal = localStorage.getItem('darkMode');

	if (darkModeLocal === 'true') {
		$('.main').css('background-color', 'rgb(30, 30, 30)');
		$('.keyboard__start').css('background-color', 'rgb(0, 0, 0)');
		$('.keyboard__start__text').css('color', 'rgb(255, 255, 255)');
		$('.info-panel').css('background-color', 'black');
		$('.info-panel__text').css('color', 'white');
		$('.keyboard__close').css('background-color', 'rgba(0, 0, 0, 0.8)');
		$('.keyboard__close').css('color', 'white');
		$('.keyboard__credit').css('color', 'white');
		$('.keyboard__credit a').css('color', 'cornflowerblue');
	} else {
		$('.night-mode__text').css('color', '#000');
		$('.main').css('background-color', '#e5e5e5');
		$('.keyboard__start').css('background-color', 'rgb(255, 255, 255)');
		$('.keyboard__start__text').css('color', 'black');
		$('.keyboard').css('background-color', 'rgba(255, 255, 255, 0.4)');
		$('.info-panel').css('background-color', 'white');
		$('.info-panel__text').css('color', 'black');
		$('.keyboard__close').css('background-color', 'rgba(255, 255, 255, 0.8)');
		$('.keyboard__close').css('color', 'black');
	}
}

// Setting keyboard toggle button language
$('.keyboard__toggle').on('click', function () {
	$('.keyboard').toggle();

	let text;
	if ($('html').attr('lang') === 'en') {
		text = $('.keyboard').is(':visible') ? 'Hide keyboard' : 'Show keyboard';
	} else {
		text = $('.keyboard').is(':visible') ? 'Masquer le clavier' : 'Afficher le clavier';
	}

	$(this).text(text);
});

// FLASHING RIGHT KEY ON START
function fadeImages() {
	const flashingKey = document.getElementById('flashingKey');

	if (flashingKey.style.opacity === '0') {
		flashingKey.style.opacity = '1';
	} else {
		flashingKey.style.opacity = '0';
	}
}
setInterval(fadeImages, 500);

// MAIN DOM FUNCTION
$(document).ready(function () {
	let hideMode = 2;

	function moveToSelected(element) {
		let selected = element == 'next' ? $('.selected').next() : element == 'prev' ? $('.selected').prev() : element;

		// CAROUSEL MAIN
		$(selected).removeClass().addClass('selected');
		$(selected).prev().removeClass().addClass('prev');
		$(selected).next().removeClass().addClass('next');
		$(selected).prev().prev().removeClass().addClass('prevLeftSecond');
		$(selected).next().next().removeClass().addClass('nextRightSecond');

		switch (hideMode) {
			case 2:
				$(selected).next().next().nextAll().removeClass().addClass('hideRight');
				$(selected).prev().prev().prevAll().removeClass().addClass('hideLeft');
				break;
			case 1:
				$(selected).next().nextAll().removeClass().addClass('hideRight');
				$(selected).prev().prevAll().removeClass().addClass('hideLeft');
				break;
			case 0:
				$(selected).nextAll().removeClass().addClass('hideRight');
				$(selected).prevAll().removeClass().addClass('hideLeft');
				break;
		}
		// - - - Functions that require a reset when '.selected' - - - B E L O W

		// Get images data-info attribute and apply it to top panel
		$('#infoPanel').find('.info-panel__text').text($('.selected img').data('info'));

		// Avoid loop
		$('#carousel img').removeClass('active-effect').off('click');
		$(document).off('keydown.redirectEnter');

		// Wait selection and proceed
		setTimeout(function () {
			$('.keyboard--fade-out').css('display', 'none');
			$('.selected img')
				.addClass('active-effect')
				.on('click', function () {
					window.open($('.selected a').attr('href'), '_blank');
				});
		}, 200);

		// - - - Functions that require a reset when '.selected' - - - A B O V E
	}

	// ACTIVATE M O V E ON CLICKS
	$('#carousel div').click(function () {
		moveToSelected($(this));
	});

	$('#prev').click(function () {
		moveToSelected('prev');
	});

	$('#next').click(function () {
		moveToSelected('next');
	});

	let darkMode = null;
	const darkModeLocal = localStorage.getItem('darkMode');
	if (darkModeLocal === 'true') {
		darkMode = true;
	} else darkMode = false;

	//

	// K E Y B O A R D settings B E L O W - - - - -

	const keyboardImg = document.getElementById('keyboard');
	const keyEnterImg = document.getElementById('enter');
	const imgPrefix = darkMode ? 'images/white/' : 'images/';

	function setKeyboardImage(key) {
		keyboardImg.src = imgPrefix + key + '-key.png?v=2';
	}

	function resetKeyboard() {
		keyboardImg.src = imgPrefix + 'keyboard.png?v=2';
	}

	function resetEnterKey() {
		keyEnterImg.src = imgPrefix + 'enter-key.png?v=2';
	}

	$(document).keydown(function (e) {
		switch (e.which) {
			case 37: // left
				setKeyboardImage('left');
				moveToSelected('prev');
				break;
			case 39: // right
				setKeyboardImage('right');
				moveToSelected('next');
				break;
			case 38: // up
				setKeyboardImage('up');
				if (hideMode < 2) hideMode++;
				moveToSelected($('.selected'));
				break;
			case 40: // down
				setKeyboardImage('down');
				if (hideMode > 0) hideMode--;
				moveToSelected($('.selected'));
				break;
			case 13: // Enter
				keyEnterImg.src = imgPrefix + 'enter-key-active.png';
				window.open($('.selected a').attr('href'), '_blank');
				break;
		}
		setTimeout(resetKeyboard, 500);
		setTimeout(resetEnterKey, 200);
	});

	updateStylesBasedOnDarkMode();
});
