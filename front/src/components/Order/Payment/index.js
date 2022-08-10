import React, { useEffect } from 'react';
import axios from 'axios';
// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

const { IMP } = window;
IMP.init('imp32326070');

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
			pg: 'html5_inicis',
			pay_method: 'vbank',
			merchant_uid: `mid_${new Date().getTime()}`,
			name: '결제 테스트',
			amount: '100',
			custom_data: { name: '부가정보', desc: '세부 부가정보' },
			buyer_name: '김소희',
			buyer_tel: '01012345678',
			buyer_email: 'rlathgml07261@gmail.com',
			buyer_add: '강남구 신사동',
			buyer_postalcode: '12345',
		};
		IMP.request_pay(data, callback);
	};

	const callback = response => {
		console.log(response);
		const { success, error_msg, imp_uid, pay_method, paid_amount, status } = response;
		if (response.success) {
			alert('결제(요청?) 성공');
			console.log(response.imp_uid);
			console.log(response.merchant_uid);
			axios({
				url: 'http://52.79.252.136/api/product/purchase', //
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				data: {
					imp_uid: response.imp_uid,
					merchant_uid: response.merchant_uid,
				},
			}).then(data => {
				IMP.request_pay({}, response => {
					if (response.success) {
						axios({}).then(data => {
							switch (data.status) {
								case 'vbankIssued':
									alert('가상계좌 발급이 성공적으로 완료되었습니다.');
									break;
								case 'success':
									alert('결제 성공!');
									break;
							}
						});
					}
				});
			});
		} else {
			alert(`결제 실패 : ${error_msg}`);
		}
	};

	return (
		<>
			<button onClick={onClickPayment}>결제 테스트</button>
		</>
	);
};

export default Payment;
