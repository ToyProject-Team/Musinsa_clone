import React, { useState } from 'react';
import { ImgSpan, LikeLi, LikeUl } from '../styles';
import { FaHeart } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

function Likelist({ img, brand, model, price, state, option, id, like, onRemove }) {
	
	return (
		<LikeUl>
			<LikeLi>
				<ImgSpan>
					<img src={img} alt="더미데이터" />
				</ImgSpan>
				<ul>
					<li className="brand">{brand}</li>
					<li className="name">
						<a href="#">{model}</a>
					</li>
					<li className="price">{price}원</li>
					<li className="like">
						<FaHeart /> {like}
					</li>
				</ul>

				<button onClick={onRemove()}>
					<FiX />
				</button>
			</LikeLi>
		</LikeUl>
	);
}

export default Likelist;
