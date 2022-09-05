import React, { useReducer, createContext, useContext } from 'react';

const initialProduct = {
	price: 0,
	id: 0, // 상품 아이디
	name: '', // 상품 이름
	date: '',
	// user : ''// 유저 아이디
};

const initialAddress = {
	zonecode: '',
	fullAddress: '',
};

export const PAYMENT = 'PAYMENT';
export const REFUND = 'REFUND';
export const ADDRESS = 'ADDRESS';

function productReducer(state, action) {
	switch (action.type) {
		case PAYMENT:
			return {
				...state,
				price: action.payment_data.price,
				id: action.payment_data.id,
				name: action.payment_data.name,
				date: action.payment_data.date,
				// user : action.payment_data.user
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function addressReducer(state, action) {
	switch (action.type) {
		case ADDRESS:
			return {
				...state,
				zonecode: action.post.zonecode,
				fullAddress: action.post.fullAddress,
			};
	}
}

const ProductStateContext = createContext();
const ProductDispatchContext = createContext();

export function ProductProvider({ children }) {
	const [productState, productDispatch] = useReducer(productReducer, initialProduct);
	const [addressState, addressStateDispatch] = useReducer(addressReducer, initialAddress);
	return (
		<ProductStateContext.Provider value={[productState, addressState]}>
			<ProductDispatchContext.Provider value={[productDispatch, addressStateDispatch]}>
				{children}
			</ProductDispatchContext.Provider>
		</ProductStateContext.Provider>
	);
}

export function useProductState() {
	return useContext(ProductStateContext);
}

export function useProductDispatch() {
	return useContext(ProductDispatchContext);
}
