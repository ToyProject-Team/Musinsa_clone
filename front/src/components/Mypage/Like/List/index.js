import React, { useState } from 'react';
import { ImgSpan, LikeLi, LikeUl } from '../styles';
import { FaHeart } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

function Likelist({ img, brand, model, price, like, onRemove }) {
	
	return (
		<LikeUl>
			<LikeLi>
				<ImgSpan>
					<img src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${img}`} alt="더미데이터" />
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
