import UserEmail from 'components/UserEmail';
import UserPassword from 'components/UserPassword';
import { LOGIN, useUserDispatch, useUserState } from 'context/UserContext';
import useInput from 'hooks/useInput';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
	Container,
	LoginSection,
	Header,
	LoginInner,
	LoginContainer,
	LookButton,
	LoginButton,
	LoginMember,
	LoginCheck,
	FindLogin,
	KakaoLogIn,
	SignupLink,
} from './styles';

const LogIn = () => {
	const user = useUserState();
	const dispatch = useUserDispatch();

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
		e => {
			e.preventDefault();

			if (!email || !email.trim()) return alert('아이디를 입력해 주세요.');
			if (!password || !password.trim()) return alert('비밀번호를 입력해 주세요.');

			// axios(success => login, failed => alter('아이디 또는 패스워드를 확인하세요.'))

			// 로그인 예시
			if (email === 'qwe' && password === 'qwe') {
				const payload = {
					login: false,
					token: '이곳에 로그인시 발급받는 token 값이 들어갑니다.',
				};

				dispatch({ type: LOGIN, payload });
			}
		},
		[email, password, user],
	);

	if (user?.login) {
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
									<Link to="id">아이디 찾기</Link>
								</li>
								<li>
									<Link to="password">비밀번호 찾기</Link>
								</li>
							</FindLogin>
						</LoginMember>
					</form>
					<div>
						<KakaoLogIn className="login-button__item login-button__item--kakao">
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="login-button__item__logo"
							>
								<title>kakao 로고</title>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M15 7C10.029 7 6 10.129 6 13.989C6 16.389 7.559 18.505 9.932 19.764L8.933 23.431C8.845 23.754 9.213 24.013 9.497 23.826L13.874 20.921C14.243 20.958 14.618 20.978 15 20.978C19.971 20.978 24 17.849 24 13.989C24 10.129 19.971 7 15 7Z"
									fill="black"
								></path>
							</svg>
							카카오 로그인
						</KakaoLogIn>
					</div>
				</LoginInner>
				<SignupLink>
					<a href="/signup">회원가입</a>
				</SignupLink>
			</LoginSection>
		</Container>
	);
};

export default LogIn;
