import axios from 'axios';

export const baseUrl = process.env.REACT_APP_HOST_URL;

/**
 *
 * @param URL주소 PATH
 * @param body값 params
 * @returns result 데이터
 */
export const GetApi = async PATH => {
	const result = await axios.post(baseUrl + PATH, {
		headers: { 'Content-Type': 'application/json' },
	});

	return result;
};

/**
 *
 * @param URL주소 PATH
 * @param body값 params
 * @returns result 데이터
 */

export const PostApi = async (PATH, params) => {
	const result = await axios.post(baseUrl + PATH, params, {
		headers: { 'Content-Type': 'application/json' },
	});

	return result;
};