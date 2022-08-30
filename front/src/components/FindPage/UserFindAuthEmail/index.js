import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { RadioDetail, AuthInput } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { baseUrl, PostApi } from 'utils/api';
import {
	EMAIL,
	FINDUSERID,
	useUserFindState,
	useUserFindDispatch,
	MODALAUTH,
	MODALAUTHCONFIRM,
	EMAILCODE,
	FINDBUTTONLOADING,
} from 'context/UserFindContext';
import axios from 'axios';

const UserFindAuthEmail = forwardRef((props, ref) => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();

	const [emailNumber, setEmailNumber] = useState('');
	const [emailNumberReg, setEmailNumberReg] = useState(true);
	const [emailCode, setEmailCode] = useState('');
	const [emailCodeToggle, setEmailCodeToggle] = useState(false);
	const [emailCodeReg, setEmailCodeReg] = useState(true);
	const [emailNumberLoading, setEmailNumberLoading] = useState(false);

	const onClickClear = useCallback(e => {
		if (e === 'emailNumber') {
			setEmailNumber('');
		} else if (e === 'emailCode') {
			setEmailCode('');
		}
	}, []);

	// onChange 정규식 검사
	const onChangeEmailNumber = useCallback(e => {
		setEmailNumber(e.target.value);

		const regExp =
			/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
		if (regExp.test(e.target.value)) setEmailNumberReg(true);
		else setEmailNumberReg(false);
	}, []);

	const onChangeCode = useCallback(e => {
		const { value } = e.target;

		if (value.length === 7) return;

		const payload = {
			emailCode: value,
		};

		dispatch({ type: EMAILCODE, payload });

		setEmailCode(value);
	}, []);

	const onClickAuth = useCallback(() => {
		// 이메일 1차인증
		const params = {
			email: emailNumber,
		};

		setEmailNumberLoading(true);

		PostApi('/api/auth/authEmail', params)
			.then(() => {
				setEmailCodeToggle(true);

				const payload = {
					email: emailNumber,
					modalAuth: true,
				};

				dispatch({ type: EMAIL, payload });
				dispatch({ type: MODALAUTH, payload });
				setEmailNumberLoading(false);
			})
			.catch(err => {
				console.error('error', err);
			});
	}, [emailNumber]);

	useImperativeHandle(ref, () => ({
		async secondAuth() {
			const payload = {
				findButtonLoading: true,
			};
			dispatch({ type: FINDBUTTONLOADING, payload });

			// 이메일 2차인증
			const { email } = userFind;

			const params = {
				email,
				number: emailCode,
			};

			try {
				const result = await PostApi('/api/auth/checkEmail', params)
					.then(res => {
						setEmailCodeReg(true);
						return res;
					})
					.catch(err => {
						setEmailCodeReg(false);
						console.error('error', err);
					});

				await userFindId(result.data.emailCheck);
			} catch (error) {
				console.log(error);
			}
		},
	}));

	const userFindId = useCallback(
		emailCheck => {
			axios
				.post(
					`${baseUrl}/api/auth/findId`,
					{},
					{
						headers: {
							'Content-Type': 'application/json',
							emailCheck,
						},
					},
				)
				.then(res => {
					switch (res.status) {
						case 200:
							const payload = {
								findUserId: res.data.loginId,
								modalAuthConfirm: true,
								findButtonLoading: false,
							};
							dispatch({ type: FINDUSERID, payload });
							dispatch({ type: MODALAUTHCONFIRM, payload });
							dispatch({ type: FINDBUTTONLOADING, payload });

							break;

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
		[userFind],
	);

	return (
		<>
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
							{emailNumberLoading && <LoadingIcon className="loading"></LoadingIcon>}
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
								inputMode="numberic"
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
		</>
	);
});

export default UserFindAuthEmail;
