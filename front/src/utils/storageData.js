export const storageData = name => {
	return localStorage.getItem(name)
		? localStorage.getItem(name)
		: sessionStorage.getItem(name)
		? sessionStorage.getItem(name)
		: null;
};
