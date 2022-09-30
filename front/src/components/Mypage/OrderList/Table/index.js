import React from 'react';
import { thousandComma } from 'utils/thousandComma';
import { ImgSpan } from '../styles';

function OrderList({ data }) {
	const orderState = () => {
		switch (data.Order.state) {
			case 1:
				return '주문완료';
			case 2:
				return '환불완료';
		}
	};
	return (
		<tbody>
			<tr>
				<td>
					<ImgSpan>
						<a href={`/detail?productId=${data.Order.ProductId}`}>
							<img
								src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${data.ProductImg.src}`}
								alt="더미데이터"
								width="50px"
								height="50px"
							/>
						</a>
					</ImgSpan>
					<ul>
						<li>
							<a href={`/detail?productId=${data.Order.ProductId}`}>
								<strong>{data.productTitle}</strong>
							</a>
						</li>
						<li>
							옵션 : {data.Order.orderColor} / {data.Order.orderSize}
						</li>
					</ul>
				</td>
				<td>{data.Order.createdAt.substr(0, 10)}</td>
				<td>{data.Order.MerchantUid}</td>
				<td>
					{thousandComma(data.Order.orderPrice * data.Order.amount)}원<br />
					<span>({data.Order.amount}개)</span>
				</td>
				<td colSpan="2"><span>{orderState()}</span><button>환불요청</button></td>
			</tr>
		</tbody>
	);
}

export default OrderList;
