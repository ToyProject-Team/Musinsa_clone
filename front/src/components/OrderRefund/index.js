import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';

const OrderRefund = ({ dummyPaymentInfo }) => {
	useEffect(() => {
		const onClickRefund = async () => {
			await axios({
				url: 'http://52.79.252.136/product/purchase',
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				data: {
					merchant_uid: 'mid_1664512887327', // 주문번호
					cancel_request_amount: '10', // 환불금액
					reason: 'test', // 환불사유
				},
			})
				.then(function (response) {
					console.log(response);
					alert('성공');
				})
				.catch(function (error) {
					alert('실패');
				});
		};

		onClickRefund();
	}, []);

	return;
};

export default OrderRefund;
