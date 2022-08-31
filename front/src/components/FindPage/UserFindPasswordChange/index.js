import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, FindPasswordButton } from 'components/FindPage/UserFindPassword/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import qs from 'qs';
import { useUserFindDispatch, useUserFindState } from 'context/UserFindContext';
import UserPassword from 'components/Input/UserPassword';
import TextModal from 'components/Modals/TextModal';
import { PostApi } from 'utils/api';

const UserFindPasswordChange = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { auth, emailCheck, phoneCheck, findUserId, modalAuthConfirm, authSuccess } = userFind;

	const [password, setPassword] = useState('');
	const [passwordReg, setPasswordReg] = useState(true);
	const [passwordLookButton, setPasswordLookButton] = useState(false);
	const passwordRef = useRef();

	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmReg, setPasswordConfirmReg] = useState(true);
	const [passwordConfirmLookButton, setPasswordConfirmLookButton] = useState(false);
	const passwordConfirmRef = useRef();

	const [passwordButton, setPasswordButton] = useState(false);
	const [passwordButtonLoading, setPasswordButtonLoading] = useState(false);

	const [modalAuth, setModalAuth] = useState(false);

	const location = useLocation();
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});
	// console.log(query);

	// onChange 정규식 검사
	const onChangePassword = useCallback(e => {
		setPassword(e.target.value);

		const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,25}$/;
		if (regExp.test(e.target.value)) setPasswordReg(true);
		else setPasswordReg(false);
	}, []);

	const onChangePasswordConfirm = useCallback(
		e => {
			console.log(e);
			setPasswordConfirm(e.target.value);

			if (password === e.target.value) setPasswordConfirmReg(true);
			else setPasswordConfirmReg(false);
		},
		[password],
	);

	const onCloseModal = useCallback(() => {
		setModalAuth(false);
	}, []);

	// 버튼 활성화
	useEffect(() => {
		if (passwordReg && password.length > 0) {
			setPasswordButton(true);
		} else if (!passwordReg && password.length === 0) {
			setPasswordButton(false);
		} else if (passwordConfirmReg && passwordConfirm.length > 0) {
			setPasswordButton(true);
		} else if (!passwordConfirmReg && passwordConfirm.length === 0) {
			setPasswordButton(false);
		}

		if (password !== passwordConfirm) {
			setPasswordButton(false);
		}
	}, [passwordReg, passwordConfirmReg]);

	const onClickChangePassword = useCallback(async () => {
		if (!passwordButton) return;

		const params = {
			password,
		};
		PostApi('/api/auth/changePassword', params);

		console.log(1);
	}, [passwordButton]);

	return (
		<Container>
			<div>
				<h3>새로운 비밀번호를 입력해주세요.</h3>
				<p>
					아이디 : <strong>hello</strong>
				</p>
				<div>
					<UserPassword
						password={password}
						setPassword={setPassword}
						onChange={onChangePassword}
						onFocus={onChangePassword}
						lookBtn={passwordLookButton}
						setLookBtn={setPasswordLookButton}
						dom={passwordRef}
						reg={passwordReg}
						placeholder="숫자, 영문, 특수문자 조합 최소 8자"
						title={false}
					></UserPassword>
					{!passwordReg && <p className="danger-text">8~30자 이내로 입력해 주십시오.</p>}

					<UserPassword
						password={passwordConfirm}
						setPassword={setPasswordConfirm}
						onChange={onChangePasswordConfirm}
						onFocus={onChangePasswordConfirm}
						lookBtn={passwordConfirmLookButton}
						setLookBtn={setPasswordConfirmLookButton}
						dom={passwordConfirmRef}
						reg={passwordConfirmReg}
						placeholder="비밀번호 재입력"
						title={false}
					></UserPassword>

					{!passwordConfirmReg && <p className="danger-text">비밀번호가 다릅니다.</p>}
				</div>
				<FindPasswordButton>
					<button
						type="button"
						onClick={onClickChangePassword}
						className={passwordButton && 'active'}
					>
						비밀번호 재설정하기
						{passwordButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
					</button>
				</FindPasswordButton>
			</div>
			<TextModal
				show={modalAuth}
				onCloseModal={onCloseModal}
				content="비밀번호가 변경되었습니다."
			></TextModal>
		</Container>
	);
};

export default UserFindPasswordChange;
