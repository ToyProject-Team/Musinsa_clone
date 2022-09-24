import React, { useReducer, createContext, useContext } from 'react';

const initialUser = {
	authEmail: '',
	authEmailCheck: '',
	authPhoneNumber: '',
	authPhoneCheck: '',
};

export const AUTHINIT = 'AUTHINIT';
export const AUTHPHONENUMBER = 'AUTHPHONENUMBER';
export const AUTHPHONECHECK = 'AUTHPHONECHECK';
export const AUTHEMAIL = 'AUTHEMAIL';
export const AUTHEMAILCHECK = 'AUTHEMAILCHECK';

function userReducer(state, action) {
	switch (action.type) {
		case AUTHINIT:
			return initialUser;

		case AUTHPHONENUMBER:
			return {
				...state,
				authPhoneNumber: action.payload.authPhoneNumber,
			};

		case AUTHPHONECHECK:
			return {
				...state,
				authPhoneCheck: action.payload.authPhoneCheck,
			};

		case AUTHEMAIL:
			return {
				...state,
				authEmail: action.payload.authEmail,
			};

		case AUTHEMAILCHECK:
			return {
				...state,
				authEmailCheck: action.payload.authEmailCheck,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export function UserProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialUser);
	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}

export function useUserState() {
	return useContext(UserStateContext);
}

export function useUserDispatch() {
	return useContext(UserDispatchContext);
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
