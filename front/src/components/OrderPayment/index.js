import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

const OrderPayment = ({ dummyUser, submit, price, pay_method }) => {
	const [pg, setPg] = useState('');
	useEffect(() => {
		const jquery = document.createElement('script');
		jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
		const iamport = document.createElement('script');
		iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
		document.head.appendChild(jquery);
		document.head.appendChild(iamport);
		return () => {
			document.head.removeChild(jquery);
			document.head.removeChild(iamport);
		};
	}, []);

	const onClickPayment = () => {
		if (pay_method == 0) {
			setPg('html5_inicis');
			pay_method = 'card';
		}
		if (pay_method == 1) {
			setPg('html5_inicis');
			pay_method = 'vbank';
		}
		if (pay_method == 2) {
			setPg('kakaopay.TC0ONETIME');
			pay_method = 'card';
		}
		if (pay_method == 3) {
			setPg('payco');
			pay_method = 'card';
		}
		const { IMP } = window;
		IMP.init('imp32326070');
		const data = {
			pg: pg,
			pay_method: pay_method,
			merchant_uid: `mid_${new Date().getTime()}`,
			name: '결제 테스트',
			amount: price,
			buyer_name: '김소희',
			buyer_tel: '01012345678',
			buyer_email: 'iamport@gmail.com',
		};
		IMP.request_pay(data, rsp => {
			if (rsp.success) {
				alert('결제 성공');
				axios({
					// url: 'http://52.79.252.136/product/purchase',
					url: '',
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					data: {
						imp_uid: rsp.imp_uid,
						merchant_uid: rsp.merchant_uid,
						buyer_name: dummyUser.userName,
					},
				}).then(data => {
					// 서버 결제 API 성공시 로직
					switch (data.status) {
						case 'vbankIssued':
							console('가상계좌 발급');
							break;
						case 'success':
							console('결제 완전 성공');
						// 장바구니에서 상품 삭제
					}
				});
			} else {
				alert(`결제 실패 : ${rsp.error_msg}`);
			}
		});
	};

	return <div>{submit ? onClickPayment() : <></>}</div>;
};

export default OrderPayment;
