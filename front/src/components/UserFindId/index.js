import React, { useCallback, useEffect, useState } from 'react';
import { Container, RadioItem, RadioButton, RadioDetail, AuthInput, FindIdButton } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import useInput from 'hooks/useInput';

const UserFindId = () => {
	const [auth, setAuth] = useState('phoneAuth');

	const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneNumberReg, setPhoneNumberReg] = useState(true);
	const [phoneCode, setPhoneCode] = useState('');
	const [phoneCodeReg, setPhoneCodeReg] = useState(true);

	const [emailNumber, setEmailNumber] = useState('');
	const [emailNumberReg, setEmailNumberReg] = useState(true);
	const [emailCode, setEmailCode] = useState('');
	const [emailCodeReg, setEmailCodeReg] = useState(true);

	const onChangeRadio = useCallback(
		e => {
			setAuth(e.target.value);
		},
		[auth],
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

		const regExp = /^[a-z]+[a-z0-9]{3,10}$/g;
		if (regExp.test(e.target.value)) setEmailNumberReg(true);
		else setEmailNumberReg(false);
	}, []);

	const onChangeCode = useCallback(e => {
		const { value, name } = e.target;

		if (name === 'phoneCode') {
			setPhoneCode(value);
		} else if (name === 'emailCode') {
			setEmailCode(value);
		}
	}, []);

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
											maxlength="13"
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
										<button type="button" className="authBtn">
											인증 요청
											<LoadingIcon className="loading"></LoadingIcon>
										</button>
									</AuthInput>
									{!phoneNumberReg && <p>휴대전화 번호를 입력해 주세요.</p>}
								</div>
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
											maxlength="5"
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
									<p>인증번호가 일치하지 않습니다.</p>
								</div>
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
										<button type="button" className="authBtn">
											인증 요청
											<LoadingIcon className="loading"></LoadingIcon>
										</button>
									</AuthInput>
									{!emailNumberReg && <p>이메일을 입력해 주세요.</p>}
								</div>
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
											maxlength="5"
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
									<p>인증번호가 일치하지 않습니다.</p>
								</div>
							</RadioDetail>
						)}
					</RadioItem>
				</div>

				<FindIdButton>
					<button
						type="button"
						class="login-button__item login-button__item--blue"
						id="searchIdButton"
						disabled=""
					>
						아이디 찾기
						<LoadingIcon className="loading"></LoadingIcon>
					</button>
				</FindIdButton>
			</Container>
		</>
	);
};

export default UserFindId;
