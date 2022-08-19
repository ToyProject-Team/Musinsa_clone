import React from "react";
import { MypageMain } from "pages/Mypage/styles.js";
import Tr from 'components/Mypage/OrderList/Table';
import { OrderTable } from 'components/Mypage/OrderList/styles';

function mypageMain() {
  const dummyData = {
		id: '1',
		ProductCompany: '어프어프',
		ProductImg:
			'https://image.msscdn.net/images/goods_img/20191115/1226331/1226331_1_500.jpg?t=20191115100755',
		ProductName: 'Bear heart',
		ProductOption: 'FREE',
		ProductPrice: '20681',
		ProductNum: '1',
		OrderDay: '2020.03.02',
		OrderNum: '12345',
		Orderstatus: '환불완료',
	};

  return <>
    <MypageMain>
          <div>
			<h3>주문내역 조회</h3>
			<OrderTable>
				<colgroup>
					<col width="*" />
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
						<th scope="col" colSpan="2">
							주문상태
						</th>
					</tr>
				</thead>
				<Tr data={dummyData} />
			</OrderTable>
		</div>
    </MypageMain>
  </>;
}

export default mypageMain;