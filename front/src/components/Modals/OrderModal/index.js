import Modal from 'components/Modals/Modal';
import { ButtonContainer, Button } from 'components/Modals/Modal/style';
import React from 'react';
import { getData } from 'utils/getData';
import { Address, Price } from './style';

const OrderModal = ({ show, onCloseModal, onClickConfirm, price }) => {
	const data = getData();
	const { userData } = data;

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
			<ButtonContainer>
				<Button className="button" onClick={onCloseModal}>
					취소
				</Button>
				<Button className="button" onClick={onClickConfirm}>
					확인
				</Button>
			</ButtonContainer>
		</Modal>
	);
};

export default OrderModal;
