import UserAddress from 'components/UserAddress';
import UserEmail from 'components/UserEmail';
import UserPassword from 'components/UserPassword';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as CheckIcon } from 'assets/svg/Check.svg';
import { ReactComponent as LogoIcon } from 'assets/svg/Logo.svg';
import {
	Container,
	SignupSection,
	Header,
	SignupInner,
	SignupContainer,
	SignupCheckBox,
	SignupButton,
} from './styles';
import AuthModal from 'components/AuthModal';
import AuthConfirmModal from 'components/AuthConfirmModal';
import { baseUrl, PostApi } from 'utils/api';
import {
	EMAIL,
	EMAILCHECK,
	PHONECHECK,
	PHONENUMBER,
	useUserDispatch,
	useUserState,
} from 'context/UserContext';
import axios from 'axios';

const Signup = () => {
	const user = useUserState();
	const dispatch = useUserDispatch();

	const [email, setEmail] = useState('');
	const [emailReg, setEmailReg] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordReg, setPasswordReg] = useState(false);
	const [passwordLookButton, setPasswordLookButton] = useState(false);
	const passwordRef = useRef();

	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmReg, setPasswordConfirmReg] = useState(false);
	const [passwordConfirmLookButton, setPasswordConfirmLookButton] = useState(false);
	const passwordConfirmRef = useRef();

	const [auth, setAuth] = useState('emailAuth');
	const [authNumber, setauthNumber] = useState('');
	const [authNumberReg, setauthNumberReg] = useState(false);
	const [authNumberBtnReg, setauthNumberBtnReg] = useState(false);
	const [authStage, setAuthStage] = useState(1);

	const [checkValue, setCheckValue] = useState({
		checkAll: false,
		checkAgree: false,
		checkTerms: false,
		checkYouth: false,
		checkSns: false,
		count: 0,
	});

	const [deliveryInfo, setDeliveryInfo] = useState({
		name: '',
		mobile1: '',
		mobile2: '',
		mobile3: '',
		phone: true,
		phone1: '',
		phone2: '',
		phone3: '',
		address1: '',
		address2: '',
		address3: '',
	});

	const [modalAuth, setModalAuth] = useState(false);
	const [modalAuthConfirm, setModalAuthConfirm] = useState(false);

	const [signUpBtn, setSignUpBtn] = useState(false);

	const onClickClear = useCallback(() => {
		setauthNumber('');
	}, [authNumber]);

	const onChangeRadio = useCallback(
		e => {
			setAuth(e.target.value);
			setauthNumber('');
			setauthNumberReg(true);
			setAuthStage(1);
		},
		[auth],
	);

	// 본인인증
	const onClickAuth = useCallback(
		e => {
			if (authNumberReg) {
				// 이메일 1차인증
				if (auth === 'emailAuth' && authStage === 1) {
					const params = {
						email: authNumber,
					};

					PostApi('/api/auth/authEmail', params)
						.then(() => {
							const payload = {
								email: authNumber,
							};

							dispatch({ type: EMAIL, payload });
							setModalAuth(true);
						})
						.catch(err => {
							console.error('error', err);
						});
				}

				// 이메일 2차인증
				else if (auth === 'emailAuth' && authStage === 2) {
					const { email } = user;

					const params = {
						email,
						number: authNumber,
					};

					PostApi('/api/auth/checkEmail', params)
						.then(res => {
							setModalAuthConfirm(true);

							const payload = {
								emailCheck: res.data.emailCheck,
							};
							dispatch({ type: EMAILCHECK, payload });
						})
						.catch(err => {
							setauthNumberBtnReg(true);
							console.error('error', err);
						});
				}

				// 휴대폰 1차인증
				else if (auth === 'phoneAuth' && authStage === 1) {
					const params = {
						phoneNumber: authNumber.replaceAll('-', ''),
					};

					PostApi('/api/auth/sendSMS', params)
						.then(() => {
							const payload = {
								phoneNumber: authNumber.replaceAll('-', ''),
							};

							dispatch({ type: PHONENUMBER, payload });
							setModalAuth(true);
						})
						.catch(err => {
							console.error('error', err);
						});
				}

				// 휴대폰 2차인증
				else if (auth === 'phoneAuth' && authStage === 2) {
					const { phoneNumber } = user;

					const params = {
						phoneNumber,
						code: authNumber,
					};

					PostApi('/api/auth/checkSMS', params)
						.then(res => {
							setModalAuthConfirm(true);

							const payload = {
								phoneCheck: res.data.phoneCheck,
							};
							dispatch({ type: PHONECHECK, payload });
						})
						.catch(err => {
							setauthNumberBtnReg(false);
							console.error('error', err);
						});
				}
			}
		},
		[authNumberReg, authStage, auth, authNumber],
	);

	const onClickCheck = useCallback(
		e => {
			const name = e.target.name;

			setCheckValue(prevState => ({
				...prevState,
				[name]: !checkValue[name],
				count: !checkValue[name] ? checkValue.count + 1 : checkValue.count - 1,
			}));
		},
		[checkValue],
	);

	const onClickCheckAll = useCallback(() => {
		if (checkValue.count < 4) {
			setCheckValue(() => ({
				checkAll: true,
				checkAgree: true,
				checkTerms: true,
				checkYouth: true,
				checkSns: true,
				count: 4,
			}));
		} else {
			setCheckValue(() => ({
				checkAll: false,
				checkAgree: false,
				checkTerms: false,
				checkYouth: false,
				checkSns: false,
				count: 0,
			}));
		}
	}, [checkValue]);

	const onSubmitForm = useCallback(
		async e => {
			e.preventDefault();

			const { email, emailCheck, phoneNumber } = user;

			const params = {
				loginId: email,
				password: password,
				agreement: checkValue.checkSns ? '1' : '0',
				questionType: '1',
				questionAnswer: 'none',
				address: `(${deliveryInfo.address1})${deliveryInfo.address2}${deliveryInfo.address3}`,
				email: email,
				phoneNumber: phoneNumber,
			};

			axios
				.post(`${baseUrl}/api/auth/signup`, params, {
					headers: {
						'Content-Type': 'application/json',
						emailCheck,
					},
				})
				.then(res => {
					switch (res.status) {
						case 200:
							return console.log('success');

						default:
							console.log(res);
							break;
					}
				})
				.catch(err => {
					switch (err.response.status) {
						case 400:
							return alert('이메일 인증 또는 휴대폰 인증이 완료되지 않은 사용자입니다');
						case 401:
							return alert('이미 사용중인 아이디 입니다');
						case 402:
							return alert('이미 사용중인 이메일 입니다.');
						case 500:
							return console.log('서버에러');
						default:
							console.log(err);
							break;
					}
				});
		},
		[email, password, auth, authNumber, checkValue, deliveryInfo],
	);

	const onCloseModal = useCallback(() => {
		setModalAuth(false);
		setModalAuthConfirm(false);

		if (authStage === 1) {
			setAuthStage(2);
			setauthNumber('');
		} else if (authStage === 2) {
			setAuthStage(3);
			setauthNumber('');
		}
	}, [authStage]);

	useEffect(() => {
		if (checkValue.count === 4) {
			setCheckValue(prevState => ({
				...prevState,
				checkAll: true,
			}));
		} else {
			setCheckValue(prevState => ({
				...prevState,
				checkAll: false,
			}));
		}
	}, [checkValue.count]);

	// onChange 정규식 검사
	const onChangeEmail = useCallback(e => {
		setEmail(e.target.value);

		const regExp = /^[a-z]+[a-z0-9]{3,10}$/g;
		if (regExp.test(e.target.value)) setEmailReg(true);
		else setEmailReg(false);
	}, []);

	const onChangePassword = useCallback(e => {
		setPassword(e.target.value);

		const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,25}$/;
		if (regExp.test(e.target.value)) setPasswordReg(true);
		else setPasswordReg(false);
	}, []);

	const onChangePasswordConfirm = useCallback(
		e => {
			setPasswordConfirm(e.target.value);

			if (password === e.target.value) setPasswordConfirmReg(true);
			else setPasswordConfirmReg(false);
		},
		[password],
	);

	const onChangeauthNumber = useCallback(
		e => {
			setauthNumber(e.target.value);

			let regExp;

			if (authStage === 1) {
				if (auth === 'emailAuth')
					regExp =
						/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
				else if (auth === 'phoneAuth') regExp = /^[0-9\b -]{0,13}$/;
			} else if (authStage === 2) {
				regExp = /\d{6}/g;
			}

			if (regExp.test(e.target.value)) setauthNumberReg(true);
			else setauthNumberReg(false);
		},
		[auth, authStage],
	);

	// 가입하기 버튼 활성화
	useEffect(() => {
		if (
			emailReg &&
			passwordReg &&
			passwordConfirmReg &&
			authStage == 3 &&
			deliveryInfo.name &&
			deliveryInfo.mobile1 &&
			deliveryInfo.mobile2 &&
			deliveryInfo.mobile3 &&
			deliveryInfo.address1 &&
			deliveryInfo.address2 &&
			checkValue.checkAgree &&
			checkValue.checkTerms &&
			checkValue.checkYouth
		) {
			if (!deliveryInfo.phone) setSignUpBtn(true);
			else if (deliveryInfo.phone1 && deliveryInfo.phone2 && deliveryInfo.phone3)
				setSignUpBtn(true);
			else setSignUpBtn(false);
		} else setSignUpBtn(false);
	}, [emailReg, passwordReg, passwordConfirmReg, deliveryInfo, authStage, checkValue]);

	// 자동으로 하이픈 넣기
	useEffect(() => {
		if (auth === 'phoneAuth') {
			if (authNumber.length === 10) {
				setauthNumber(authNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
			}
			if (authNumber.length === 13) {
				setauthNumber(authNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
			}
		}
	}, [auth, authNumber]);

	// 약관 모달 이벤트
	let win;
	function openPop(open) {
		if (win != null) {
			win.close();
		}

		if (open === 'agree')
			win = window.open(
				'/signup/agreement/agree',
				'개인정보 수집 및 이용 동의 팝업',
				'width=500px,height=800px,scrollbars=yes',
			);
		else if (open === 'terms') {
			win = window.open(
				'/signup/agreement/terms',
				'무신사, 무신사 스토어 이용 악관',
				'width=500px,height=800px,scrollbars=yes',
			);
		} else if (open === 'sns') {
			win = window.open(
				'/signup/agreement/sns',
				'마케팅 활용 및 광고성 정보 수신 동의',
				'width=500px,height=800px,scrollbars=yes',
			);
		}

		win.focus();
	}

	return (
		<Container>
			<SignupSection>
				<Header>
					<LogoIcon />
				</Header>
				<SignupInner>
					<form onSubmit={onSubmitForm}>
						<UserEmail
							email={email}
							setEmail={setEmail}
							onChangeEmail={onChangeEmail}
							placeholder="영문, 숫자 4-11자"
							reg={emailReg}
							setReg={setEmailReg}
							title={true}
						></UserEmail>
						<UserPassword
							password={password}
							setPassword={setPassword}
							onChnage={onChangePassword}
							lookBtn={passwordLookButton}
							setLookBtn={setPasswordLookButton}
							dom={passwordRef}
							reg={passwordReg}
							placeholder="숫자, 영문, 특수문자 조합 최소 8자"
							title={true}
							validation={true}
						></UserPassword>
						<UserPassword
							password={passwordConfirm}
							setPassword={setPasswordConfirm}
							onChnage={onChangePasswordConfirm}
							lookBtn={passwordConfirmLookButton}
							setLookBtn={setPasswordConfirmLookButton}
							dom={passwordConfirmRef}
							reg={passwordConfirmReg}
							placeholder="비밀번호 재입력"
							title={false}
							validation={true}
						></UserPassword>

						<SignupContainer>
							<div className="all-check">
								<label htmlFor="emailAuth" className={auth === 'emailAuth' && 'active'}>
									이메일
								</label>
								<input
									type="radio"
									value="emailAuth"
									id="emailAuth"
									onChange={onChangeRadio}
									name="auth"
								/>

								<label htmlFor="phoneAuth" className={auth === 'phoneAuth' && 'active'}>
									휴대폰
								</label>
								<input
									type="radio"
									value="phoneAuth"
									id="phoneAuth"
									onChange={onChangeRadio}
									name="auth"
								/>
							</div>
							<label>
								<span>필수 입력</span>
							</label>

							<div className="email-check">
								<input
									className={auth}
									type={auth === 'phoneAuth' ? 'tel' : 'email'}
									value={authNumber}
									onChange={onChangeauthNumber}
									maxLength={authStage === 2 ? 6 : auth === 'phoneAuth' && 13}
									disabled={authStage === 3 ? true : false}
								/>
								{authNumber?.length > 0 && (
									<button type="button" onClick={() => onClickClear()}>
										<CancelIcon />
									</button>
								)}
								<button
									type="button"
									disabled={authStage === 3 ? true : false}
									className={authStage === 3 ? 'auth-confirm success' : 'auth-confirm'}
									onClick={() => onClickAuth()}
								>
									{authStage === 1 ? '본인인증' : authStage === 2 ? '번호확인' : '인증완료'}
								</button>
							</div>

							{authStage === 1 &&
								auth === 'emailAuth' &&
								!authNumberReg &&
								authNumber?.length > 0 && <p>이메일 주소가 올바르지 않습니다.</p>}
							{authStage === 1 &&
								auth === 'phoneAuth' &&
								!authNumberReg &&
								authNumber?.length > 0 && <p>휴대폰 번호가 올바르지 않습니다.</p>}
							{authStage === 2 && authNumberBtnReg && <p>인증번호가 정확하지 않습니다.</p>}
							<p className="helper-text">계정 분실 시 본인인증 정보로 활용됩니다.</p>
						</SignupContainer>

						<UserAddress props={{ deliveryInfo, setDeliveryInfo }}></UserAddress>

						<SignupCheckBox>
							<div className="all-check">
								<label htmlFor="checkAll" className={checkValue.checkAll && 'active'}>
									<input
										onClick={e => onClickCheckAll(e)}
										style={{ display: 'none' }}
										id="checkAll"
										type="checkbox"
										name="checkAll"
										value={checkValue.checkAll}
									/>
									약관 전체 동의하기
								</label>
							</div>
							<div className="check">
								<label htmlFor="checkAgree">
									<input
										onClick={e => onClickCheck(e)}
										style={{ display: 'none' }}
										id="checkAgree"
										type="checkbox"
										name="checkAgree"
										value={checkValue.checkAgree}
									/>
									<CheckIcon stroke={checkValue.checkAgree ? '#0078ff' : '#D1D1D1'} />
									[필수] 개인정보 수집 및 이용 동의
								</label>
								<a target="_blank" onClick={() => openPop('agree')}>
									자세히
								</a>

								{/* <a href="signup/agreement/privacy-usage" target="_blank"></a> */}
							</div>
							<div className="check">
								<label htmlFor="checkTerms">
									<input
										onClick={e => onClickCheck(e)}
										style={{ display: 'none' }}
										id="checkTerms"
										type="checkbox"
										name="checkTerms"
										value={checkValue.checkTerms}
									/>
									<CheckIcon stroke={checkValue.checkTerms ? '#0078ff' : '#D1D1D1'} />
									[필수] 무신사, 무신사 스토어 이용 악관
								</label>
								<a target="_blank" onClick={() => openPop('terms')}>
									자세히
								</a>
							</div>
							<div className="check">
								<label htmlFor="checkYouth">
									<input
										onClick={e => onClickCheck(e)}
										style={{ display: 'none' }}
										id="checkYouth"
										type="checkbox"
										name="checkYouth"
										value={checkValue.checkYouth}
									/>
									<CheckIcon stroke={checkValue.checkYouth ? '#0078ff' : '#D1D1D1'} />
									[필수] 만 14세 미만 가입 제한
								</label>
							</div>
							<div className="check">
								<label htmlFor="checkSns">
									<input
										onClick={e => onClickCheck(e)}
										style={{ display: 'none' }}
										id="checkSns"
										type="checkbox"
										name="checkSns"
										value={checkValue.checkSns}
									/>
									<CheckIcon stroke={checkValue.checkSns ? '#0078ff' : '#D1D1D1'} />
									[선택] 마케팅 활용 및 광고성 정보 수신 동의
								</label>
								<a target="_blank" onClick={() => openPop('sns')}>
									자세히
								</a>
							</div>
						</SignupCheckBox>

						<SignupButton>
							<button
								type="submit"
								disabled={!signUpBtn}
								className={signUpBtn ? 'signup-button__item active' : 'signup-button__item'}
							>
								본인인증하고 가입하기
							</button>
						</SignupButton>
					</form>
				</SignupInner>
			</SignupSection>
			<AuthModal show={modalAuth} onCloseModal={onCloseModal}></AuthModal>
			<AuthConfirmModal show={modalAuthConfirm} onCloseModal={onCloseModal}></AuthConfirmModal>
		</Container>
	);
};

export default Signup;
