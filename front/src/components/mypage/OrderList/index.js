import React from "react";
import { MypageMain } from "pages/Mypage/styles.js";
import Table from 'components/Mypage/OrderList/Table';

function mypageMain() {
  return <>
    <MypageMain>
          <Table/>
    </MypageMain>
  </>;
}

export default mypageMain;
