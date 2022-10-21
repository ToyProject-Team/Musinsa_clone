import React, { useReducer, createContext, useContext } from 'react';

const initialFilterVal = {
    bigCategoryId: 0,
    smallCategoryId: 0,
    mainSort: 0,
    page: 0,
    price: 0,
    priceMin: 0,
    priceMax: 0,
    productTitle: 0,
};

// ? ? ?
//export const BIGCATEGORYID = 'BIGCATEGORYID';

function MainReducer(state, action) {
    switch (action.type) {
        case BIGCATEGORYID:
            return {
                ...state,
                bigCategoryId: action.payload.sideBar,
                //(Main에서 입력하거나 받는 숫자값을 넣고 싶음)
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const MainStateContext = createContext();
const MainDispatchContext = createContext();

export function MainProvider({ children }) {
    const [state, dispatch] = useReducer(MainReducer, initialFilterVal);
    return (
        <MainStateContext.Provider value={state}>
            <MainDispatchContext.Provider value={dispatch}>{children}</MainDispatchContext.Provider>
        </MainStateContext.Provider>
    );
}

export function useMainState() {
    return useContext(MainStateContext);
}

export function useMainDispatch() {
    return useContext(MainDispatchContext);
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
