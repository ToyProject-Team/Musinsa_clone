import axios from 'axios';
import { array } from 'prop-types';

export const baseUrl = process.env.REACT_APP_HOST_URL;

/**
 *
 * @param URL주소 PATH
 * @param body값 params
 * @returns result 데이터
 */
export const GetApi = async PATH => {
	const result = await axios.get(baseUrl + PATH, {
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
export const GetTokenApi = async (PATH, params) => {
	const result = await axios.get(baseUrl + PATH, {
		headers: { 'Content-Type': 'application/json', Authorization: params },
	});

	return result;
};

/**
 *
 * @param URL주소 PATH
 * @param query params
 * @returns result 데이터
 */
export const GetQueryApi = async (PATH, params) => {
	const result = await axios.get(`${PATH}?${params}`, {
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

export const PostQueryApi = async (PATH, params) => {
	let answer = '';
	let cnt = 0;
	for (let i in params) {
		if (++cnt > 1) answer += '&';
		answer += i + '=';
		answer += params[i] + '';
	}

	const result = await axios.get(`${baseUrl}${PATH}?${answer}`, {
		headers: { 'Content-Type': 'application/json' },
	});

	return result;
};

/**
 *
 * @param URL주소 PATH
 * @param header이름 header
 * @param header값 params
 * @returns result 데이터
 */
export const PostHeaderApi = async (PATH, header, params) => {
	const result = await axios.post(
		baseUrl + PATH,
		{},
		{
			headers: { 'Content-Type': 'application/json', [header]: params },
		},
	);

	return result;
};

/**
 *
 * @param URL주소 PATH
 * @param header이름 header
 * @param header값 params
 * @returns result 데이터
 */
export const PostHeaderBodyApi = async (PATH, data, header, params) => {
	const result = await axios.post(baseUrl + PATH, data, {
		headers: { 'Content-Type': 'application/json', [header]: params },
	});

	return result;
};

/**
 *
 * @param URL주소 PATH
 * @param header이름 header
 * @param header값 params
 * @returns result 데이터
 */
export const DeleteHeaderBodyApi = async (PATH, data, header, params) => {
	const result = await axios.delete(baseUrl + PATH, {
		headers: {
			'Content-Type': 'application/json',
			[header]: `${params}`,
		},
		data,
	});

	return result;
};
