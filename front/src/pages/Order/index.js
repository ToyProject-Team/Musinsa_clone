import Payment from 'components/Order/Payment';
import Refund from 'components/Order/Refund';

import { ButtonWrapper, Button, OrderContainer, InfoWrapper } from './styles';

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
	// return <Refund dummyPaymentInfo={dummyPaymentInfo} />;
	// return <Payment dummyUser={dummyUser}/>
	return (
		<div>
			<OrderContainer>
				<InfoWrapper>
					<div>결제 수단</div>
					<div>
						<label htmlFor="checkAll">
							<input
								// onClick={e => onClickCheckAll(e)}
								style={{ 'background-color': '#0078ff', 'border-color': '#0078ff' }}
								id="checkButton"
								type="checkbox"
								value="General payment"
							/>
							일반 결제
						</label>
						<label htmlFor="checkAll">
							<input
								// onClick={e => onClickCheckAll(e)}
								style={{ 'background-color': '#0078ff', 'border-color': '#0078ff' }}
								id="checkButton"
								type="checkbox"
								value="General payment"
							/>
							무신사 페이
						</label>
					</div>
				</InfoWrapper>
				<InfoWrapper>
					<div>결제 안내</div>
					<ButtonWrapper>
						<Button>신용카드</Button>
						<Button>가상 계좌(무통장)</Button>
						<Button>카카오페이</Button>
						<Button>네이버페이</Button>
					</ButtonWrapper>
					<select>
						<option>신한은행</option>
						<option>기업은행</option>
						<option>국민은행</option>
						<option>우리은행</option>
						<option>농협</option>
						<option>수협</option>
						<option>우체국</option>
					</select>
					<span>김소희</span>
					<p>
						가상 계좌 유효 기간 <span>2022년 08년 13일 23시 29분 59초</span>
					</p>
				</InfoWrapper>
				<InfoWrapper>
					<div>현금영수증</div>
					<div>
						<label htmlFor="checkAll">
							<input
								// onClick={e => onClickCheckAll(e)}
								style={{ 'background-color': '#0078ff', 'border-color': '#0078ff' }}
								id="checkButton"
								type="checkbox"
								value="General payment"
							/>
							소득공제
						</label>
						<label htmlFor="checkAll">
							<input
								// onClick={e => onClickCheckAll(e)}
								style={{ 'background-color': '#0078ff', 'border-color': '#0078ff' }}
								id="checkButton"
								type="checkbox"
								value="General payment"
							/>
							미발행
						</label>
						<div>
							<select>
								<option>휴대폰 번호</option>
								<option>현금영수증 카드</option>
							</select>
							<input></input>
						</div>
					</div>
				</InfoWrapper>
				<div>
					<div>주문자 동의</div>
					<p>회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다</p>
				</div>
			</OrderContainer>
			<button>33819원 결제하기</button>
		</div>
	);
};

export default Order;
