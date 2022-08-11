import React, { useState } from 'react';
import MyHeader from 'components/Mypage/Header';
import { StyleNav, MypageLayout, MypageMain } from './styles';
import { Routes, Route, NavLink } from 'react-router-dom';
import loadable from '@loadable/component';

const OrderList = loadable(() => import('components/Mypage/OrderList'), {
	fallback: <div>로딩중</div>,
});

const Like = loadable(() => import('components/Mypage/Like'), {
	fallback: <div>로딩중</div>,
});

const Cart = loadable(() => import('components/Mypage/Cart'), {
	fallback: <div>로딩중</div>,
});

const Mypage = () => {
	return (
		<MypageLayout>
			<MyHeader />
			<StyleNav>
				<h3>나의 쇼핑 활동</h3>
				<ul>
					<li>
						<NavLink
							exact
							to="/mypage/orderlist"
							style={({ isActive }) => ({ color: isActive ? 'red' : 'gray' })}
						>
							주문 내역 조회
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/mypage/like"
							style={({ isActive }) => ({ color: isActive ? 'red' : 'gray' })}
						>
							좋아요
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/mypage/cart"
							style={({ isActive }) => ({ color: isActive ? 'red' : 'gray' })}
						>
							장바구니
						</NavLink>
					</li>
				</ul>
			</StyleNav>
			<div>
				<Routes>
					<Route path="/orderlist" element={<OrderList />} /> {/* => 로그인페이지 */}
					<Route path="/like" element={<Like />} /> {/* => 로그인페이지 */}
					<Route path="/cart" element={<Cart />} /> {/* => 상세페이지 */}
				</Routes>
			</div>
		</MypageLayout>
	);
};

export default Mypage;
