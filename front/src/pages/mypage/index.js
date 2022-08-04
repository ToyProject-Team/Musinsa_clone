import React from "react";
import MyHeader from 'components/mypage/header';
import MyMain from 'components/mypage/table';
import { StyleNav } from "./styles";
import { Link } from "react-router-dom";


const useMypage = () => {
  
  return (
    <div>
        <StyleNav>
          <ul>
            <li><Link to=''>주문 내역 조회</Link></li>
            <li><Link to=''>좋아요</Link></li>
            <li><Link to=''>장바구니</Link></li>
          </ul>
        </StyleNav>
          <MyHeader />
          <MyMain /> 
    </div>
  );
}

export default useMypage;
