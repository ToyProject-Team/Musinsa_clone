import { useCallback } from 'react';
import {
	ORDERMODAL,
	useProductDetailDispatch,
	useProductDetailState,
} from 'context/ProductDetailContext';
import { useState } from 'react';
import TextModal from 'components/Modals/TextModal';
import { useEffect } from 'react';
import { PostHeaderBodyApi } from 'utils/api';
import { getData } from 'utils/getData';
import { URLquery } from 'utils/URLquery';
import { useLocation } from 'react-router';
import axios from 'axios';

const impNumber = process.env.REACT_APP_PAYMENT;

const Order = ({ modal, pay }) => {
	const data = getData();
	const { accessToken } = data;

	const location = useLocation();
	const query = URLquery(location);
	const { productId } = query;

	const [modalOrder, setModalOrder] = useState(false);

	useEffect(() => {
		let pg = '';
		let pay_method = '';
		let price = 10;
		if (pay === 'card') pg = 'html5_inicis';
		else if (pay === 'Virtual') pg = 'html5_inicis';
		else if (pay === 'kakao') pg = 'kakaopay';
		else if (pay == 'payco') pg = 'payco';

		if (pay === 'Virtual') pay_method = 'vbank';
		else pay_method = 'card';

		var { IMP } = window; // 생략가능
		IMP.init(impNumber); // <-- 본인 가맹점 식별코드 삽입
		IMP.request_pay(
			{
				pg,
				pay_method,
				merchant_uid: `mid_${new Date().getTime()}`,
				name: 'Test 상품',
				amount: price,
				buyer_email: 'devhyuktest@gmail.com',
				buyer_name: '홍길동',
				buyer_tel: '01096361038',
				buyer_addr: '서울특별시 강남구 신사동',
				buyer_postcode: '01181',
			},
			rsp => {
				console.log(rsp);
				// callback
				if (rsp.success) {
					// 결제 성공 시 로직,
					const data = {
						imp_uid: rsp.imp_uid,
						Merchant_uid: rsp.merchant_uid,
						ProductId: productId,
						price,
						amount: 2,
					};

					PostHeaderBodyApi('/api/product/purchase', data, 'Authorization', accessToken).then(
						res => {
							setModalOrder(true);
						},
					);
				} else {
					// 결제 실패 시 로직,
					console.log(2);
				}
			},
		);
	}, [pay]);

	const onCloseModal = useCallback(() => {
		setModalOrder(false);
	}, []);
	// const paymentWay = ['신용카드', '가상계좌(무통장)', '카카오페이', '페이코'];

	// const [btnActive, setBtnActive] = useState('');
	// const [agreementChecked, setAgreementChecked] = useState(false);
	// const [submit, setSubmit] = useState(false);
	// const [selectedAddress, setSelectedAddress] = useState('');
	// const [openPostcode, setOpenPostcode] = useState(false);
	// const [selectedAddressInfo, setSelectedAddressInfo] = useState({
	// 	zonecode: '',
	// 	fullAddress: '',
	// });

	// const refundAccount = useRef();

	// const product = useProductState();

	// const toggleActive = useCallback(
	// 	e => {
	// 		setBtnActive(e.target.value);
	// 	},
	// 	[btnActive],
	// );

	// const AccoutSubmitCheck = () => {
	// 	if (btnActive == 1) {
	// 		if (refundAccount.current.value.length < 12) {
	// 			alert('올바른 계좌 정보를 입력하세요.');
	// 			refundAccount.current.focus();
	// 		} else {
	// 			if (agreementChecked) {
	// 				setSubmit(true);
	// 			}
	// 		}
	// 	}
	// 	if (btnActive == 1) {
	// 	} else {
	// 		agreementChecked ? setSubmit(true) : <></>;
	// 	}
	// };

	// const addressChecked = checkThis => {
	// 	const checked = document.getElementsByName('address');
	// 	checked.forEach(cb => {
	// 		cb.checked = false;
	// 	});
	// 	checkThis.checked = true;
	// 	setSelectedAddress(checkThis.value);
	// };

	return (
		<TextModal
			show={modalOrder}
			onCloseModal={onCloseModal}
			content="결제가 완료 되었습니다."
		></TextModal>
	);
	// <div>
	// 	<X onClick={() => props.openModal(false)}>X</X>
	// 	<OrderContainer>
	// 		<RefundInfo>
	// 			<li>수령자 정보</li>
	// 			<li>
	// 				<div>
	// 					<span>수령인</span>
	// 					<div>홍길동</div>
	// 				</div>

	// 				<div>
	// 					<span>휴대전화</span>
	// 					<div>01098765432</div>
	// 				</div>
	// 				<div>
	// 					<span>배송지 주소</span>
	// 					<div>경기 성남시 분당구 판교역로 235 (에이치스퀘어 엔동)</div>
	// 				</div>
	// 				<div>
	// 					<span>배송 메모</span>
	// 				</div>
	// 				<select style={{ width: '280px' }}>
	// 					<option>배송 시 요청사항을 선택해주세요</option>
	// 					<option>부재 시 경비실에 맡겨주세요</option>
	// 					<option>부재 시 택배함에 넣어주세요</option>
	// 					<option>부재 시 집 앞에 놔주세요</option>
	// 					<option>배송 전 연락 바랍니다</option>
	// 					<option>파손 위험이 있으니 배송 시 주의해주세요</option>
	// 				</select>
	// 			</li>
	// 		</RefundInfo>
	// 		<InfoWrapper>
	// 			<li style={{ paddingBottom: '15px' }}>결제 안내</li>
	// 			<li>
	// 				<ButtonWrapper>
	// 					{paymentWay.map((item, idx) => {
	// 						return (
	// 							<>
	// 								<Button
	// 									value={idx}
	// 									onClick={toggleActive}
	// 									selected={idx == btnActive ? true : false}
	// 								>
	// 									{item}
	// 								</Button>
	// 							</>
	// 						);
	// 					})}
	// 				</ButtonWrapper>
	// 				{btnActive == 0 ? (
	// 					<div>
	// 						<select>
	// 							<option>KB국민</option>
	// 							<option>신한카드</option>
	// 							<option>롯데카드</option>
	// 							<option>카카오뱅크</option>
	// 							<option>NH채움</option>
	// 							<option>현대카드</option>
	// 							<option>삼성카드</option>
	// 						</select>
	// 						{/* <RefundHolder>{product.user}</RefundHolder> */}
	// 						<RefundHolder>홍길동</RefundHolder>
	// 					</div>
	// 				) : (
	// 					<></>
	// 				)}
	// 				{btnActive == 1 ? (
	// 					<div>
	// 						<select>
	// 							<option>신한은행</option>
	// 							<option>기업은행</option>
	// 							<option>국민은행</option>
	// 							<option>우리은행</option>
	// 							<option>농협</option>
	// 							<option>수협</option>
	// 							<option>우체국</option>
	// 						</select>
	// 						{/* <RefundHolder>{product.user}</RefundHolder> */}
	// 						<RefundHolder>홍길동</RefundHolder>
	// 						<p>
	// 							가상 계좌 유효 기간{' '}
	// 							<span>
	// 								{product.date.getMonth()}년 {product.date.getMonth() + 1}월{' '}
	// 								{product.date.getDate() + 1}일 {product.date.getHours()}시 59분 59초
	// 							</span>
	// 						</p>
	// 					</div>
	// 				) : (
	// 					<></>
	// 				)}
	// 			</li>
	// 		</InfoWrapper>
	// 		{btnActive == 1 ? (
	// 			<RefundInfo>
	// 				<li>품절 시 환불 계좌</li>
	// 				<li>
	// 					<div>
	// 						<span>예금주</span>
	// 						<div>홍길동</div>
	// 					</div>
	// 					<div>
	// 						<span style={{ marginTop: '10px' }}>입금 은행</span>
	// 						<select>
	// 							<option>신한은행</option>
	// 							<option>기업은행</option>
	// 							<option>국민은행</option>
	// 							<option>우리은행</option>
	// 							<option>농협중앙회</option>
	// 							<option>수협</option>
	// 							<option>우체국</option>
	// 						</select>
	// 					</div>
	// 					<div>
	// 						<span>계좌 번호</span>
	// 						<input type="text" ref={refundAccount}></input>
	// 					</div>
	// 				</li>
	// 			</RefundInfo>
	// 		) : (
	// 			<DefalutInfo>
	// 				<div style={{ paddingBottom: '10px' }}>품절 시 환불 안내</div>
	// 				<div>
	// 					<span>결제하신 수단으로 취소됩니다.</span>
	// 					<ul>
	// 						<li>환불 받으신 날짜 기준으로 3~5일 후 환불 처리됩니다.</li>
	// 						<li>입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. </li>
	// 						<li>현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다.</li>
	// 					</ul>
	// 				</div>
	// 			</DefalutInfo>
	// 		)}

	// 		<InfoWrapper>
	// 			<li>주문자 동의</li>
	// 			<label htmlFor="checkAll">
	// 				<input
	// 					id="checkAll"
	// 					type="checkbox"
	// 					name="checkAll"
	// 					onClick={() => setAgreementChecked(!agreementChecked)}
	// 				/>
	// 				회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다
	// 			</label>
	// 		</InfoWrapper>
	// 	</OrderContainer>
	// 	<OrderButton agreement={agreementChecked} onClick={AccoutSubmitCheck}>
	// 		{product.price} 결제하기
	// 	</OrderButton>
	// 	{submit == true ? (
	// 		<Payment submit={submit} price={props.price} pay_method={btnActive} />
	// 	) : (
	// 		<></>
	// 	)}
	// </div>
};

export default Order;
