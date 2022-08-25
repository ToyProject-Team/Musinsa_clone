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
