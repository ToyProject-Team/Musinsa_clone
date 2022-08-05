import React from "react";
import Tr from "components/Mypage/Like/Table/Tr";
import { OrderTable } from "components/Mypage/OrderList/Table/styles";

function liketable() {
  
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


  return <div>
    <h3>좋아요</h3>
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
          <th scope="col">상품금액</th>
          <th scope="col">수량</th>
          <th scope="col">주문금액</th>
          <th scope="col" colSpan="2">배송 형태/배송비</th>
        </tr>
      </thead>
      <Tr data={dummyData} />
    </OrderTable>
  </div>;
}

export default liketable;
