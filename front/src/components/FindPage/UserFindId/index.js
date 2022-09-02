import React, { useCallback, useEffect } from 'react';
import qs from 'qs';
import UserFindAuth from '../UserFindAuth';
import UserFindIdFinishModal from 'components/Modals/UserFindIdFinishModal';
import {
	FINDBUTTONLOADING,
	FINDUSERID,
	INIT,
	MODALAUTHCONFIRM,
	useUserFindDispatch,
	useUserFindState,
} from 'context/UserFindContext';
import { authError } from 'utils/error';
import { PostHeaderApi } from 'utils/api';
import { useState } from 'react';

const UserFindId = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { auth, emailCheck, phoneCheck, findUserId, modalAuthConfirm, authSuccess } = userFind;

	const [init, setInit] = useState('false');

	// useContext 초기화
	useEffect(() => {
		dispatch({ type: INIT });
		setInit(true);
	}, []);

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	// 모달창 Close
	const onCloseModal = useCallback(() => {
		changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: false });
	}, []);

	// 아이디 찾기
	useEffect(() => {
		if (init === true) {
			if (auth === 'emailAuth' && authSuccess && emailCheck) {
				// 이메일로 아이디 찾기
				PostHeaderApi('/api/auth/findId', 'emailCheck', emailCheck)
					.then(res => {
						switch (res.status) {
							case 200:
								if (!res.data.loginId) {
									changeDispatch(FINDBUTTONLOADING, { findButtonLoading: false });
									return alert('회원정보로 가입된 아이디가 없습니다.');
								}

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
						console.log(err);
						authError(err);
					});
			} else if (auth === 'phoneAuth' && authSuccess && phoneCheck) {
				// 휴대전화로 아이디 찾기
				PostHeaderApi('/api/auth/findId', 'phoneCheck', phoneCheck)
					.then(res => {
						switch (res.status) {
							case 200:
								if (!res.data.loginId) {
									changeDispatch(FINDBUTTONLOADING, { findButtonLoading: false });
									return alert('회원정보로 가입된 아이디가 없습니다.');
								}

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
			}
		}
	}, [authSuccess, emailCheck, phoneCheck]);

	return (
		<>
			<UserFindAuth></UserFindAuth>
			<UserFindIdFinishModal
				show={modalAuthConfirm}
				onCloseModal={onCloseModal}
				title="아이디 찾기 결과"
				content={`${findUserId}`}
				rest={'비밀번호'}
			></UserFindIdFinishModal>
		</>
	);
};

export default UserFindId;
