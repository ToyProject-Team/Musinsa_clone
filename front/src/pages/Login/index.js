import UserEmail from 'components/UserEmail';
import UserFindModal from 'components/UserFindModal';
import UserPassword from 'components/UserPassword';
import useInput from 'hooks/useInput';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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

const LogIn = () => {
	const [login, setLogin] = useState(getData());

	const [email, onChangeEmail, setEmail] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [passwordLookButton, setPasswordLookButton] = useState(false);
	const passwordRef = useRef();

	const [modalFind, setModalFind] = useState(false);

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
				passwordCheck: password,
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

							return <Navigate to="/" />;

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

	const onClickFind = useCallback(e => {
		setModalFind(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setModalFind(false);
	}, []);

	const KakaoLogin = useCallback(async () => {
		const KAKAO_AUTH_URL = await GetApi('/api/auth/kakao');

		window.location.href = KAKAO_AUTH_URL.data.url;
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
							onClick={KakaoLogin}
						>
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
					<Link to="/signup">회원가입</Link>
				</SignupLink>
			</LoginSection>

			<UserFindModal show={modalFind} onCloseModal={onCloseModal}></UserFindModal>
		</Container>
	);
};

export default LogIn;
