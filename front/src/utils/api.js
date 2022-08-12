import axios from 'axios';

const baseUrl = process.env.REACT_APP_HOST_URL;

export const GetApi = async PATH => {
	const result = await axios.post(baseUrl + PATH);

	return result;
};

export const PostApi = async (PATH, params) => {
	console.log(JSON.stringify(params));
	const result = await axios.post(baseUrl + PATH, params);

	return result;
};
