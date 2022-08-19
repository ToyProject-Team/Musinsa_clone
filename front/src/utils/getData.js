export const getToken = () => {
	return localStorage.getItem('data') ? true : sessionStorage.getItem('data') ? true : false;
};
