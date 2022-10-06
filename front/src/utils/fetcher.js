import axios from 'axios';
import { baseUrl } from './api';

const fetcher = (url, token) =>
	axios
		.get(baseUrl + url, {
			withCredentials: true,
			headers: {
				Authorization: `${token}`,
			},
		})
		.then(response => response.data);

export default fetcher;
