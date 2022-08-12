import axios from 'axios';

const baseUrl = process.env.REACT_APP_HOST_URL;

export const GetApi = async PATH => {
	const result = await axios.post(baseUrl + PATH);

	return result;
};

export const PostApi = async (PATH, params) => {
	const result = await axios.post(baseUrl + PATH, params, {
		headers: { 'Content-Type': 'application/json' },
	});

	return result;
};
