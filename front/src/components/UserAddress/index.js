import React, { useCallback } from 'react';
import { SignupAddress } from './styles';

const UserAddress = ({ props }) => {
	const { deliveryInfo, setDeliveryInfo, onChangeAddress } = props;

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

	return (
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
						<td>
							<p>수령인이 올바르지 않습니다.</p>
						</td>
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
						<td>
							<p>휴대전화가 올바르지 않습니다.</p>
						</td>
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
						<td>
							<p>전화번호가 올바르지 않습니다.</p>
						</td>
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
								<button type="button" className="btn-hover">
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
					<tr>
						<td></td>
						<td>
							<p>배송지 주소가 올바르지 않습니다.</p>
						</td>
					</tr>
				</tbody>
			</table>
		</SignupAddress>
	);
};

export default UserAddress;
