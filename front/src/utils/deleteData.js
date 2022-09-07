export const deleteData = () => {
	return localStorage.removeItem('data')
		? localStorage.removeItem('data')
		: sessionStorage.removeItem('data')
		? sessionStorage.removeItem('data')
		: null;
};
