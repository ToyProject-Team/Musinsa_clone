import SearchAddressModal from 'components/SearchAddressModal';
import React, { useCallback, useState } from 'react';
import { SignupAddress } from './styles';

const UserAddress = ({ props }) => {
	const { deliveryInfo, setDeliveryInfo } = props;
	const [modalAddress, setModalAddress] = useState(false);
	const [nameReg, setNameReg] = useState(false);
	const [mobileReg, setMobileReg] = useState(false);
	const [phoneReg, setPhoneReg] = useState(false);

	const onClickPhoneHave = useCallback(
		e => {
			const name = e.target.name;

			setDeliveryInfo(preState => ({
				...preState,
				[name]: !preState[name],
				phone1: '',
				phone2: '',
				phone3: '',
			}));
		},
		[deliveryInfo],
	);

	const onCloseModal = useCallback(() => {
		setModalAddress(false);
	}, []);

	const onClickSearch = useCallback(() => {
		setModalAddress(true);
	}, []);

	const onChangeAddress = useCallback(e => {
		const name = e.target.name;
		const value = e.target.value;

		if (name === 'name' && value.trim().length > 0) {
			setNameReg(true);
		} else if (name === 'name' && value.trim().length === 0) {
			setNameReg(false);
		}

		if (
			(name === 'mobile1' && value.trim().length > 0) ||
			(name === 'mobile2' && value.trim().length > 0) ||
			(name === 'mobile3' && value.trim().length > 0)
		) {
			setMobileReg(true);
		} else if (
			(name === 'mobile1' && value.trim().length === 0) ||
			(name === 'mobile2' && value.trim().length === 0) ||
			(name === 'mobile3' && value.trim().length === 0)
		) {
			setMobileReg(false);
		}

		if (
			(name === 'phone1' && value.trim().length > 0) ||
			(name === 'phone2' && value.trim().length > 0) ||
			(name === 'phone3' && value.trim().length > 0)
		) {
			setPhoneReg(true);
		} else if (
			(name === 'phone1' && value.trim().length === 0) ||
			(name === 'phone2' && value.trim().length === 0) ||
			(name === 'phone3' && value.trim().length === 0)
		) {
			setPhoneReg(false);
		}

		setDeliveryInfo(prevState => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	return (
		<>
			<SignupAddress>
				<label>
					배송지 정보
					<span>필수 입력</span>
				</label>
				<table>
					<colgroup>
						<col style={{ width: '90px' }} />
						<col style={{ width: '100%' }} />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">수령인</th>
							<td>
								<input
									className="n-input"
									type="text"
									name="name"
									value={deliveryInfo.name}
									onChange={onChangeAddress}
								/>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>{!nameReg && <p>수령인은 필수값입니다.</p>}</td>
						</tr>
						<tr>
							<th scope="row">휴대전화</th>
							<td>
								<input
									className="size-input"
									name="mobile1"
									type="text"
									value={deliveryInfo.mobile1}
									onChange={onChangeAddress}
									maxLength="3"
								/>
								<span>-</span>
								<input
									className="size-input"
									name="mobile2"
									type="text"
									value={deliveryInfo.mobile2}
									onChange={onChangeAddress}
									maxLength="4"
								/>
								<span>-</span>
								<input
									className="size-input"
									name="mobile3"
									type="text"
									value={deliveryInfo.mobile3}
									onChange={onChangeAddress}
									maxLength="4"
								/>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>{!mobileReg && <p>휴대전화는 필수값입니다.</p>}</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td>
								<input
									className={deliveryInfo.phone ? 'size-input' : 'size-input readonly-input'}
									name="phone1"
									type="text"
									value={deliveryInfo.phone1}
									onChange={onChangeAddress}
									maxLength="3"
									readOnly={deliveryInfo.phone ? false : true}
								/>
								<span>-</span>
								<input
									className={deliveryInfo.phone ? 'size-input' : 'size-input readonly-input'}
									name="phone2"
									type="text"
									value={deliveryInfo.phone2}
									onChange={onChangeAddress}
									maxLength="4"
									readOnly={deliveryInfo.phone ? false : true}
								/>
								<span>-</span>
								<input
									className={deliveryInfo.phone ? 'size-input' : 'size-input readonly-input'}
									name="phone3"
									type="text"
									value={deliveryInfo.phone3}
									onChange={onChangeAddress}
									maxLength="4"
									readOnly={deliveryInfo.phone ? false : true}
								/>
								<label
									htmlFor="phone"
									className={deliveryInfo.phone ? 'check-labal' : 'check-labal active'}
								>
									<input
										onClick={e => onClickPhoneHave(e)}
										style={{ display: 'none' }}
										id="phone"
										type="checkbox"
										name="phone"
										value={deliveryInfo.phone}
									/>
									없음
								</label>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>{deliveryInfo.phone && !phoneReg && <p>전화번호는 필수값입니다.</p>}</td>
						</tr>
						<tr>
							<th scope="row">배송지 주소</th>
							<td className="address-input">
								<div>
									<input
										className="n-input readonly-input radius-left"
										type="text"
										name="address1"
										value={deliveryInfo.address1}
										onChange={onChangeAddress}
										readOnly
									/>
									<button type="button" className="btn-hover" onClick={onClickSearch}>
										검색
									</button>
								</div>
								<input
									className="n-input readonly-input"
									type="text"
									name="address2"
									value={deliveryInfo.address2}
									onChange={onChangeAddress}
									readOnly
								/>
								<input
									className="n-input"
									type="text"
									name="address3"
									value={deliveryInfo.address3}
									onChange={onChangeAddress}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</SignupAddress>
			<SearchAddressModal
				show={modalAddress}
				onCloseModal={onCloseModal}
				setDeliveryInfo={setDeliveryInfo}
			></SearchAddressModal>
		</>
	);
};

export default UserAddress;
