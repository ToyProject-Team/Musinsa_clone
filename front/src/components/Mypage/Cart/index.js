import React from "react";
import { MypageMain } from "pages/Mypage/styles.js";
import CartTable from 'components/Mypage/Cart/Table';

function cart() {
  return <>
  <MypageMain>
        <CartTable />
  </MypageMain>
  </>;
}

export default cart;
