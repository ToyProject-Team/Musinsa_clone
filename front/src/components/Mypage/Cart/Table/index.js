import React, { useState } from 'react';
import { ImgSpan } from '../styles';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';

function Tr({data}) {
  const [value, setValue] = useState('');
  const handleChange = ({ target: { value } }) => setValue(value);

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
									<input type="checkbox" id='cart_check' checked></input>
									<label for='cart_check'></label>
								</td>
								<td className='top'>
									<div>
									<ImgSpan>
										<img src={data.ProductImg} alt="더미데이터" />
									</ImgSpan>
									<ul>
										<li>{data.ProductCompany}</li>
										<li>
											<strong>{data.ProductName}</strong>
										</li>
										<li>{data.ProductOption}</li>
									</ul>
									</div>
								</td>
								<td>{data.ProductPrice}원</td>
								<td>
									<div className='input_amount'>
									<button><FiMinus /></button>
									<input type="text" value={value} onChange={handleChange}></input>
									<button><FiPlus /></button>
									</div>					
								</td>
								<td>{data.ProductPrice}원</td>
								<td>{data.Orderstatus}</td>
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

export default Tr;
