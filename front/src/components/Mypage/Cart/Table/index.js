import React, { createContext, useCallback, useEffect, useState } from "react";
import { ImgSpan } from '../styles';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';


function CartTable({img, brand, model, price, state, option, checkedItems, setCheckedItems, id, test, }) {

	// input 입력 
	const [value, setValue] = useState('1');
	const handleChange = ({ target: { value } }) => setValue(value);

	// 개별 체크박스
	const onChecked = useCallback(
		(checked, id) =>{
		  if(checked) {
			setCheckedItems([...checkedItems, id]);
		  } else {
			setCheckedItems(checkedItems.filter((el) => el !== id));
		  }
		checked === true && test()
		},
		[checkedItems],
	  );


	return (
		<tbody>
			<tr>
				<td colSpan="7" className='cart_cont'>
					<table>
						<colgroup>
							<col width="3.62%"/>
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
									<input name="oncheck" type="checkbox" checked={checkedItems.includes(id) ? true : false} 
									onChange={ e => onChecked(e.target.checked, id, price)} />
									</label>
								</td>
								<td className='top'>
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
									<div className='input_amount'>
									<button><FiMinus /></button>
									<input type="text" value={value} onChange={handleChange}></input>
									<button><FiPlus /></button>
									</div>					
								</td>
								<td>{price}원</td>
								<td>{state}</td>
								<td>
									<div>
										<a href='' className='btn'>결제하기</a>
										<a href='' className='del_btn'><FiX /></a>
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
