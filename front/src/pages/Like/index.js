import React from "react";
import MyHeader from 'components/Mypage/Header';
import Main from 'components/Mypage/Like';
import { StyleNav, MypageLayout, MypageMain } from 'pages/Mypage/styles';
import { Link, NavLink } from "react-router-dom";

function like() {

  let activeStyle = {
    textDecoration: "underline",
  };
  
  return  (<MypageLayout>       
  <MyHeader />
  <Main />
  <StyleNav>
    <h3>나의 쇼핑 활동</h3>
    <ul>
					<li>
						<NavLink to="/mypage" style={({isActive}) => ({color: isActive ? 'black' : 'yellow'})}>주문 내역 조회</NavLink>
					</li>
					<li>
						<NavLink to="/like" style={({isActive}) => ({color: isActive ? 'black' : 'yellow'})}>좋아요</NavLink>
					</li>
					<li>
						<NavLink to="/cart" style={({isActive}) => ({color: isActive ? 'black' : 'yellow'})}>장바구니</NavLink>
					</li>
				</ul>
  </StyleNav>
    
</MypageLayout>
);
}

export default like;
