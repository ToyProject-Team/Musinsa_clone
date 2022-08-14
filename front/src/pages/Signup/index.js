import UserAddress from 'components/UserAddress';
import UserEmail from 'components/UserEmail';
import UserFind from 'components/UserFind';
import UserPassword from 'components/UserPassword';
import useInput from 'hooks/useInput';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as CheckIcon } from 'assets/svg/Check.svg';
import {
	Container,
	SignupSection,
	Header,
	SignupInner,
	SignupContainer,
	SignupAddress,
	LookButton,
	SignupCheckBox,
	SignupButton,
} from './styles';
import AuthModal from 'components/AuthModal';
import AuthConfirmModal from 'components/AuthConfirmModal';
import { useUserState, useUserDispatch, LOGIN } from 'context/UserContext';

const Signup = () => {
	const [email, onChangeEmail, setEmail] = useInput('');

	const [password, onChangePassword, setPassword] = useInput('');
	const [passwordLookButton, setPasswordLookButton] = useState(false);
	const passwordRef = useRef();

	const [passwordConfirm, onChangePasswordConfirm, setPasswordConfirm] = useInput('');
	const [passwordConfirmLookButton, setPasswordConfirmLookButton] = useState(false);
	const passwordConfirmRef = useRef();

	const [auth, setAuth] = useState('emailAuth');
	const [authNumber, onChangeauthNumber, setauthNumber] = useInput('');
	const [authStage, setAuthStage] = useState(1);

	const [answer, onChangeAnswer, setAnswer] = useInput('');
	const [question, onChangeQuestion, setQuestion] = useInput('1');

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

	const onClickClear = useCallback(() => {
		setauthNumber('');
	}, [authNumber]);

	const onChangeRadio = useCallback(
		e => {
			setAuth(e.target.value);
			setAuthStage(1);
		},
		[auth],
	);

	const onClickAuth = useCallback(e => {
		if (authStage === 1) setModalAuth(true);
		else if (authStage === 2) setModalAuthConfirm(true);
	}, []);

	const onChangeAddress = useCallback(e => {
		const name = e.target.name;
		const value = e.target.value;

		setDeliveryInfo(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

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

	const onSubmitForm = useCallback(e => {
		e.preventDefault();
		console.log(e);
	}, []);

	const onCloseModal = useCallback(() => {
		setModalAuth(false);
		setModalAuthConfirm(false);

		if (authStage === 1) setAuthStage(2);
		else if (authStage === 2) setAuthStage(3);
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

	return (
		<Container>
			<SignupSection>
				<Header>
					<svg
						width="95"
						height="16"
						viewBox="0 0 95 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
					>
						<title>MUSINSA</title>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M39.7649 8.92841C41.4239 9.54022 42.38 9.89279 42.38 11.4667C42.38 12.911 41.3584 13.8445 39.7376 13.8445C38.1163 13.8445 36.9616 12.8665 36.9616 11.2445V11.022H34.608C34.608 14.1776 36.8508 16 39.7376 16C42.6686 16 44.7337 13.8445 44.7337 11.3777C44.7337 10.1111 44.3339 9.311 43.668 8.59989C43.0019 7.88901 42.18 7.44459 40.8033 6.93334L39.9149 6.60025C37.9608 5.86657 37.3391 5.31127 37.3391 4.20002C37.3391 2.93318 38.2717 2.15545 39.7152 2.15545C41.1364 2.15545 42.1358 2.93318 42.1358 4.35561V4.64443H44.4894C44.4894 1.79979 42.6909 0 39.7152 0C36.4731 0 34.9853 2.24442 34.9853 4.2445C34.9853 5.35532 35.3407 6.15562 35.9182 6.86672C36.4952 7.57805 37.2947 8.00011 38.4717 8.44452L39.5376 8.84445L39.7649 8.92841ZM13.812 0.222249L8.21601 9.26678L2.64239 0.222249H0V15.7778H2.22042V3.51087L7.19448 11.5778H9.23753L14.2339 3.51087V15.7778H16.4543V0.222249H13.812ZM29.7098 9.26664V0.222332H31.9527V9.24407C31.9527 13.489 29.5322 15.9999 25.8904 15.9999C22.2488 15.9999 19.8284 13.489 19.8284 9.24407V0.222332H22.071V9.26664C22.071 12.0889 23.5366 13.8221 25.8904 13.8221C28.2444 13.8221 29.7098 12.0889 29.7098 9.26664ZM47.5609 15.7777H49.826V0.222332H47.5609V15.7777ZM55.4884 15.7777V3.73338L63.5713 15.7777H66.0584V0.222332H63.8378V12.3331L55.7326 0.222332H53.2678V15.7777H55.4884ZM76.4865 11.4667C76.4865 9.8929 75.5304 9.54027 73.8718 8.92854L73.6442 8.84445L72.5785 8.44452C71.4015 8.00011 70.602 7.57805 70.0247 6.86672C69.4473 6.15562 69.0919 5.35532 69.0919 4.2445C69.0919 2.24442 70.5799 0 73.822 0C76.7975 0 78.5962 1.79979 78.5962 4.64443H76.2424V4.35561C76.2424 2.93318 75.243 2.15545 73.822 2.15545C72.3785 2.15545 71.4459 2.93318 71.4459 4.20002C71.4459 5.31127 72.0676 5.86657 74.0217 6.60025L74.9099 6.93334C76.2866 7.44459 77.1084 7.88901 77.7746 8.59989C78.4407 9.311 78.8403 10.1111 78.8403 11.3777C78.8403 13.8445 76.7751 16 73.8444 16C70.9574 16 68.7146 14.1776 68.7146 11.022H71.0684V11.2445C71.0684 12.8665 72.2231 13.8445 73.8444 13.8445C75.465 13.8445 76.4865 12.911 76.4865 11.4667ZM90.8477 11.4442H83.9195L82.1652 15.7774H79.8778L86.1622 0.221854H88.6049L94.8889 15.7774H92.6017L90.8477 11.4442ZM87.3835 2.88884L84.8077 9.24431H89.9593L87.3835 2.88884Z"
							fill="black"
						></path>
					</svg>
				</Header>
				<SignupInner>
					<form onSubmit={onSubmitForm}>
						<UserEmail
							email={email}
							setEmail={setEmail}
							onChangeEmail={onChangeEmail}
							placeholder="영문, 숫자 5-11자"
							title={true}
						></UserEmail>
						<UserPassword
							password={password}
							setPassword={setPassword}
							onChnage={onChangePassword}
							lookBtn={passwordLookButton}
							setLookBtn={setPasswordLookButton}
							dom={passwordRef}
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
							placeholder="비밀번호 재입력"
							title={false}
							validation={true}
						></UserPassword>

						<SignupContainer>
							<div className="all-check">
								<label for="emailAuth" className={auth === 'emailAuth' && 'active'}>
									이메일
								</label>
								<input
									type="radio"
									value="emailAuth"
									id="emailAuth"
									onChange={onChangeRadio}
									name="auth"
								/>

								<label for="phoneAuth" className={auth === 'phoneAuth' && 'active'}>
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
									type="email"
									value={authNumber}
									onChange={onChangeauthNumber}
									className={auth}
								/>
								{authNumber?.length > 0 && (
									<button type="button" onClick={() => onClickClear()}>
										<CancelIcon />
									</button>
								)}
								<button
									className={authStage === 3 ? 'auth-confirm success' : 'auth-confirm'}
									onClick={() => onClickAuth()}
								>
									{authStage === 1 ? '본인인증' : authStage === 2 ? '번호확인' : '인증완료'}
								</button>
							</div>

							<p>이메일 주소가 올바르지 않습니다.</p>
							<p className="helper-text">계정 분실 시 본인인증 정보로 활용됩니다.</p>
						</SignupContainer>

						<UserFind
							props={{
								answer,
								onChangeAnswer,
								setAnswer,
								question,
								onChangeQuestion,
								setQuestion,
							}}
						></UserFind>
						<UserAddress props={{ deliveryInfo, setDeliveryInfo, onChangeAddress }}></UserAddress>

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
								<a href="signup/agreement/privacy-usage" target="_blank">
									자세히
								</a>
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
								<a href="signup/agreement/privacy-usage" target="_blank">
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
								<a href="signup/agreement/privacy-usage" target="_blank">
									자세히
								</a>
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
								<a href="signup/agreement/privacy-usage" target="_blank">
									자세히
								</a>
							</div>
						</SignupCheckBox>

						<SignupButton>
							<button type="submit" className="signup-button__item active">
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
