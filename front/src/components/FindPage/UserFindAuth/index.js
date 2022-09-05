import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, RadioItem, RadioButton, FindIdButton } from './styles';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import {
	useUserFindDispatch,
	useUserFindState,
	MODALAUTH,
	MODALAUTHCONFIRM,
	AUTH,
} from 'context/UserFindContext';
import TextModal from 'components/Modals/TextModal';
import UserFindAuthEmail from '../UserFindAuthEmail';
import UserFindAuthPhone from '../UserFindAuthPhone';
import { useParams } from 'react-router';

const UserFindAuth = () => {
	const titleArray = ['아이디 찾기', '비밀번호 찾기'];
	const pageURL = Object.values(useParams())[0];

	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { showAuth, auth, emailCode, phoneCode, findButtonLoading, modalAuth } = userFind;

	const [findIdButton, setFindIdButton] = useState(false);
	const emailFindRef = useRef();
	const phoneFindRef = useRef();

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	const onChangeRadio = useCallback(e => {
		const { value } = e.target;
		changeDispatch(AUTH, { auth: value });
	}, []);

	const onClickCheckId = useCallback(async () => {
		if (!findIdButton) return;

		if (auth === 'phoneAuth') {
			phoneFindRef.current.secondAuth();
		} else if (auth === 'emailAuth') {
			emailFindRef.current.secondAuth();
		}
	}, [findIdButton, auth, emailCode, userFind]);

	// 모달창 Close
	const onCloseModal = useCallback(() => {
		changeDispatch(MODALAUTH, { modalAuth: false });
		changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: false });
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

	return (
		<>
			<Container>
				<div>
					{(showAuth === 'all' || showAuth === 'phoneAuth') && (
						<RadioItem>
							<RadioButton>
								<label
									htmlFor="phoneAuth"
									className={auth === 'phoneAuth' ? 'radio-label active' : 'radio-label'}
								>
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

							{auth === 'phoneAuth' && <UserFindAuthPhone ref={phoneFindRef}></UserFindAuthPhone>}
						</RadioItem>
					)}

					{(showAuth === 'all' || showAuth === 'emailAuth') && (
						<RadioItem>
							<RadioButton>
								<label
									htmlFor="emailAuth"
									className={auth === 'emailAuth' ? 'radio-label active' : 'radio-label'}
								>
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

							{auth === 'emailAuth' && <UserFindAuthEmail ref={emailFindRef}></UserFindAuthEmail>}
						</RadioItem>
					)}
				</div>

				<FindIdButton>
					<button type="button" onClick={onClickCheckId} className={findIdButton && 'active'}>
						{pageURL === 'id' ? titleArray[0] : titleArray[1]}
						{findButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
					</button>
				</FindIdButton>
				<TextModal
					show={modalAuth}
					onCloseModal={onCloseModal}
					content="인증번호가 발송되었습니다."
				></TextModal>
			</Container>
		</>
	);
};

export default UserFindAuth;
