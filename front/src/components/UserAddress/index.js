import React from 'react';
import { SignupAddress } from './styles';

const UserAddress = () => {
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
							<input className="n-input" type="text" value="" />
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
							<input className="size-input" name="mobile1" type="text" value="" maxlength="3" />
							<span>-</span>
							<input className="size-input" name="mobile2" type="text" value="" maxlength="4" />
							<span>-</span>
							<input className="size-input" name="mobile3" type="text" value="" maxlength="4" />
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
							<input className="size-input" name="phone1" type="text" value="" maxlength="3" />
							<span>-</span>
							<input className="size-input" name="phone2" type="text" value="" maxlength="4" />
							<span>-</span>
							<input className="size-input" name="phone3" type="text" value="" maxlength="4" />
							<label className="check-labal">없음</label>
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
								<input className="n-input" type="text" value="" />
								<button type="button">검색</button>
							</div>
							<input className="n-input" type="text" value="" />
							<input className="n-input" type="text" value="" />
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
