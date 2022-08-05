import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from 'axios';
import Tr from "components/Mypage/OrderList/Table/Tr";
import { OrderTable } from "components/Mypage/OrderList/Table/styles";

function MypageTable({title, firstth, secondth, thirdth, fourthth, fifthth}) {
  
  const dummyData = {
    id:'1',
    ProductCompany:'어프어프',
    ProductImg:'https://image.msscdn.net/images/goods_img/20191115/1226331/1226331_1_500.jpg?t=20191115100755',
    ProductName: 'Bear heart',
    ProductOption: 'FREE',
    ProductPrice: '20681',
    ProductNum: '1',
    OrderDay: '2020.03.02',
    OrderNum: '12345',
    Orderstatus: '환불완료',
  }

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //   .then(res => setInfo(res.data))
  //   .catch(err => console.log(err));
  // },[]);

  return <div>
    <h3>주문내역 조회</h3>
    <OrderTable>
    <colgroup>
          <col width="*"/>
          <col width="14.2%" />
          <col width="14.2%" />
          <col width="14.2%" />
          <col width="10.2%" />
          <col width="11%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">상품정보</th>
          <th scope="col">주문일자</th>
          <th scope="col">주문번호</th>
          <th scope="col">주문금액(수량)</th>
          <th scope="col" colSpan="2">주문상태</th>
        </tr>
      </thead>
      <Tr data={dummyData} />
    </OrderTable>
  </div>;
}

export default MypageTable;
