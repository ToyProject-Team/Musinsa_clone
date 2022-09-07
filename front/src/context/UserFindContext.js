import React, { useReducer, createContext, useContext } from 'react';

const initialFind = {
	auth: 'phoneAuth',
	showAuth: 'all',

	findPasswordShowMarkingData: '',

	phoneNumber: '',
	phoneNumberAuthText: '',
	phoneCode: '',
	phoneCodeFlag: false,
	phoneCheck: '',

	email: '',
	emailAuthText: '',
	emailCode: '',
	emailCodeFlag: false,
	emailCheck: '',

	findUserId: '',
	findButtonLoading: false,

	modalAuth: false,
	modalAuthConfirm: false,

	authSuccess: false,
};

export const INIT = 'INIT';
export const AUTH = 'AUTH';
export const SHOWAUTH = 'SHOWAUTH';

export const FINDPASSWORDSHOWMARKINGDATA = 'FINDPASSWORDSHOWMARKINGDATA';

export const PHONENUMBER = 'PHONENUMBER';
export const PHONENUMBERAUTHTEXT = 'PHONENUMBERAUTHTEXT';
export const PHONECODE = 'PHONECODE';
export const PHONECODEFLAG = 'PHONECODEFLAG';
export const PHONECHECK = 'PHONECHECK';

export const EMAIL = 'EMAIL';
export const EMAILAUTHTEXT = 'EMAILAUTHTEXT';
export const EMAILCODE = 'EMAILCODE';
export const EMAILCODEFLAG = 'EMAILCODEFLAG';
export const EMAILCHECK = 'EMAILCHECK';

export const FINDBUTTONFLAG = 'FINDBUTTONFLAG';
export const FINDUSERID = 'FINDUSERID';
export const FINDBUTTONLOADING = 'FINDBUTTONLOADING';

export const MODALAUTH = 'MODALAUTH';
export const MODALAUTHCONFIRM = 'MODALAUTHCONFIRM';

export const AUTHSUCCESS = 'AUTHSUCCESS';

function userReducer(state, action) {
	switch (action.type) {
		case INIT:
			return initialFind;

		case AUTH:
			return {
				...state,
				auth: action.payload.auth,
			};

		case SHOWAUTH:
			return {
				...state,
				showAuth: action.payload.showAuth,
			};

		case FINDPASSWORDSHOWMARKINGDATA:
			return {
				...state,
				findPasswordShowMarkingData: action.payload.findPasswordShowMarkingData,
			};

		case PHONENUMBER:
			return {
				...state,
				phoneNumber: action.payload.phoneNumber,
			};

		case PHONENUMBERAUTHTEXT:
			return {
				...state,
				phoneNumberAuthText: action.payload.phoneNumberAuthText,
			};

		case PHONECODE:
			return {
				...state,
				phoneCode: action.payload.phoneCode,
			};

		case PHONECODEFLAG:
			return {
				...state,
				phoneCodeFlag: action.payload.phoneCodeFlag,
			};

		case PHONECHECK:
			return {
				...state,
				phoneCheck: action.payload.phoneCheck,
			};

		case EMAIL:
			return {
				...state,
				email: action.payload.email,
			};

		case EMAILAUTHTEXT:
			return {
				...state,
				emailAuthText: action.payload.emailAuthText,
			};

		case EMAILCODE:
			return {
				...state,
				emailCode: action.payload.emailCode,
			};

		case EMAILCODEFLAG:
			return {
				...state,
				emailCodeFlag: action.payload.emailCodeFlag,
			};

		case EMAILCHECK:
			return {
				...state,
				emailCheck: action.payload.emailCheck,
			};

		case FINDBUTTONFLAG:
			return {
				...state,
				findButtonFlag: action.payload.findButtonFlag,
			};

		case FINDUSERID:
			return {
				...state,
				findUserId: action.payload.findUserId,
			};

		case FINDBUTTONLOADING:
			return {
				...state,
				findButtonLoading: action.payload.findButtonLoading,
			};

		case MODALAUTH:
			return {
				...state,
				modalAuth: action.payload.modalAuth,
			};

		case MODALAUTHCONFIRM:
			return {
				...state,
				modalAuthConfirm: action.payload.modalAuthConfirm,
			};

		case AUTHSUCCESS:
			return {
				...state,
				authSuccess: action.payload.authSuccess,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const UserFindStateContext = createContext();
const UserFindDispatchContext = createContext();

export function UserFindProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialFind);
	return (
		<UserFindStateContext.Provider value={state}>
			<UserFindDispatchContext.Provider value={dispatch}>
				{children}
			</UserFindDispatchContext.Provider>
		</UserFindStateContext.Provider>
	);
}

export function useUserFindState() {
	return useContext(UserFindStateContext);
}

export function useUserFindDispatch() {
	return useContext(UserFindDispatchContext);
}

/* 예시 */
/* 
	const user = useUserState();					=> 현재값 불러오기
	const dispatch = useUserDispatch();				=> 값 수정하기

	// 로그인 예시
	if (email === 'qwe' && password === 'qwe') {
		const payload = {
			login: true,
			token: '이곳에 로그인시 발급받는 token 값이 들어갑니다.',
		};

		dispatch({ type: LOGIN, payload });
	}
*/
