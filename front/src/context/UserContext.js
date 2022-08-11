import React, { useReducer, createContext, useContext } from 'react';

const initialUser = {
	token: 1,
	id: 'hello',
	password: 'qwe123',
	email_check: 'hello@naver.com',
	phone_check: '010-1234-5678',
	question: '2',
	answer: 'react',
	address_info: {
		name: '홍길동',
		mobile: '02-1234-5678',
		phone: '010-1234-5678',
		address: '(12345)서울 강남구 가로수길 1 123-1',
	},
};

export const LOGIN = 'LOGIN';

function userReducer(state, action) {
	switch (action.type) {
		case LOGIN:
			console.log(123, action);
			return;
		// return state.concat(action.todo);
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
