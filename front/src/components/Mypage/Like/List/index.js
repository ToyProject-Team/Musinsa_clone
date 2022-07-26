import React, { useState } from 'react';
import { ImgSpan, LikeLi, LikeUl } from '../styles';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { thousandComma } from 'utils/thousandComma';

function Likelist({ img, model, price, like, onRemove, id }) {
	return (
		<LikeUl>
			<LikeLi>
				<ImgSpan>
					<a href={`/detail?productId=${id}`}>
						<img
							src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${img}`}
							alt="더미데이터"
						/>
					</a>
				</ImgSpan>

				<ul>
					<li className="name">
						<a href={`/detail?productId=${id}`}>{model}</a>
					</li>
					<li className="price">{thousandComma(price)}원</li>
					<li className="like">
						<FaHeart /> {like}
					</li>
				</ul>
				<button onClick={e => onRemove(id)}>
					<FiX />
				</button>
			</LikeLi>
		</LikeUl>
	);
}

export default Likelist;
