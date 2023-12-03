function isLocalStorageAvailable() {
	try {
		localStorage.setItem('test', 'test');
		localStorage.removeItem('test');
		return true;
	} catch (e) {
		return false;
	}
}

function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function reloadPageForFirstTimeVisitors() {
	if (isLocalStorageAvailable()) {
		if (!localStorage.getItem('hasVisited')) {
			console.log('First visit detected using LocalStorage');
			localStorage.setItem('hasVisited', 'true');
			localStorage.setItem('reloadTimestamp', new Date().toISOString());
			location.reload(true);
		} else {
			console.log('JS Scripts reloaded || Not the first visit (LocalStorage)');
		}
	} else {
		if (!getCookie('hasVisited')) {
			console.log('First visit detected using Cookies');
			setCookie('hasVisited', 'true', 5);
			setCookie('reloadTimestamp', new Date().toISOString(), 1);
			location.reload(true);
		} else {
			console.log('JS Scripts reloaded || Not the first visit (Cookies)');
		}
	}
}

reloadPageForFirstTimeVisitors();
