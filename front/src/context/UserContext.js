import React, { useReducer, createContext, useContext } from 'react';

const initialUser = {
	login: false,
	token: '',
	email: '',
	emailCheck: '',
	phoneNumber: '',
	phoneCheck: '',
	userFindId: '',
};

export const LOGIN = 'LOGIN';
export const PHONENUMBER = 'PHONENUMBER';
export const PHONECHECK = 'PHONECHECK';
export const EMAIL = 'EMAIL';
export const EMAILCHECK = 'EMAILCHECK';
export const USERFINDID = 'USERFINDID';

function userReducer(state, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				login: action.payload.login,
				token: action.payload.token,
			};

		case PHONENUMBER:
			return {
				...state,
				phoneNumber: action.payload.phoneNumber,
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

		case EMAILCHECK:
			return {
				...state,
				emailCheck: action.payload.emailCheck,
			};

		case USERFINDID:
			return {
				...state,
				userFindId: action.payload.userFindId,
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
