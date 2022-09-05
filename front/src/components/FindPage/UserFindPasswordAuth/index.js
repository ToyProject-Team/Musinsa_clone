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
	FINDPASSWORDSHOWMARKINGDATA,
	useUserFindDispatch,
	useUserFindState,
} from 'context/UserFindContext';
import { PostHeaderApi, PostHeaderBodyApi } from 'utils/api';
import { AuthUser } from './styles';
import { maskingFunc } from 'utils/masking';
import { authError } from 'utils/error';

const UserFindPasswordAuth = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();
	const { auth, emailCheck, phoneNumber, phoneCheck, email, authSuccess, findPasswordShowId } =
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

	// 개인정보 마킹
	useEffect(() => {
		const asyncFunction = async () => {
			const loginidchecktoken = query.token.replace(/\s/g, '+');
			const result = await PostHeaderApi(
				'/api/auth/checkIsLoginIdCheckUser',
				'loginidchecktoken',
				`${loginidchecktoken}`,
			);
			const userData = result.data.userData;
			console.log(userData);

			const payload = {
				auth: userData.includes('@') ? 'emailAuth' : 'phoneAuth',
				showAuth: userData.includes('@') ? 'emailAuth' : 'phoneAuth',
				findPasswordShowMarkingData: userData,
			};
			dispatch({ type: SHOWAUTH, payload });
			dispatch({ type: AUTH, payload });
			dispatch({ type: FINDPASSWORDSHOWMARKINGDATA, payload });

			let answer = '';
			if (userData.includes('@')) {
				answer = maskingFunc.email(userData);
				setAuthStyle('emailAuth');
			} else {
				answer = maskingFunc.phone(userData);
				setAuthStyle('phoneAuth');
			}
			setAuthUser(answer);
		};

		asyncFunction();
	}, []);

	// 아이디 찾기
	useEffect(() => {
		if (auth === 'emailAuth' && authSuccess && emailCheck) {
			// 이메일로 아이디 찾기
			const asyncFunction = async () => {
				const data = {
					loginId: findPasswordShowId,
					email,
				};

				try {
					const result = await PostHeaderBodyApi(
						'/api/auth/findPassword',
						data,
						'emailCheck',
						emailCheck,
					);
					const token = result.data.changePasswordToken;
					navigate(`/find/password/change?token=${token}`);
				} catch (error) {
					console.log(error);
				}
			};

			asyncFunction();
		} else if (auth === 'phoneAuth' && authSuccess && phoneCheck) {
			// 휴대전화로 아이디 찾기
			const asyncFunction = async () => {
				const data = {
					loginId: findPasswordShowId,
					phoneNumber: phoneNumber.replaceAll('-', ''),
				};

				try {
					const result = await PostHeaderBodyApi(
						'/api/auth/findPassword',
						data,
						'phoneCheck',
						phoneCheck,
					);
					const token = result.data.changePasswordToken;
					navigate(`/find/password/change?token=${token}`);
				} catch (error) {
					console.log(error);
				}
			};

			asyncFunction();
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
