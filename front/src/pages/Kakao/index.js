import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Kakao = () => {
	const REST_API_KEY = '4046f853b8826bbb808cfe399ce9b3f6';
	const REDIRECT_URI = 'http://localhost:3000/kakao/oauth/callback';
	const CLIENT_SECRET = 'cgzjVzop5f7TnoSXG7FxhLCS6lMbVlCE';

	// calllback으로 받은 인가코드
	const history = useNavigate();
	const code = new URL(window.location.href).searchParams.get('code');
	const getToken = async () => {
		const payload = qs.stringify({
			grant_type: 'authorization_code',
			client_id: REST_API_KEY,
			redirect_uri: REDIRECT_URI,
			code: code,
			client_secret: CLIENT_SECRET,
		});
		try {
			// access token 가져오기
			const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);

			// Kakao Javascript SDK 초기화
			await window.Kakao.init(REST_API_KEY);
			// access token 설정
			await window.Kakao.Auth.setAccessToken(res.data.access_token);
			console.log(123123, res);
			// history('/signup');
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getToken();
	}, []);
	return null;
};

export default Kakao;
