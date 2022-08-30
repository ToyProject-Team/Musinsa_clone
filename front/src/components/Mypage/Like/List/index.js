import React, { useState } from 'react';
import { ImgSpan, LikeLi, LikeUl } from '../styles';
import { FaHeart } from 'react-icons/fa';

function Likelist({ img, brand, model, price, state, option, id }) {
	const [value, setValue] = useState('');

	const handleChange = ({ target: { value } }) => setValue(value);

	return (
		<LikeUl>
			<LikeLi>
				<ImgSpan>
					<img src={img} alt="더미데이터" />
				</ImgSpan>
				<ul>
					<li className="brand">{brand}</li>
					<li className="name">{model}</li>
					<li className="price">{price}원</li>
					<li className="like">
						<FaHeart /> 346
					</li>
				</ul>
			</LikeLi>
		</LikeUl>

	);
}

export default Likelist;
