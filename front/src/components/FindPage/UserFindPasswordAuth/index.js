import React, { useCallback } from 'react';
import {
	AuthInput,
	Container,
	FindIdButton,
	RadioButton,
	RadioDetail,
	RadioItem,
} from 'components/FindPage/UserFindId/styles';
import { useParams, useLocation, Routes, Route, Link } from 'react-router-dom';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import qs from 'qs';
import useInput from 'hooks/useInput';
import UserFindId from '../UserFindId';

const UserFindPasswordAuth = () => {
	const location = useLocation();
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});
	console.log(query);

	const [userId, onChangeUserId, setUserId] = useInput('');

	const onClickClear = useCallback(() => {
		setUserId('');
	}, []);

	const onClickCheckPassword = useCallback(() => {
		if (userId.length === 0) return;

		console.log(1);
	}, [userId]);

	return <UserFindId></UserFindId>;
};

export default UserFindPasswordAuth;
