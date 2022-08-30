import React, { useState } from 'react';
import './styles';

const NewList = props => {
	return props.newProduct?.map(data => (
		<li className="li_outer">
			<div className="li_inner">
				<div className="list_img">
					<a href="/detail">
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
			</div>
		</li>
	));
};

export default NewList;
