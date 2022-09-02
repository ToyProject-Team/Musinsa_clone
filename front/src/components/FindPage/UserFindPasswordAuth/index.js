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
import {
	AUTH,
	SHOWAUTH,
	SHOWVALUE,
	useUserFindDispatch,
	useUserFindState,
} from 'context/UserFindContext';
import { PostHeaderApi } from 'utils/api';
import { AuthUser } from './styles';
import { maskingFunc } from 'utils/masking';
import { authError } from 'utils/error';

const UserFindPasswordAuth = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { auth, emailCheck, phoneCheck, findUserId, modalAuthConfirm, authSuccess, showValue } =
		userFind;

	const navigate = useNavigate();
	const location = useLocation();
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	const [authUser, setAuthUser] = useState('');
	const [authStyle, setAuthStyle] = useState('');

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	// 아이디 찾기
	useEffect(() => {
		// if (authSuccess) {
		const asyncFunction = async () => {
			const loginidchecktoken = query.token.replace(/\s/g, '+');
			const result = await PostHeaderApi(
				'/api/auth/checkIsLoginIdCheckUser',
				'loginidchecktoken',
				`${loginidchecktoken}`,
			);
			const userData = result.data.userData;

			const payload = {
				auth: userData.includes('@') ? 'emailAuth' : 'phoneAuth',
				showAuth: userData.includes('@') ? 'emailAuth' : 'phoneAuth',
				showValue: userData,
			};
			dispatch({ type: SHOWAUTH, payload });
			dispatch({ type: AUTH, payload });
			dispatch({ type: SHOWVALUE, payload });

			let answer = '';
			if (userData.includes('@')) {
				answer = maskingFunc.email(userData);
				setAuthStyle('emailAuth');
			} else {
				answer = maskingFunc.phone(userData);
				setAuthStyle('phoneAuth');
			}
			setAuthUser(answer);
			// navigate(`/find/password/change?token=${token}`);
		};

		asyncFunction();
		// }
	}, []);

	// 아이디 찾기
	useEffect(() => {
		if (auth === 'emailAuth' && authSuccess && emailCheck) {
			const data = {
				loginId: showValue,
				phoneNumber: 147970131,
			};
			// 이메일로 아이디 찾기
			// PostHeaderApi('/api/auth/findPassword', data, 'emailCheck', emailCheck)
			// 	.then(res => {
			// 		switch (res.status) {
			// 			case 200:
			// 				// changeDispatch(FINDUSERID, { findUserId: res.data.loginId });
			// 				// changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: true });
			// 				// changeDispatch(FINDBUTTONLOADING, { findButtonLoading: false });
			// 				break;
			// 			default:
			// 				console.log(res);
			// 				break;
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 		authError(err);
			// 	});
		} else if (auth === 'phoneAuth' && authSuccess && phoneCheck) {
			// 휴대전화로 아이디 찾기
			// PostHeaderApi('/api/auth/findPassword', 'phoneCheck', phoneCheck)
			// 	.then(res => {
			// 		switch (res.status) {
			// 			case 200:
			// 				// changeDispatch(FINDUSERID, { findUserId: res.data.loginId });
			// 				// changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: true });
			// 				// changeDispatch(FINDBUTTONLOADING, { findButtonLoading: false });
			// 				break;
			// 			default:
			// 				console.log(res);
			// 				break;
			// 		}
			// 	})
			// 	.catch(err => {
			// 		authError(err);
			// 	});
		}
	}, [authSuccess, emailCheck, phoneCheck]);

	return (
		<>
			<AuthUser authStyle={authStyle}>{authUser}</AuthUser>
			<UserFindAuth></UserFindAuth>
		</>
	);
};

export default UserFindPasswordAuth;
