import React, { useReducer, createContext, useContext } from 'react';

const initialGlobal = {
	sideBar: false,
	autoLogin: false,
};

export const SIDEBAR = 'SIDEBAR';

function GlobalReducer(state, action) {
	switch (action.type) {
		case SIDEBAR:
			return {
				...state,
				sideBar: action.payload.sideBar,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

export function GlobalProvider({ children }) {
	const [state, dispatch] = useReducer(GlobalReducer, initialGlobal);
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	);
}

export function useGlobalState() {
	return useContext(GlobalStateContext);
}

export function useGlobalDispatch() {
	return useContext(GlobalDispatchContext);
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
