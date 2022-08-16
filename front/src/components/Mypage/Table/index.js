import React, { useEffect, useMemo, useRef, useState } from 'react';
// import axios from 'axios';
import Tr from 'components/mypage/table/tr';
import { OrderTable } from 'components/mypage/table/styles';

function MyMain() {
	const [info, setInfo] = useState([]);

	// useEffect(() => {
	//   axios.get('https://jsonplaceholder.typicode.com/users')
	//   .then(res => setInfo(res.data))
	//   .catch(err => console.log(err));
	// },[]);

	return (
		<div>
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
				<Tr info={info} />
			</OrderTable>
		</div>
	);
}

export default MyMain;
