export const getData = () => {
	return localStorage.getItem('data')
		? JSON.parse(localStorage.getItem('data'))
		: sessionStorage.getItem('data')
		? JSON.parse(sessionStorage.getItem('data'))
		: null;
};
