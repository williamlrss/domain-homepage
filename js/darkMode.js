const htmlElement = document.documentElement;

function getDarkModeFromLocalStorage() {
	return localStorage.getItem('darkMode') === 'true';
}

function updateDarkMode(isDarkMode) {
	const keyboard = document.getElementById('keyboard');
	const enterKey = document.getElementById('enter');

	keyboard.src = isDarkMode ? 'images/white/keyboard.png' : 'images/keyboard.png';
	enterKey.src = isDarkMode ? 'images/white/enter-key.png' : 'images/enter-key.png';
}

function checkDarkMode() {
	const darkMode = document.getElementById('toggle').checked;
	const previousDarkMode = getDarkModeFromLocalStorage();

	// Compare current state with the stored one and reload if different
	if (darkMode !== previousDarkMode) {
		localStorage.setItem('darkMode', darkMode);
		updateDarkMode(darkMode);
		location.reload(true);
	}
}

document.addEventListener('DOMContentLoaded', event => {
	const darkMode = getDarkModeFromLocalStorage();
	document.getElementById('toggle').checked = darkMode;
	updateDarkMode(darkMode);
});

document.getElementById('toggle').addEventListener('change', checkDarkMode);
