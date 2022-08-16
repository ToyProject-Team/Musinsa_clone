import Payment from 'components/Order/Payment';
import Refund from 'components/Order/Refund';

import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import {
	ButtonWrapper,
	OrderContainer,
	InfoWrapper,
	Button,
	OrderButton,
	RefundHolder,
	RefundInfo,
	DefalutInfo,
	X,
} from './styles';
import { useState, useCallback, useRef } from 'react';
import { useBlockLayout } from 'react-table';
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

const Order = props => {
	// return <Refund dummyPaymentInfo={dummyPaymentInfo} />;
	// return <Payment dummyUser={dummyUser} />;

	const paymentWay = ['신용카드', '가상계좌(무통장)', '카카오페이', '페이코'];

	const [btnActive, setBtnActive] = useState('');
	const [agreementChecked, setAgreementChecked] = useState(false);
	const [refundAccountChecked, setRefundAccountChecked] = useState(false);
	const [submit, setSubmit] = useState(false);
	const refundAccount = useRef();

	const toggleActive = useCallback(
		e => {
			setBtnActive(e.target.value);
		},
		[btnActive],
	);

	const AccoutSubmitCheck = () => {
		if (btnActive == 1) {
			if (refundAccount.current.value.length < 12) {
				alert('올바른 계좌 정보를 입력하세요.');
				refundAccount.current.focus();
			} else {
				if (agreementChecked) {
					setSubmit(true);
				}
			}
		}
		if (btnActive == 1) {
		} else {
			agreementChecked ? setSubmit(true) : <></>;
		}
	};

	return (
		<div>
			<X onClick={() => props.openModal(false)}>X</X>
			<OrderContainer>
				<InfoWrapper>
					<li style={{ paddingBottom: '15px' }}>결제 안내</li>
					<li>
						<ButtonWrapper>
							{paymentWay.map((item, idx) => {
								return (
									<>
										<Button
											value={idx}
											onClick={toggleActive}
											selected={idx == btnActive ? true : false}
										>
											{item}
										</Button>
									</>
								);
							})}
						</ButtonWrapper>
						{btnActive == 0 ? (
							<div>
								<select>
									<option>KB국민</option>
									<option>신한카드</option>
									<option>롯데카드</option>
									<option>카카오뱅크</option>
									<option>NH채움</option>
									<option>현대카드</option>
									<option>삼성카드</option>
								</select>
								<RefundHolder>김소희</RefundHolder>
							</div>
						) : (
							<></>
						)}
						{btnActive == 1 ? (
							<div>
								<select>
									<option>신한은행</option>
									<option>기업은행</option>
									<option>국민은행</option>
									<option>우리은행</option>
									<option>농협</option>
									<option>수협</option>
									<option>우체국</option>
								</select>
								<RefundHolder>김소희</RefundHolder>
								<p>
									가상 계좌 유효 기간 <span>2022년 08년 13일 23시 29분 59초</span>
								</p>
							</div>
						) : (
							<></>
						)}
					</li>
				</InfoWrapper>
				{btnActive == 1 ? (
					<RefundInfo>
						<li>품절 시 환불 계좌</li>
						<li>
							<div style={{ marginBottom: '15px' }}>
								<span>예금주</span>
								<span style={{ marginLeft: '20px', color: '#000' }}>김소희</span>
							</div>
							<div>
								<span>입금 은행</span>
								<select>
									<option>신한은행</option>
									<option>기업은행</option>
									<option>국민은행</option>
									<option>우리은행</option>
									<option>농협중앙회</option>
									<option>수협</option>
									<option>우체국</option>
								</select>
							</div>
							<div>
								<span>계좌 번호</span>
								<input type="text" ref={refundAccount}></input>
							</div>
						</li>
					</RefundInfo>
				) : (
					<DefalutInfo>
						<div style={{ paddingBottom: '10px' }}>품절 시 환불 안내</div>
						<div>
							<span>결제하신 수단으로 취소됩니다.</span>
							<ul>
								<li>환불 받으신 날짜 기준으로 3~5일 후 환불 처리됩니다.</li>
								<li>입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. </li>
								<li>현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다.</li>
							</ul>
						</div>
					</DefalutInfo>
				)}

				<InfoWrapper>
					<li>주문자 동의</li>
					<label htmlFor="checkAll">
						<input
							id="checkAll"
							type="checkbox"
							name="checkAll"
							onClick={() => setAgreementChecked(!agreementChecked)}
						/>
						회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다
					</label>
				</InfoWrapper>
			</OrderContainer>
			<OrderButton agreement={agreementChecked} onClick={AccoutSubmitCheck}>
				{props.price} 결제하기
			</OrderButton>
			{submit == true ? (
				<Payment submit={submit} price={props.price} pay_method={btnActive} />
			) : (
				<></>
			)}
		</div>
	);
};

export default Order;
