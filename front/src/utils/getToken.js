export const getToken = () => {
	return localStorage.getItem('token') ? true : sessionStorage.getItem('token') ? true : false;
};
