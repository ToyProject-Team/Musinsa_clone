import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { RadioDetail, AuthInput } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { PostApi, PostHeaderApi } from 'utils/api';
import {
	MODALAUTH,
	PHONECODE,
	PHONENUMBER,
	FINDUSERID,
	useUserFindDispatch,
	useUserFindState,
	FINDBUTTONLOADING,
	MODALAUTHCONFIRM,
	PHONECODEFLAG,
} from 'context/UserFindContext';
import { authError } from 'utils/error';

const UserFindAuthPhone = forwardRef((props, ref) => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { phoneNumber, phoneCode, phoneCodeFlag } = userFind;

	const [phoneNumberReg, setPhoneNumberReg] = useState(true);
	const [phoneCodeReg, setPhoneCodeReg] = useState(true);
	const [phoneNumberLoading, setPhoneNumberLoading] = useState(false);

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	const onClickClear = useCallback(e => {
		if (e === 'phoneNumber') {
			changeDispatch(PHONENUMBER, { phoneNumber: '' });
		} else if (e === 'phoneCode') {
			changeDispatch(PHONECODE, { phoneCode: '' });
		}
	}, []);

	// onChange 정규식 검사
	const onChangePhoneNumber = useCallback(
		e => {
			const { value } = e.target;
			const onlyNumber = value.replace(/[^0-9]/g, '');
			changeDispatch(PHONENUMBER, { phoneNumber: value });

			const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
			if (regExp.test(onlyNumber)) setPhoneNumberReg(true);
			else setPhoneNumberReg(false);
		},
		[phoneNumber],
	);

	const onChangeCode = useCallback(e => {
		const { value } = e.target;

		if (value.length === 7) return;

		changeDispatch(PHONECODE, { phoneCode: value });
	}, []);

	const onClickAuth = useCallback(
		e => {
			// 휴대폰 1차인증
			const params = {
				phoneNumber: phoneNumber.replaceAll('-', ''),
			};

			setPhoneNumberLoading(true);

			PostApi('/api/auth/sendSMS', params)
				.then(() => {
					changeDispatch(PHONENUMBER, { phoneNumber: phoneNumber.replaceAll('-', '') });
					changeDispatch(PHONECODEFLAG, { phoneCodeFlag: true });
					changeDispatch(MODALAUTH, { modalAuth: true });

					setPhoneNumberLoading(false);
				})
				.catch(err => {
					console.error('error', err);
				});
		},
		[phoneNumber],
	);

	useImperativeHandle(ref, () => ({
		// 휴대폰 2차인증
		async secondAuth() {
			changeDispatch(FINDBUTTONLOADING, { findButtonLoading: true });

			const { phoneNumber } = userFind;
			const params = {
				phoneNumber,
				code: phoneCode,
			};

			try {
				const result = await PostApi('/api/auth/checkSMS', params)
					.then(res => {
						setPhoneCodeReg(true);
						return res;
					})
					.catch(err => {
						setPhoneCodeReg(false);
						authError(err);
						console.error('error', err);
					});

				await userFindId(result.data.phoneCheck);
			} catch (error) {
				console.log(error);
			}
		},
	}));

	const userFindId = useCallback(
		phoneCheck => {
			// 아이디 찾기
			PostHeaderApi('/api/auth/findId', 'phoneCheck', phoneCheck)
				.then(res => {
					switch (res.status) {
						case 200:
							changeDispatch(FINDUSERID, { findUserId: res.data.loginId });
							changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: true });
							changeDispatch(FINDBUTTONLOADING, { findButtonLoading: false });
							break;

						default:
							console.log(res);
							break;
					}
				})
				.catch(err => {
					authError(err);
				});
		},
		[userFind],
	);

	// 자동으로 하이픈 넣기
	useEffect(() => {
		if (phoneNumber.length === 10) {
			changeDispatch(PHONENUMBER, {
				phoneNumber: phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
			});
		}
		if (phoneNumber.length === 13) {
			changeDispatch(PHONENUMBER, {
				phoneNumber: phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
			});
		}
	}, [phoneNumber]);

	return (
		<>
			<RadioDetail>
				<div>
					<AuthInput className={phoneNumberReg ? '' : 'danger'}>
						<input
							type="tel"
							value={phoneNumber}
							onChange={onChangePhoneNumber}
							onFocus={onChangePhoneNumber}
							pattern="[0-9]+"
							inputMode="numberic"
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
							{phoneNumberLoading && <LoadingIcon className="loading"></LoadingIcon>}
						</button>
					</AuthInput>
					{!phoneNumberReg && <p>휴대전화 번호를 입력해 주세요.</p>}
				</div>
				{phoneCodeFlag && (
					<div>
						<AuthInput className={phoneCodeReg ? '' : 'danger'}>
							<input
								type="number"
								value={phoneCode}
								onChange={onChangeCode}
								pattern="[0-9]*"
								inputMode="numberic"
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
		</>
	);
});

export default UserFindAuthPhone;
