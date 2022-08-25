import React, { useCallback, useEffect, useState } from 'react';
import { Container, RadioItem, RadioButton, RadioDetail, AuthInput, FindIdButton } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import useInput from 'hooks/useInput';
import { baseUrl, PostApi } from 'utils/api';
import {
	EMAIL,
	EMAILCHECK,
	PHONECHECK,
	PHONENUMBER,
	useUserDispatch,
	useUserState,
} from 'context/UserContext';
import AuthModal from 'components/TextModal';
import axios from 'axios';

const UserFindId = () => {
	const user = useUserState();
	const dispatch = useUserDispatch();

	const [auth, setAuth] = useState('phoneAuth');

	const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneNumberReg, setPhoneNumberReg] = useState(true);
	const [phoneCode, setPhoneCode] = useState('');
	const [phoneCodeToggle, setPhoneCodeToggle] = useState(false);
	const [phoneCodeReg, setPhoneCodeReg] = useState(true);

	const [emailNumber, setEmailNumber] = useState('');
	const [emailNumberReg, setEmailNumberReg] = useState(true);
	const [emailCode, setEmailCode] = useState('');
	const [emailCodeToggle, setEmailCodeToggle] = useState(false);
	const [emailCodeReg, setEmailCodeReg] = useState(true);

	const [findIdButton, setFindIdButton] = useState(false);

	const [modalAuth, setModalAuth] = useState(false);
	const [modalAuthConfirm, setModalAuthConfirm] = useState(false);

	const onChangeRadio = useCallback(
		e => {
			const { value } = e.target;
			setAuth(value);
		},
		[phoneCode, emailCode],
	);

	const onClickClear = useCallback(e => {
		if (e === 'phoneNumber') {
			setPhoneNumber('');
		} else if (e === 'phoneCode') {
			setPhoneCode('');
		} else if (e === 'emailNumber') {
			setEmailNumber('');
		} else if (e === 'emailCode') {
			setEmailCode('');
		}
	}, []);

	// onChange 정규식 검사
	const onChangePhoneNumber = useCallback(
		e => {
			const { value } = e.target;
			const onlyNumber = value.replace(/[^0-9]/g, '');
			setPhoneNumber(onlyNumber);

			const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
			if (regExp.test(onlyNumber)) setPhoneNumberReg(true);
			else setPhoneNumberReg(false);
		},
		[phoneNumber],
	);

	const onChangeEmailNumber = useCallback(e => {
		setEmailNumber(e.target.value);

		const regExp =
			/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
		if (regExp.test(e.target.value)) setEmailNumberReg(true);
		else setEmailNumberReg(false);
	}, []);

	const onChangeCode = useCallback(e => {
		const { value, name } = e.target;

		if (value.length === 7) return;

		if (name === 'phoneCode') {
			setPhoneCode(value);
		} else if (name === 'emailCode') {
			setEmailCode(value);
		}
	}, []);

	const onClickAuth = useCallback(
		e => {
			if (e === 'phoneNumber') {
				// 휴대폰 1차인증
				const params = {
					phoneNumber: phoneNumber.replaceAll('-', ''),
				};

				PostApi('/api/auth/sendSMS', params)
					.then(() => {
						setPhoneCodeToggle(true);

						const payload = {
							phoneNumber: phoneNumber.replaceAll('-', ''),
						};

						dispatch({ type: PHONENUMBER, payload });
						setModalAuth(true);
					})
					.catch(err => {
						console.error('error', err);
					});
			} else {
				// 이메일 1차인증
				const params = {
					email: emailNumber,
				};

				PostApi('/api/auth/authEmail', params)
					.then(() => {
						setEmailCodeToggle(true);

						const payload = {
							email: emailNumber,
						};

						dispatch({ type: EMAIL, payload });
						setModalAuth(true);
					})
					.catch(err => {
						console.error('error', err);
					});
			}
		},
		[phoneNumber, emailNumber],
	);

	const onClickFindId = useCallback(async () => {
		if (!findIdButton) return;

		if (auth === 'phoneAuth') {
			// 휴대폰 2차인증
			const { phoneNumber } = user;

			const params = {
				phoneNumber,
				code: phoneCode,
			};

			await PostApi('/api/auth/checkSMS', params)
				.then(res => {
					setModalAuthConfirm(true);

					const payload = {
						phoneCheck: res.data.phoneCheck,
					};
					dispatch({ type: PHONECHECK, payload });
				})
				.catch(err => {
					setPhoneCodeReg(false);
					console.error('error', err);
				});
		} else {
			// 이메일 2차인증
			const { email } = user;

			const params = {
				email,
				number: emailCode,
			};

			await PostApi('/api/auth/checkEmail', params)
				.then(res => {
					console.log(res);
					// const payload = {
					// 	emailCheck: res.data.emailCheck,
					// };
					// dispatch({ type: EMAILCHECK, payload });
				})
				.catch(err => {
					setEmailCodeReg(false);
					console.error('error', err);
				});
		}

		const { emailCheck, phoneCheck } = user;
		const params = {};

		console.log(user);
		// await axios
		// 	.post(`${baseUrl}/api/auth/findId`, params, {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			emailCheck,
		// 			phoneCheck,
		// 		},
		// 	})
		// 	.then(res => {
		// 		switch (res.status) {
		// 			case 200:
		// 				console.log(res.data);
		// 				setModalAuthConfirm(true);
		// 				return console.log('success');

		// 			default:
		// 				console.log(res);
		// 				break;
		// 		}
		// 	})
		// 	.catch(err => {
		// 		switch (err.response.status) {
		// 			case 400:
		// 				return alert('이메일 인증 또는 휴대폰 인증이 완료되지 않은 사용자입니다');
		// 			case 401:
		// 				return alert('이미 사용중인 아이디 입니다');
		// 			case 402:
		// 				return alert('이미 사용중인 이메일 입니다.');
		// 			case 500:
		// 				return console.log('서버에러');
		// 			default:
		// 				console.log(err);
		// 				break;
		// 		}
		// 	});
	}, [findIdButton, auth, phoneCode, emailCode]);

	const onCloseModal = useCallback(() => {
		setModalAuth(false);
		setModalAuthConfirm(false);
	}, [findIdButton]);

	// 버튼 활성화
	useEffect(() => {
		if (auth === 'emailAuth' && emailCode.length === 6) {
			setFindIdButton(true);
		} else if (auth === 'emailAuth' && emailCode.length < 6) {
			setFindIdButton(false);
		} else if (auth === 'phoneAuth' && phoneCode.length === 6) {
			setFindIdButton(true);
		} else if (auth === 'phoneAuth' && !phoneCode.length < 6) {
			setFindIdButton(false);
		}
	}, [auth, phoneCode, emailCode]);

	// 자동으로 하이픈 넣기
	useEffect(() => {
		if (auth === 'phoneAuth') {
			if (phoneNumber.length === 10) {
				setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
			}
			if (phoneNumber.length === 11) {
				setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
			}
		}
	}, [auth, phoneNumber]);

	return (
		<>
			<Container>
				<div>
					<RadioItem>
						<RadioButton>
							<label htmlFor="phoneAuth" className={auth === 'phoneAuth' && 'active'}>
								휴대전화
							</label>
							<input
								type="radio"
								value="phoneAuth"
								id="phoneAuth"
								onChange={onChangeRadio}
								name="auth"
							/>
						</RadioButton>
						{auth === 'phoneAuth' && (
							<RadioDetail>
								<div>
									<AuthInput className={phoneNumberReg ? '' : 'danger'}>
										<input
											type="tel"
											value={phoneNumber}
											onChange={onChangePhoneNumber}
											onFocus={onChangePhoneNumber}
											pattern="[0-9]+"
											inputmode="numberic"
											title="휴대전화 인증"
											placeholder="휴대전화 (-없이)"
											maxLength="13"
										/>
										{phoneNumber?.length > 0 && (
											<button
												type="button"
												className="clearBtn"
												onClick={() => onClickClear('phoneNumber')}
											>
												<CancelIcon></CancelIcon>
											</button>
										)}
										<button
											type="button"
											className="authBtn"
											disabled={phoneNumber.length > 0 && phoneNumberReg ? false : true}
											style={
												phoneNumber.length > 0 && phoneNumberReg
													? { cursor: 'pointer' }
													: { cursor: 'default' }
											}
											onClick={() => onClickAuth('phoneNumber')}
										>
											인증 요청
											<LoadingIcon className="loading"></LoadingIcon>
										</button>
									</AuthInput>
									{!phoneNumberReg && <p>휴대전화 번호를 입력해 주세요.</p>}
								</div>
								{phoneCodeToggle && (
									<div>
										<AuthInput className={phoneCodeReg ? '' : 'danger'}>
											<input
												type="number"
												value={phoneCode}
												onChange={onChangeCode}
												pattern="[0-9]*"
												inputmode="numberic"
												title="인증번호 입력"
												placeholder="인증번호"
												maxLength={6}
												name="phoneCode"
											/>
											{phoneCode?.length > 0 && (
												<button
													type="button"
													className="clearBtn"
													onClick={() => onClickClear('phoneCode')}
												>
													<CancelIcon></CancelIcon>
												</button>
											)}
										</AuthInput>
										{!phoneCodeReg && <p>인증번호가 일치하지 않습니다.</p>}
									</div>
								)}
							</RadioDetail>
						)}
					</RadioItem>

					<RadioItem>
						<RadioButton>
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
						</RadioButton>
						{auth === 'emailAuth' && (
							<RadioDetail>
								<div>
									<AuthInput className={emailNumberReg ? '' : 'danger'}>
										<input
											type="email"
											value={emailNumber}
											onChange={onChangeEmailNumber}
											onFocus={onChangeEmailNumber}
											title="이메일 인증"
											placeholder="이메일"
										/>
										{emailNumber?.length > 0 && (
											<button
												type="button"
												className="clearBtn"
												onClick={() => onClickClear('emailNumber')}
											>
												<CancelIcon></CancelIcon>
											</button>
										)}
										<button
											type="button"
											className="authBtn"
											disabled={emailNumber.length > 0 && emailNumberReg ? false : true}
											style={
												emailNumber.length > 0 && emailNumberReg
													? { cursor: 'pointer' }
													: { cursor: 'default' }
											}
											onClick={() => onClickAuth('emailNumber')}
										>
											인증 요청
											<LoadingIcon className="loading"></LoadingIcon>
										</button>
									</AuthInput>
									{!emailNumberReg && <p>이메일을 입력해 주세요.</p>}
								</div>
								{emailCodeToggle && (
									<div>
										<AuthInput className={emailCodeReg ? '' : 'danger'}>
											<input
												type="number"
												value={emailCode}
												onChange={onChangeCode}
												pattern="[0-9]*"
												inputmode="numberic"
												title="인증번호 입력"
												placeholder="인증번호"
												maxLength="6"
												name="emailCode"
											/>
											{emailCode?.length > 0 && (
												<button
													type="button"
													className="clearBtn"
													onClick={() => onClickClear('emailCode')}
												>
													<CancelIcon></CancelIcon>
												</button>
											)}
										</AuthInput>
										{!emailCodeReg && <p>인증번호가 일치하지 않습니다.</p>}
									</div>
								)}
							</RadioDetail>
						)}
					</RadioItem>
				</div>

				<FindIdButton>
					<button type="button" onClick={onClickFindId} className={findIdButton && 'active'}>
						아이디 찾기
						<LoadingIcon className="loading"></LoadingIcon>
					</button>
				</FindIdButton>
				<AuthModal
					show={modalAuth}
					onCloseModal={onCloseModal}
					content="인증번호가 발송되었습니다."
				></AuthModal>
				<AuthModal
					show={modalAuthConfirm}
					onCloseModal={onCloseModal}
					content="아이디는 홍길동 입니다."
				></AuthModal>
			</Container>
		</>
	);
};

export default UserFindId;
