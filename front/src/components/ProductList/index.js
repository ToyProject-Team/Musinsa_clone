import React, { useEffect, useState } from 'react';
import { ListOuter, PaginationWapper } from './styles';
import Pagination from 'react-js-pagination';

const ShowList = props => {
	//페이지네이션
	// const [page, setPage] = useState(1);
	// const [items, setItems] = useState(18);
	// const handlePageChange = page => {
	// 	setPage(page);
	// };
	// const length = props.product.length;

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
			{/* <PaginationWapper>
				<Pagination
					activePage={page}
					itemsCountPerPage={items}
					totalItemsCount={length}
					pageRangeDisplayed={10}
					onChange={handlePageChange}
					hideNavigation={true}
					hideFirstLastPages={true}
				/>
			</PaginationWapper> */}
			<div>
				{props.product.length === 0 ? (
					<div style={{ 'font-size': '20px', padding: '15px' }}>해당하는 상품이 없습니다.</div>
				) : (
					props.product.map((data, idx) => (
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
										{data.ProductSizes.map(data => (
											<li className={selected[idx] ? 'open' : 'close'}>
												<span>{data.size}</span>
												<span>{data.amount}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</ListOuter>
					))
				)}
			</div>
		</>
	);
};

export default ShowList;
