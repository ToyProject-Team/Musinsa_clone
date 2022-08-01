import React from "react";


function mypage_main() {
  return <div>
    <table>
      <caption>주문내역 조회</caption>
      <thead>
        <tr>
          <th scope="col">상품정보</th>
          <th scope="col">주문일자</th>
          <th scope="col">주문번호</th>
          <th scope="col">주문금액(수량)</th>
          <th scope="col">주문상태</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">상품명</td>
          <td scope="row">2011.11.11</td>
          <td scope="row">8,731원</td>
          <td scope="row">환불완료</td>
        </tr>
      </tbody>
    </table>
  </div>;
}

export default mypage_main;
