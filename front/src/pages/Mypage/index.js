import React, { useState } from 'react';
import MyHeader from 'components/Mypage/Header';
import Main from 'components/Mypage/OrderList';
import { StyleNav, MypageLayout, MypageMain } from './styles';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

const Mypage = () => {
	return (
		<MypageLayout>
			<MyHeader />
			<Main />
			<StyleNav>
				<h3>나의 쇼핑 활동</h3>
				<ul>
					<li>
						<Link to="/mypage">주문 내역 조회</Link>
					</li>
					<li>
						<Link to="/like">좋아요</Link>
					</li>
					<li>
						<Link to="/cart">장바구니</Link>
					</li>
				</ul>
			</StyleNav>
		</MypageLayout>
	);
};

export default Mypage;
