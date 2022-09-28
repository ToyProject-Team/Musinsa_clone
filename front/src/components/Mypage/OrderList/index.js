import React, { useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Tr from 'components/Mypage/OrderList/Table';
import { OrderTable } from 'components/Mypage/OrderList/styles';
import { PagenationBox } from '../Like/styles';
import Pagination from 'react-js-pagination';
import { GetTokenApi } from 'utils/api';
import { getData } from 'utils/getData';

function OrderList() {
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

	// 페이지네이션
	const [page, setPage] = useState(1);
	const [items, setItems] = useState(8);
	const handlePageChange = page => {
		setPage(page);
	};

	//주문내역조회 api연결
	const loginToken = getData();
	const [orderData, setOrderData] = useState([]);
	useEffect(() => {
		GetTokenApi('/api/order/orderList', loginToken.accessToken).then(res => {
			setOrderData(res.data.myOrder);
		})
	},[]);

	console.log(orderData);

	return (
		<>
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
							<col width="15%" />
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
						{orderData.slice(items * (page - 1), items * (page - 1) + items).map((data, index) => (
							<Tr 
							key={index}
							data={data} />
						))}
						
					</OrderTable>
					<PagenationBox>
						<Pagination
							activePage={page}
							itemsCountPerPage={items}
							totalItemsCount={dummyData.length - 1}
							pageRangeDisplayed={5}
							onChange={handlePageChange}
							hideNavigation={true}
							hideFirstLastPages={true}
						/>
					</PagenationBox>
				</div>
			</MypageMain>
		</>
	);
}

export default OrderList;
