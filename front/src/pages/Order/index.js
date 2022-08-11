import Payment from 'components/Order/Payment';
import Refund from 'components/Order/Refund';

const dummyUser = {
	userName: '김소희',
};

const dummyPaymentInfo = {
	merchant_uid: '23486501', // 주문번호
	cancel_request_amount: 2000, // 환불금액
	reason: '테스트 결제 환불', // 환불사유
	refund_holder: '홍길동', // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
	refund_bank: '88', // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
	refund_account: '56211105948400', // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
};

const Order = () => {
	return <Refund dummyPaymentInfo={dummyPaymentInfo} />;
	// return <Payment dummyUser={dummyUser}/>
};

export default Order;
