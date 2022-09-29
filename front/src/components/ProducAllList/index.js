import React, { useState } from 'react';
import { ListOuter } from './styles';

const AllList = props => {
	//페이지네이션 관련

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

	return (
		<>
			{props.product.length === 0 ? (
				<div style={{ 'font-size': '20px', padding: '15px' }}>해당하는 상품이 없습니다.</div>
			) : (
				props.product
					.slice(props.items * (props.page - 1), props.items * (props.page - 1) + props.items)
					.map((data, idx) => (
						<ListOuter>
							<div className="li_inner" key={idx}>
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
									<ul style={selected[idx] ? { display: 'block' } : { display: 'none' }}>
										{data.ProductMainTags.map(data => (
											<li className={selected[idx] ? 'open' : 'close'}>
												<span>{data.name}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</ListOuter>
					))
			)}
		</>
	);
};

export default AllList;
