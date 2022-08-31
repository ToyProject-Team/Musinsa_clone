import React, { useCallback, useEffect, useState } from 'react';
import {
	AuthInput,
	Container,
	FindIdButton,
	RadioButton,
	RadioDetail,
	RadioItem,
} from 'components/FindPage/UserFindAuth/styles';
import {
	useParams,
	useLocation,
	Routes,
	Route,
	Link,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import qs from 'qs';
import useInput from 'hooks/useInput';
import UserFindAuth from '../UserFindAuth';
import { useUserFindDispatch, useUserFindState } from 'context/UserFindContext';

const UserFindPasswordAuth = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { auth, emailCheck, phoneCheck, findUserId, modalAuthConfirm, authSuccess } = userFind;
	const location = useLocation();
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});
	console.log(query);
	const navigate = useNavigate();

	// 아이디 찾기
	useEffect(() => {
		if (authSuccess) {
			return navigate(`/find/password/change?token=12ewawdasd12`);
		}
	}, [authSuccess]);

	return (
		<>
			<UserFindAuth></UserFindAuth>
		</>
	);
};

export default UserFindPasswordAuth;
