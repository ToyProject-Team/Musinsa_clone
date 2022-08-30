import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, RadioItem, RadioButton, FindIdButton } from './styles';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import {
	useUserFindDispatch,
	useUserFindState,
	FINDBUTTONFLAG,
	MODALAUTH,
	MODALAUTHCONFIRM,
	FINDBUTTONLOADING,
	INIT,
} from 'context/UserFindContext';
import TextModal from 'components/Modals/TextModal';
import UserFindAuthFinishModal from 'components/Modals/UserFindAuthFinishModal';
import UserFindAuthEmail from '../UserFindAuthEmail';
import UserFindAuthPhone from '../UserFindAuthPhone';

const UserFindId = () => {
	// useContext 초기화
	useEffect(() => {
		dispatch({ type: INIT });
	}, []);

	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { emailCode, phoneCode, findUserId, findButtonLoading, modalAuth, modalAuthConfirm } =
		userFind;

	const [auth, setAuth] = useState('phoneAuth');

	const [findIdButton, setFindIdButton] = useState(false);
	const emailFindRef = useRef();
	const phoneFindRef = useRef();

	const onChangeRadio = useCallback(e => {
		const { value } = e.target;
		setAuth(value);
	}, []);

	// 아이디 찾기 클릭 이벤트
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
		const payload = {
			modalAuth: false,
			modalAuthConfirm: false,
		};

		dispatch({ type: MODALAUTH, payload });
		dispatch({ type: MODALAUTHCONFIRM, payload });
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
			const payload = {
				findButtonFlag: false,
			};
			dispatch({ type: FINDBUTTONFLAG, payload });

			setFindIdButton(false);
		}
	}, [auth, phoneCode, emailCode]);

	return (
		<>
			<Container>
				<div>
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
				</div>

				<FindIdButton>
					<button type="button" onClick={onClickCheckId} className={findIdButton && 'active'}>
						아이디 찾기
						{findButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
					</button>
				</FindIdButton>
				<TextModal
					show={modalAuth}
					onCloseModal={onCloseModal}
					content="인증번호가 발송되었습니다."
				></TextModal>
				<UserFindAuthFinishModal
					show={modalAuthConfirm}
					onCloseModal={onCloseModal}
					title="아이디 찾기 결과"
					content={`${findUserId}`}
					rest={'비밀번호'}
				></UserFindAuthFinishModal>
			</Container>
		</>
	);
};

export default UserFindId;
