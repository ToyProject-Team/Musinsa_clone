import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetQueryApi, KakaoGetQueryApi, PostHeaderApi } from 'utils/api';
import { URLquery } from 'utils/URLquery';

const Kakao = () => {
	const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
	const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
	const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

	// calllback으로 받은 인가코드
	const navigate = useNavigate();
	const location = useLocation();
	const { code } = URLquery(location);
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
			const params = `token=${token}`;

			const isMember = await KakaoGetQueryApi(
				'http://141.164.48.244/api/auth/kakao/callback',
				params,
			);
			const { alreadyMember, encryptionCode } = isMember.data;

			if (alreadyMember) {
				await PostHeaderApi('/api/auth/signin', 'encryptioncode', encryptionCode)
					.then(result => {
						switch (result.status) {
							case 200:
								localStorage.setItem('data', JSON.stringify(result.data));
								sessionStorage.removeItem('data');

								const query = URLquery(location);
								console.log(query.redirect);
							// if (query.redirect) return navigate(query.redirect);

							// return navigate('/');

							default:
								break;
						}
					})
					.catch(result => {
						switch (result.response.status) {
							case 401:
								alert('존재하지않거나 아이디가 틀렸습니다.');
								break;

							case 402:
								alert('패스워드가 일치하지 않습니다');
								break;

							case 500:
								console.log('서버에러');
								break;

							default:
								break;
						}
					});
			} else {
				navigate(`/signup?kakao=${encryptionCode}&token=${token}`);
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
