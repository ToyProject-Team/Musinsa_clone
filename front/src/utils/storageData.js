export const storageData = name => {
	return localStorage.getItem(name)
		? JSON.parse(localStorage.getItem(name))
		: sessionStorage.getItem(name)
		? JSON.parse(sessionStorage.getItem(name))
		: null;
};
