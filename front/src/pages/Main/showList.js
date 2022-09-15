import React, { useEffect, useState } from 'react';
import './styles';
// import { PostQueryApi, ApiTest } from 'utils/api';
// import InfiniteScroll from 'react-infinite-scroll-component';

const ShowList = props => {
	//옵션 데이터
	const options = ['S', 'M', 'L', 'XL'];
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
					<p></p>
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
						{options.map(size => (
							<li className={selected[idx] ? 'open' : 'close'}>{size}</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	));
};

export default ShowList;
