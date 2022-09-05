import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { RadioDetail, AuthInput } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { PostApi, PostHeaderApi } from 'utils/api';
import {
	EMAIL,
	FINDUSERID,
	useUserFindState,
	useUserFindDispatch,
	MODALAUTH,
	MODALAUTHCONFIRM,
	EMAILCODE,
	FINDBUTTONLOADING,
	EMAILCODEFLAG,
	AUTHSUCCESS,
	EMAILCHECK,
	EMAILAUTHTEXT,
} from 'context/UserFindContext';
import { authError } from 'utils/error';

const UserFindAuthEmail = forwardRef((props, ref) => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { showAuth, findPasswordShowMarkingData, email, emailCode, emailCodeFlag, emailAuthText } =
		userFind;

	const [emailNumberReg, setEmailNumberReg] = useState(true);
	const [emailCodeReg, setEmailCodeReg] = useState(true);
	const [emailNumberLoading, setEmailNumberLoading] = useState(false);

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	const onClickClear = useCallback(e => {
		if (e === 'emailNumber') {
			changeDispatch(EMAIL, { email: '' });
		} else if (e === 'emailCode') {
			changeDispatch(EMAILCODE, { emailCode: '' });
		}
	}, []);

	// onChange 정규식 검사
	const onChangeEmailNumber = useCallback(
		e => {
			const { value } = e.target;
			changeDispatch(EMAIL, { email: value });
			changeDispatch(EMAILAUTHTEXT, { emailAuthText: '이메일을 입력해 주세요.' });

			const regExp =
				/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
			if (regExp.test(value)) setEmailNumberReg(true);
			else setEmailNumberReg(false);
		},
		[email],
	);

	const onChangeCode = useCallback(e => {
		const { value } = e.target;
		if (value.length === 7) return;

		changeDispatch(EMAILCODE, { emailCode: value });
	}, []);

	const onClickAuth = useCallback(() => {
		if (showAuth === 'emailAuth' && email !== findPasswordShowMarkingData) {
			changeDispatch(EMAILAUTHTEXT, { emailAuthText: '회원정보를 다시 확인해주세요.' });
			return setEmailNumberReg(false);
		}

		// 이메일 1차인증
		const params = {
			email,
		};

		setEmailNumberLoading(true);

		PostApi('/api/auth/authEmail', params)
			.then(() => {
				changeDispatch(EMAILCODEFLAG, { emailCodeFlag: true });
				changeDispatch(MODALAUTH, { modalAuth: true });

				setEmailNumberLoading(false);
			})
			.catch(err => {
				console.error('error', err);
			});
	}, [email]);

	useImperativeHandle(ref, () => ({
		// 이메일 2차인증
		async secondAuth() {
			changeDispatch(FINDBUTTONLOADING, { findButtonLoading: true });

			const { email } = userFind;
			const params = {
				email,
				number: emailCode,
			};

			try {
				await PostApi('/api/auth/checkEmail', params)
					.then(res => {
						changeDispatch(AUTHSUCCESS, { authSuccess: true });
						changeDispatch(EMAILCHECK, { emailCheck: res.data.emailCheck });
						setEmailCodeReg(true);
						return res;
					})
					.catch(err => {
						setEmailCodeReg(false);
						authError(err);
						console.error('error', err);
					});
			} catch (error) {
				changeDispatch(FINDBUTTONLOADING, { findButtonLoading: false });
				console.error('error', error);
			}
		},
	}));

	// key 이벤트
	const onKeyUp = useCallback(
		e => {
			if (e.keyCode === 13) onClickAuth();
		},
		[email],
	);

	return (
		<>
			<RadioDetail>
				<div>
					<AuthInput className={emailNumberReg ? '' : 'danger'}>
						<input
							type="email"
							value={email}
							onChange={onChangeEmailNumber}
							onFocus={onChangeEmailNumber}
							onKeyUp={onKeyUp}
							title="이메일 인증"
							placeholder="이메일"
						/>
						{email?.length > 0 && (
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
							disabled={email.length > 0 && emailNumberReg ? false : true}
							style={
								email.length > 0 && emailNumberReg ? { cursor: 'pointer' } : { cursor: 'default' }
							}
							onClick={() => onClickAuth('emailNumber')}
						>
							인증 요청
							{emailNumberLoading && <LoadingIcon className="loading"></LoadingIcon>}
						</button>
					</AuthInput>
					{!emailNumberReg && <p>{emailAuthText}</p>}
				</div>
				{emailCodeFlag && (
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
