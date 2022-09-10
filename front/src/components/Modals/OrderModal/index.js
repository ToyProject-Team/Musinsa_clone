import { RadioButton, RadioItem } from 'components/FindPage/UserFindAuth/styles';
import Modal from 'components/Modals/Modal';
import { ButtonContainer, Button } from 'components/Modals/Modal/style';
import {
	ORDER,
	useProductDetailDispatch,
	useProductDetailState,
} from 'context/ProductDetailContext';
import React from 'react';
import { useCallback } from 'react';
import { getData } from 'utils/getData';
import { Address, Price, RadioContainer } from './style';

const OrderModal = ({ show, onCloseModal, onClickConfirm, price }) => {
	const detail = useProductDetailState();
	const dispatch = useProductDetailDispatch();

	const data = getData();
	const { userData } = data;

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	const onChangeRadio = useCallback(e => {
		const { value } = e.target;
		console.log(e.target);
		changeDispatch(ORDER, { pay: value });
	}, []);

	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Price>
				<strong>총 {price}원</strong> 입니다.
				<br /> 결제를 진행하기겠습니까?
			</Price>
			<Address>
				<label>
					Recipient Info <b>수령자 정보</b>
				</label>
				<table>
					<colgroup>
						<col style={{ width: '110px' }} />
						<col style={{ width: '100%' }} />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">수령인</th>
							<td>허허</td>
						</tr>
						<tr>
							<th scope="row">휴대전화</th>
							<td>010-1234-5678</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td>010-1234-5678</td>
						</tr>
						<tr>
							<th scope="row">배송지 주소</th>
							<td className="address-input">{userData.address}</td>
						</tr>
					</tbody>
				</table>
			</Address>
			<RadioContainer>
				<RadioItem>
					<RadioButton>
						<label
							htmlFor="card"
							className={detail.order.pay === 'card' ? 'radio-label active' : 'radio-label'}
						>
							신용카드
						</label>
						<input type="radio" value="card" id="card" onChange={onChangeRadio} name="order" />
					</RadioButton>
				</RadioItem>
				<RadioItem>
					<RadioButton>
						<label
							htmlFor="kakao"
							className={detail.order.pay === 'kakao' ? 'radio-label active' : 'radio-label'}
						>
							카카오페이
						</label>
						<input type="radio" value="kakao" id="kakao" onChange={onChangeRadio} name="order" />
					</RadioButton>
				</RadioItem>
				<RadioItem>
					<RadioButton>
						<label
							htmlFor="naver"
							className={detail.order.pay === 'naver' ? 'radio-label active' : 'radio-label'}
						>
							네이버페이
						</label>
						<input type="radio" value="naver" id="naver" onChange={onChangeRadio} name="order" />
					</RadioButton>
				</RadioItem>
				<RadioItem>
					<RadioButton>
						<label
							htmlFor="payco"
							className={detail.order.pay === 'payco' ? 'radio-label active' : 'radio-label'}
						>
							페이코
						</label>
						<input type="radio" value="payco" id="payco" onChange={onChangeRadio} name="order" />
					</RadioButton>
				</RadioItem>
			</RadioContainer>
			<ButtonContainer>
				<Button className="button" onClick={onCloseModal}>
					취소
				</Button>
				<Button className="button" onClick={onClickConfirm}>
					결제하기
				</Button>
			</ButtonContainer>
		</Modal>
	);
};

export default OrderModal;