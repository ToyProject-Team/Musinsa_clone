import React, { useState } from 'react';
import { ImgSpan } from '../styles';

function Tr({ data }) {
	const [value, setValue] = useState('');

	const handleChange = ({ target: { value } }) => setValue(value);

	return (
		<tbody>
			<tr>
				<td>
					<ImgSpan>
						<img src={data.ProductImg} alt="더미데이터" width="50px" height="50px" />
					</ImgSpan>
					<ul>
						<li>{data.ProductCompany}</li>
						<li>
							<strong>{data.ProductName}</strong>
						</li>
						<li>{data.ProductOption}</li>
					</ul>
				</td>
				<td>{data.ProductPrice}</td>
				<td>
					<input type="text" value={value} onChange={handleChange}></input>
				</td>
				<td>
					<input type="number" min="0" value={value} onChange={handleChange}></input>
				</td>
				<td>{data.ProductPrice}</td>
				<td colSpan="2">{data.Orderstatus}</td>
			</tr>
			{/* {
            data.map(item => {
                return (
                    <Td key={data.id} item={item}  />
                )
            })
        } */}
		</tbody>
	);
}

export default Tr;
