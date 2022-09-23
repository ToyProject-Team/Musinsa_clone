import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { GetQueryApi, KakaoGetQueryApi } from 'utils/api';

const Kakao = () => {
	const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
	const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
	const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

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
			console.log(REDIRECT_URI);
			// access token 가져오기
			const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
			const token = res.data.access_token;
			console.log(token);
			const params = `token=${token}`;

			const isMember = await KakaoGetQueryApi(
				'http://141.164.48.244/api/auth/kakao/callback',
				params,
			);
			const { alreadyMember, encryptionCode } = isMember.data;

			if (alreadyMember) {
				history(`/`);
			} else {
				history(`/signup?kakao=${encryptionCode}&token=${token}`);
			}
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
