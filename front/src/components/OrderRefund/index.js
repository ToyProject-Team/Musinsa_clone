import axios from 'axios';

const OrderRefund = ({ dummyPaymentInfo }) => {
	const onClickRefund = () => {
		axios({
			url: 'http://52.79.252.136/product/purchase',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: {
				merchant_uid: dummyPaymentInfo.merchant_uid, // 주문번호
				cancel_request_amount: dummyPaymentInfo.cancel_request_amount, // 환불금액
				reason: dummyPaymentInfo.reason, // 환불사유
				refund_holder: dummyPaymentInfo.refund_holder, // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
				refund_bank: dummyPaymentInfo.refund_bank, // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
				refund_account: dummyPaymentInfo.refund_account, // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
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
	return (
		<>
			<button onClick={onClickRefund}>환불 요청 테스트</button>
		</>
	);
};

export default OrderRefund;
