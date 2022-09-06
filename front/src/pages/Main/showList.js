import React, { useState } from 'react';
import './styles';

const ShowList = props => {
	return props.product?.map(data => (
		<li className="li_outer">
			<div className="li_inner">
				<div className="list_img">
					<a href={`/detail?productId=${data.id}`}>
						<img
							src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${data.ProductImg.src}`}
						></img>
					</a>
				</div>
				<div className="item_info">
					<p></p>
					<p>{data.productTitle}</p>
					<p>{data.productPrice.toLocaleString('ko-KR')}원</p>
					<p>MEMBERSHIP PRICE</p>
					<p>...</p>
				</div>
			</div>
			<div className="option">
				<span className="option_btn">OPTION ▼</span>
				{/* <div className="option_size">
					<ul>
						<li>{data.productSizes.size}</li>
					</ul>
				</div> */}
			</div>
		</li>
	));
};

export default ShowList;
