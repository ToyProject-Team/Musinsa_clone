import React, { useEffect, useState } from 'react';
import './styles';

const ShowList = props => {
	//옵션 데이터
	const [arrow, setArrow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(Array(props.product.length).fill(false));

	const clickOption = idx => {
		const newArr = selected;
		if (selected.includes(true)) {
			newArr[selected.indexOf(true)] = false;
		} else {
			newArr[idx] = true;
		}
		setSelected(newArr);
	};

	// useEffect(() => {
	// 	console.log(props.product[0].ProductSizes[0].size);
	// });

	return props.product?.map((data, idx) => (
		<li className="li_outer" key={idx}>
			<div className="li_inner">
				<div className="list_img">
					<a href={`/detail?productId=${data.id}`}>
						<img
							src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${data.ProductImg.src}`}
						></img>
					</a>
				</div>
				<div className="item_info">
					<p>{data.productTitle}</p>
					<p>{data.productPrice.toLocaleString('ko-KR')}원</p>
					<p>MEMBERSHIP PRICE</p>
				</div>
			</div>
			<div className="option">
				<p
					className="option_btn"
					onClick={() => {
						clickOption(idx);
						setArrow(!arrow);
						setIsOpen(!isOpen);
					}}
				>
					{selected[idx] ? 'OPTION ▲' : 'OPTION ▼'}
				</p>
				<div className="option_list">
					<ul>
						{data.ProductSizes.map(data => (
							<li className={selected[idx] ? 'open' : 'close'}>
								<span>{data.size}</span>
								<span>{data.amount}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	));
};

export default ShowList;
