<<<<<<< HEAD
import React, { useState } from "react";
import MyHeader from 'components/Mypage/Header';
import Main from 'components/Mypage/OrderList';
import { StyleNav, MypageLayout, MypageMain } from "./styles";
import { Link } from "react-router-dom";


const Mypage = () => {

  return (
    <MypageLayout>       
        <MyHeader />
        <Main />
        <StyleNav>
          <h3>나의 쇼핑 활동</h3>
          <ul>
            <li><Link to='/mypage'>주문 내역 조회</Link></li>
            <li><Link to='/like'>좋아요</Link></li>
            <li><Link to='/cart'>장바구니</Link></li>
          </ul>
        </StyleNav>
          
    </MypageLayout>
  );
}
=======
import React from 'react';
import MyHeader from 'components/mypage/header';
import MyMain from 'components/mypage/table';

const useMypage = () => {
	return (
		<div>
			<div>
				<MyHeader />
				<MyMain />
			</div>
		</div>
	);
};
>>>>>>> a1b58fe9ee58b79f0e2e379ec30e6b72e204aa6d

export default Mypage;
