import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ImgSpan } from '../styles';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';

function CartTable({
	img,
	brand,
	model,
	price,
	state,
	option,
	checkedItems,
	setCheckedItems,
	setSelectedPrice,
	selectedPrice,
	id,
}) {
	// 수량변경
	// input 입력
	const [amount, setAmount] = useState(price);
	const [value, setValue] = useState(1);
	const handleChange = ({ target: { value } }) => setValue(value);

	let priceidx = checkedItems.findIndex(el => el === id);

	const plusCount = () => {
		setValue(value + 1);
		setSelectedPrice([selectedPrice[priceidx] + price]);
		setAmount(amount + price);
	};

	const minusCount = () => {
		if (value === 1) {
			alert('수량을 줄일 수 없습니다.');
		} else {
			setValue(value - 1);
			setSelectedPrice([selectedPrice[priceidx] - price]);
			setAmount(amount - price);
		}
	};

	// 개별 체크박스
	const onChecked = useCallback(
		(checked, id) => {
			if (checked) {
				setCheckedItems([...checkedItems, id]);
				setSelectedPrice(prev => [...prev, price]);
			} else {
				setCheckedItems(checkedItems.filter(el => el !== id));
				setSelectedPrice(prev => prev.filter(el => el !== price));
			}
		},
		[checkedItems],
	);

	return (
		<tbody>
			<tr>
				<td colSpan="7" className="cart_cont">
					<table>
						<colgroup>
							<col width="3.62%" />
							<col width="*" />
							<col width="9.5%" />
							<col width="12%" />
							<col width="9.5%" />
							<col width="17.3%" />
							<col width="12%" />
						</colgroup>
						<tbody>
							<tr>
								<td>
									<label key={id}>
										<input
											name="oncheck"
											type="checkbox"
											checked={checkedItems.includes(id) ? true : false}
											onChange={e => onChecked(e.target.checked, id, price)}
										/>
									</label>
								</td>
								<td className="top">
									<div>
										<ImgSpan>
											<img src={img} alt="더미데이터" />
										</ImgSpan>
										<ul>
											<li>{brand}</li>
											<li>
												<strong>{model}</strong>
											</li>
											<li>{option}</li>
										</ul>
									</div>
								</td>
								<td> {price}원</td>
								<td>
									<div className="input_amount">
										<button value={value} onClick={minusCount}>
											<FiMinus />
										</button>
										<input type="text" value={value} onChange={handleChange}></input>
										<button value={value} onClick={plusCount}>
											<FiPlus />
										</button>
									</div>
								</td>
								<td>{amount}원</td>
								<td>{state}</td>
								<td>
									<div>
										<a href="" className="btn">
											결제하기
										</a>
										<a href="" className="del_btn">
											<FiX />
										</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	);
}

export default CartTable;