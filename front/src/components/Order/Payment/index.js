import React, { useEffect } from 'react';
import axios from 'axios';

const Payment = ({ dummyUser }) => {
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
		const { IMP } = window;
		IMP.init('imp32326070');
		const data = {
			// pg : 'kakaopay.TC0ONETIME',
			pg: 'html5_inicis',
			pay_method: 'vbank',
			merchant_uid: `mid_${new Date().getTime()}`,
			name: '결제 테스트',
			amount: '100',
			custom_data: { name: '부가정보', desc: '세부 부가정보' },
			buyer_name: '김소희',
			buyer_tel: '01012345678',
			buyer_email: 'iamport@gmail.com',
			buyer_add: '강남구 신사동',
			buyer_postalcode: '12345',
		};
		IMP.request_pay(data, rsp => {
			if (rsp.success) {
				alert('결제 성공');
				axios({
					url: 'http://52.79.252.136/product/purchase',
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
					}
				});
			} else {
				alert(`결제 실패 : ${rsp.error_msg}`);
			}
		});
	};

	return (
		<div>
			<button onClick={onClickPayment}>결제 테스트</button>
		</div>
	);
};

export default Payment;
