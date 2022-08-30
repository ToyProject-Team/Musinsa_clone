import React, { useCallback, useEffect, useState } from 'react';
import {
	AuthInput,
	Container,
	FindIdButton,
	RadioButton,
	RadioDetail,
	RadioItem,
} from 'components/FindPage/UserFindAuth/styles';
import { useParams, useLocation, Routes, Route, Link } from 'react-router-dom';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import qs from 'qs';
import useInput from 'hooks/useInput';
import UserFindAuth from '../UserFindAuth';
import UserFindAuthFinishModal from 'components/Modals/UserFindAuthFinishModal';
import {
	AUTHSUCCESS,
	FINDBUTTONLOADING,
	FINDUSERID,
	INIT,
	MODALAUTHCONFIRM,
	useUserFindDispatch,
	useUserFindState,
} from 'context/UserFindContext';
import { authError } from 'utils/error';
import { PostHeaderApi } from 'utils/api';

const UserFindId = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { auth, emailCheck, phoneCheck, findUserId, modalAuthConfirm, authSuccess } = userFind;

	// useContext 초기화
	useEffect(() => {
		console.log(123);
		dispatch({ type: INIT });
	}, []);

	const location = useLocation();
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});
	console.log(query);

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	// 모달창 Close
	const onCloseModal = useCallback(() => {
		changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: false });
	}, []);

	// 아이디 찾기
	useEffect(() => {
		if (auth === 'emailAuth' && authSuccess && emailCheck !== '') {
			// 이메일로 아이디 찾기
			PostHeaderApi('/api/auth/findId', 'emailCheck', emailCheck)
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
					console.log(err);
					authError(err);
				});
		} else if (auth === 'phoneAuth' && authSuccess && phoneCheck !== '') {
			// 휴대전화로 아이디 찾기
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
		}
	}, [authSuccess, emailCheck, phoneCheck]);

	return (
		<>
			<UserFindAuth></UserFindAuth>
			<UserFindAuthFinishModal
				show={modalAuthConfirm}
				onCloseModal={onCloseModal}
				title="아이디 찾기 결과"
				content={`${findUserId}`}
				rest={'비밀번호'}
			></UserFindAuthFinishModal>
		</>
	);
};

export default UserFindId;
