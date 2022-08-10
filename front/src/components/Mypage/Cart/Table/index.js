import React from "react";
import Tr from "components/Mypage/Cart/Table/Tr";
import { OrderTable } from "components/Mypage/Cart/Table/styles";

function carttable() {
  
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
    <h3>장바구니</h3>
    <OrderTable>
    <colgroup>
          <col width="3.62%"/>
          <col width="*" />
          <col width="9.5%" />
          <col width="12%" />
          <col width="9.5%" />
          <col width="17.3%" />
          <col width="12%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" id="check_all" checked/>
            <label for="check_all"></label>
          </th>
          <th scope="col">상품정보</th>
          <th scope="col">상품금액</th>
          <th scope="col">수량</th>
          <th scope="col">주문금액</th>
          <th scope="col">배송 형태/배송비</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <Tr data={dummyData} />
    </OrderTable>
  </div>;
}

export default carttable;
