import React, { useState, useEffect, useCallback } from 'react';
import {
	MainContainer,
	Category,
	CategoryTitle,
	MiddleCategory,
	OtherCategory,
	CategoryName,
	ItemSection,
	Items,
	SelectBox,
	SortBox,
	ListBox,
} from './styles';
import { PostQueryApi } from 'utils/api';
import { useInView } from 'react-intersection-observer';

const Main = () => {
	const [product, setProduct] = useState();
	const [page, setPage] = useState(0);
	const [loading, setLoaing] = useState(false);

	// useEffect(() => {
	// 	getItems();
	// }, [getItems]);

	// useEffect(() => {
	// 	// 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
	// 	if (inView && !loading) {
	// 		setPage(prevState => prevState + 1);
	// 	}
	// }, [inView, loading]);

	useEffect(() => {
		const params = {
			page: page,
			// price: price,
			// priceMin: priceMin,
			// priceMax: priceMax,
			// bigCategoryId: bigCategoryId,
			// smallCategoryId: smallCategoryId,
		};

		PostQueryApi('/api/product/productList', params).then(res => setProduct(res.data.productData));
	}, [page]);

	//데이터 복사본
	const [newProduct, setNewProduct] = useState([]);

	const [selectBox, setSelectBox] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [minPriceInput, setMinPriceInput] = useState(0);
	const [maxPriceInput, setMaxPriceInput] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');

	const [toggle, setToggle] = useState(true);

	//중분류 분류
	const onSort = val => {
		PostQueryApi('/api/product/productList', { page }).then(res =>
			setNewProduct(
				res.data.productData.filter(data => {
					return data.productTitle === val;
				}),
			),
		);
		// setNewProduct(
		// 	newProduct.filter(data => {
		// 		return data.productTitle === val;
		// 	}),
		// );
		setToggle(false);
		setSelectBox(true);
	};

	//가격순 정렬
	//내림차순
	const onSortPriceDown = () => {
		const params = {
			page: page,
		};
		PostQueryApi('/api/product/productList', params).then(res =>
			setNewProduct(
				res.data.productData.sort((a, b) => {
					return b.productPrice - a.productPrice;
				}),
			),
		);

		setToggle(false);
	};

	//오름차순
	const onSortPriceUp = () => {
		const params = {
			page: page,
		};
		PostQueryApi('/api/product/productList', params).then(res =>
			setNewProduct(
				res.data.productData.sort((a, b) => {
					return a.productPrice - b.productPrice;
				}),
			),
		);
		setToggle(false);
	};

	//페이지 이동
	const onPage = () => {
		setPage(page + 1);
	};

	//가격별로 filter
	const onFilterPrice = val => {
		const params = {
			page: page,
			price: val,
		};
		PostQueryApi('/api/product/productList', params).then(res =>
			setNewProduct(res.data.productData),
		);
		setToggle(false);
	};

	const onFilterPriceRange = (val1, val2) => {
		const params = {
			page: page,
			priceMin: val1,
			priceMax: val2,
		};
		PostQueryApi('/api/product/productList', params).then(res =>
			setNewProduct(res.data.productData),
		);
		setToggle(false);
	};

	//검색창
	const onSearch = () => {
		const params = {
			page: page,
		};
		PostQueryApi('/api/product/productList', params).then(res =>
			setNewProduct(
				res.data.productData.filter(data =>
					data.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
				),
			),
		);
		setToggle(false);
	};

	return (
		<MainContainer>
			{/* 카테고리 */}
			<Category>
				<CategoryTitle>
					<div className="page_title" onClick={() => onPage()}>
						Bag
					</div>
					<div className="hash_tag">#노트북</div>
					<div className="hash_tag">#캐주얼</div>
				</CategoryTitle>

				<MiddleCategory>
					<CategoryName>
						<div>중분류</div>
						<div>
							<form>
								<input
									type="text"
									title="검색"
									onChange={e => {
										setSearchInput(e.target.value.toLowerCase());
									}}
								></input>
								<img src="https://image.msscdn.net/skin/musinsa/images/search_grey_14.gif"></img>
							</form>
						</div>
					</CategoryName>
					<div
						className="all_item"
						onClick={() => {
							// PostQueryApi('/api/product/productList', { page }).then(res =>
							// 	setProduct(res.data.productData),
							// );
							setToggle(true);
						}}
					>
						전체
					</div>
					<div className="all_item_list">
						<ul>
							{product
								?.map(data => data.productTitle)
								.filter((val, idx) => product?.map(data => data.productTitle).indexOf(val) === idx)
								.filter(val => {
									if (searchInput === '') return val;
									else if (val.toLowerCase().includes(searchInput)) return val;
								})
								.map(data => {
									return <li onClick={e => onSort(e.target.textContent)}>{data}</li>;
								})}
						</ul>
					</div>
				</MiddleCategory>

				<OtherCategory>
					<CategoryName>색상</CategoryName>
					<div className="color">
						<ul>
							<li>..빨강</li>
							<li>..파랑</li>
						</ul>
					</div>
				</OtherCategory>

				<OtherCategory>
					<CategoryName>가격</CategoryName>
					<div className="price">
						<ul>
							<li
								style={{ fontWeight: 'bold', color: 'black' }}
								onClick={() => {
									// PostQueryApi('/api/product/productList', { page }).then(res =>
									// 	setNewProduct(res.data.productData),
									// );
									setToggle(true);
								}}
							>
								전체보기
							</li>
							<li onClick={() => onFilterPrice(1)}>~ 50,000원</li>
							<li onClick={() => onFilterPrice(2)}>50,000원 ~ 100,000원</li>
							<li onClick={() => onFilterPrice(3)}>100,000원 ~ 200,000원</li>
							<li onClick={() => onFilterPrice(4)}>200,000원 ~ 300,000원</li>
							<li onClick={() => onFilterPrice(5)}>300,000원 ~</li>
							<li style={{ width: '248px' }}>
								<input
									className="minPrice"
									type="text"
									onChange={e => setMinPriceInput(e.target.value)}
								></input>
								<span>원 ~</span>
								<input
									className="maxPrice"
									type="text"
									onChange={e => setMaxPriceInput(e.target.value)}
								></input>
								<span>원</span>
								<span
									type="submit"
									className="search_btn"
									onClick={() => {
										onFilterPriceRange(minPriceInput, maxPriceInput);
									}}
								>
									검색
								</span>
							</li>
						</ul>
					</div>
				</OtherCategory>

				<OtherCategory>
					<CategoryName>검색</CategoryName>
					<div className="search_items">
						<input type="text" id="search_items" onChange={e => setSearchTerm(e.target.value)} />
						<span type="submit" className="search_btn" onClick={() => onSearch()}>
							검색
						</span>
					</div>
				</OtherCategory>
			</Category>

			{/* Item List - 컴포넌트로 따로 빼기 */}
			<ItemSection>
				{selectBox === true ? (
					<SelectBox
						onClick={() => {
							setSelectBox(false);
						}}
					>
						<span className="select-medium">중분류: {}</span>
						<span className="select-medium-button">&#160;X</span>
					</SelectBox>
				) : null}

				<Items>
					<SortBox>
						<span className="sort">무신사 추천순</span>
						<span className="sort">신상품(재입고)순</span>
						<span className="sort" onClick={() => onSortPriceUp()}>
							낮은 가격순
						</span>
						<span className="sort" onClick={() => onSortPriceDown()}>
							높은 가격순
						</span>
						<span className="sort">할인율순</span>
						<span className="sort">후기순</span>
						<span className="sort">판매순</span>
					</SortBox>
					<ListBox>
						<ul className="list_item">
							{toggle
								? product?.map(data => (
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
												<span>성별</span>
												<span className="option_btn">OPTION ▼</span>
											</div>
										</li>
								  ))
								: newProduct.map(data => (
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
												<span>성별</span>
												<span className="option_btn">OPTION ▼</span>
											</div>
										</li>
								  ))}
							{/* <ShowList product={product} /> */}
						</ul>
					</ListBox>
				</Items>
			</ItemSection>
		</MainContainer>
	);
};

export default Main;
