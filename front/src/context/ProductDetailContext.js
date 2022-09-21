import React, { useReducer, createContext, useContext } from 'react';

export const PRODUCTDETAIL = 'PRODUCTDETAIL';
export const ORDERMODAL = 'ORDERMODAL';
export const ORDER = 'ORDER';
export const LIKES = 'LIKES';

function productDetailReducer(state, action) {
	switch (action.type) {
		case PRODUCTDETAIL:
			return {
				...state,
				product: action.payload.product,
			};

		case ORDERMODAL:
			return {
				...state,
				order: {
					...state.order,
					modal: action.payload.modal,
				},
			};

		case ORDER:
			return {
				...state,
				order: {
					...state.order,
					pay: action.payload.pay,
				},
			};

		case LIKES:
			return {
				...state,
				product: {
					...state.product,
					likes: action.payload.likes,
				},
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const ProductDetailStateContext = createContext();
const ProductDetailDispatchContext = createContext();

export function ProductDetailProvider({ children, value }) {
	const [state, dispatch] = useReducer(productDetailReducer, value);
	return (
		<ProductDetailStateContext.Provider value={state}>
			<ProductDetailDispatchContext.Provider value={dispatch}>
				{children}
			</ProductDetailDispatchContext.Provider>
		</ProductDetailStateContext.Provider>
	);
}

export function useProductDetailState() {
	return useContext(ProductDetailStateContext);
}

export function useProductDetailDispatch() {
	return useContext(ProductDetailDispatchContext);
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
