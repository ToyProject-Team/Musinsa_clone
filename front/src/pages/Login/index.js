import UserEmail from 'components/UserEmail';
import UserPassword from 'components/UserPassword';
import useInput from 'hooks/useInput';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GetApi, PostApi } from 'utils/api';
import { getData } from 'utils/getData';
import {
	Container,
	LoginSection,
	Header,
	LoginInner,
	LoginButton,
	LoginMember,
	LoginCheck,
	FindLogin,
	KakaoLogIn,
	SignupLink,
} from './styles';
import { ReactComponent as KakaoIcon } from 'assets/svg/Kakao.svg';
import Kakao from 'pages/Kakao';
import { URLquery } from 'utils/URLquery';

const LogIn = () => {
	const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
	const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
	console.log(REST_API_KEY, REDIRECT_URI);
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

	const navigate = useNavigate();
	const location = useLocation();

	const [login, setLogin] = useState(getData());

	const [email, onChangeEmail, setEmail] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [passwordLookButton, setPasswordLookButton] = useState(false);
	const passwordRef = useRef();

	const [autoLoginCheck, setAutoLoginCheck] = useState(false);
	const [keyframesClass, setKeyframesClass] = useState('');

	// auto Login Toggle button
	const toggleAutoLogin = useCallback(
		e => {
			const value = e.target.className;
			setAutoLoginCheck(v => !v);

			if (value === 'hide') setKeyframesClass('active');
			else setKeyframesClass('hide');
		},
		[setAutoLoginCheck, setKeyframesClass],
	);

	// onClick login button event
	const onSubmitForm = useCallback(
		async e => {
			e.preventDefault();

			if (!email || !email.trim()) return alert('아이디를 입력해 주세요.');
			if (!password || !password.trim()) return alert('비밀번호를 입력해 주세요.');

			const params = {
				loginId: email,
				password: password,
			};
			await PostApi('/api/auth/signin', params)
				.then(result => {
					switch (result.status) {
						case 200:
							if (autoLoginCheck) {
								localStorage.setItem('data', JSON.stringify(result.data));
								sessionStorage.removeItem('data');
							} else {
								sessionStorage.setItem('data', JSON.stringify(result.data));
								localStorage.removeItem('data');
							}

							setLogin(true);
							const query = URLquery(location);
							console.log(query.redirect);
							if (query.redirect) return navigate(query.redirect);

							return navigate('/');

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
		},
		[email, password, autoLoginCheck],
	);

	const KakaoLogin = useCallback(async () => {
		// const KAKAO_AUTH_URL = await GetApi('/api/auth/kakao');

		window.location.href = KAKAO_AUTH_URL;
	}, []);

	if (login) {
		return <Navigate to="/" />;
	}

	return (
		<Container>
			<LoginSection>
				<Header>로그인</Header>
				<LoginInner>
					<form onSubmit={onSubmitForm}>
						<UserEmail
							email={email}
							setEmail={setEmail}
							onChangeEmail={onChangeEmail}
							placeholder="아이디"
							title={false}
						></UserEmail>

						<UserPassword
							password={password}
							setPassword={setPassword}
							onChnage={onChangePassword}
							lookBtn={passwordLookButton}
							setLookBtn={setPasswordLookButton}
							dom={passwordRef}
							placeholder="비밀번호"
							title={false}
							validation={false}
						></UserPassword>
						<LoginButton>
							<button type="submit" className="login-button__item">
								로그인
							</button>
						</LoginButton>
						<LoginMember>
							<LoginCheck>
								<label
									onClick={e => toggleAutoLogin(e)}
									className={autoLoginCheck ? 'active' : 'hide'}
								>
									자동로그인
								</label>
								<div className={keyframesClass}>
									개인 정보 보호를 위해 본인 기기에서만 이용해주세요.
								</div>
							</LoginCheck>
							<FindLogin>
								<li>
									<Link to="/find/id">아이디 찾기</Link>
								</li>
								<li>
									<Link to="/find/password">비밀번호 찾기</Link>
								</li>
							</FindLogin>
						</LoginMember>
					</form>
					<div>
						<KakaoLogIn
							className="login-button__item login-button__item--kakao"
							// onClick={KakaoLogin}
							href={KAKAO_AUTH_URL}
						>
							<KakaoIcon />
							카카오 로그인
						</KakaoLogIn>
					</div>
				</LoginInner>
				<SignupLink>
					<Link to="/signup">회원가입</Link>
				</SignupLink>
			</LoginSection>
		</Container>
	);
};

export default LogIn;
