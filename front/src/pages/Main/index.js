import React, { useState, useEffect, useCallback } from 'react';
import {
	ScrollContainer,
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

import { Router, Route, Routes, useNavigate } from 'react-router-dom';
// import qs from 'qs';
import { PostQueryApi } from 'utils/api';
import loadable from '@loadable/component';
import Header from 'layouts/Header';
import { bigCategory } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sidebar from 'layouts/Sidebar';

const Main = () => {
	const navigate = useNavigate();

	const ShowList = loadable(() => import('./showList'), {
		fallback: <div>로딩중</div>,
	});

	const NewList = loadable(() => import('./newList'), {
		fallback: <div>로딩중</div>,
	});

	//데이터 저장할 state(원본 담을 state/조건추가시 필터된 데이터 담을 state)
	const [product, setProduct] = useState([]);
	const [newProduct, setNewProduct] = useState([]);

	//params
	const [mainSort, setMainSort] = useState();
	const [page, setPage] = useState(0);
	const [price, setPrice] = useState(0);
	const [priceMin, setPriceMin] = useState(0);
	const [priceMax, setPriceMax] = useState(100000000);
	const [bigCategoryId, setBigCategoryId] = useState(1);
	const [smallCategoryId, setSmallCategoryId] = useState(1);

	//데이터 받아오기 1
	//첫화면은 mainSort, price 적용안해야 랜덤으로 데이터 받음
	const getMoreItems = () => {
		const params = {
			page,
			bigCategoryId,
			smallCategoryId,
		};
		//setPage(page+1) 했었는데 prev가 반영안됐으
		//페이지 + 1하고  나머지 params들은 리셋
		PostQueryApi('/api/product/productList', params).then(
			res => setProduct(prev => [...prev, ...res.data.productData]),

			// navigate('/'),
		);
		setPage(page + 1);
	};

	useEffect(() => {
		getMoreItems();
	}, []);

	//스크롤

	//중분류 전체보기(리셋)
	const onReset = () => {
		navigate('/');
	};

	// //가격 전체보기(리셋)
	// const onResetPrice = () => {
	// 	navigate('/');
	// };
	//props.product[0].ProductSizes[0].size

	//검색창 input들 state
	const [searchInput, setSearchInput] = useState('');
	const [minPriceInput, setMinPriceInput] = useState();
	const [maxPriceInput, setMaxPriceInput] = useState();
	const [searchTerm, setSearchTerm] = useState('');

	//sort박스 토글
	// const [choice, setChoice] = useState(false);
	const [selectBox, setSelectBox] = useState(false);
	const [secondSelectBox, setSecondSelectBox] = useState(false);
	const [selectTitle, setSelectTitle] = useState();
	const [selectPrice, setSelectPrice] = useState();

	//중분류 분류 2
	//onSort버튼 클릭 -> params 값 전송 -> url에 박아넣기 구현..
	const [onSortClick, setOnSortClick] = useState(false);

	const onSort = val => {
		// 		const params = {
		// 	page,
		// 	bigCategoryId,
		// 	smallCategoryId,
		// };
		// // 백엔드 데이터에 상품명이 없기 때문에 쿼리스트링으로 못넣음
		// setNewProduct(
		// 	res.data.productData.filter(data => {
		// 		return data.productTitle === val;
		// 	}),
		// ),
		// PostQueryApi('/api/product/productList', params).then(
		// 	res =>
		// 		setNewProduct(
		// 			res.data.productData.filter(data => {
		// 				return data.productTitle === val;
		// 			}),
		// 		),
		// 	navigate(`/products`),
		// );

		setNewProduct(
			product.filter(data => {
				return data.productTitle === val;
			}),
		);

		navigate(`/products`);

		setSearchInput('');
		setSelectBox(true);
		setOnSortClick(true);
		setSelectTitle(val);
	};

	//가격별로 분류 3
	const priceBox = val => {
		return val === 1
			? setSelectPrice('~ 50,000원')
			: val === 2
			? setSelectPrice('50,000원 ~ 100,000원')
			: val === 3
			? setSelectPrice('100,000원 ~ 200,000원')
			: val === 4
			? setSelectPrice('200,000원 ~ 300,000원')
			: val === 5
			? setSelectPrice('300,000원 ~')
			: null;
	};

	const onFilterPrice = val => {
		setPrice(val);
		const params = {
			page,
			price: val,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi(`/api/product/productList`, params).then(res => {
			setNewProduct(res.data.productData);
		});
		navigate(`/products?price=${params.price}`);
		priceBox(val);
		setSecondSelectBox(true);
		console.log(product);
		console.log(newProduct);
	};

	//가격별로 분류 4
	const onFilterPriceRange = (val1, val2) => {
		setPriceMin(val1);
		setPriceMax(val2);
		setMinPriceInput('');
		setMaxPriceInput('');

		const params = {
			// mainSort,
			page,
			priceMin: val1,
			priceMax: val2,
			bigCategoryId,
			smallCategoryId,
		};

		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			navigate(`/products?priceMin=${params.priceMin}&&priceMax=${params.priceMax}`),
		);
	};

	//검색창 5
	const onSearch = () => {
		// const params = {
		// 	// mainSort,
		// 	page,
		// 	price,
		// 	bigCategoryId,
		// 	smallCategoryId,
		// };
		// PostQueryApi('/api/product/productList', params).then(
		// 	res =>
		// 		setProduct(
		// 			res.data.productData.filter(data =>
		// 				data.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
		// 			),
		// 		),
		// 	navigate(`/products?search=${searchTerm}`),
		// );
		return (
			setNewProduct(
				product.filter(data => data.productTitle.toLowerCase().includes(searchTerm.toLowerCase())),
			),
			navigate(`/products?search=${searchTerm}`),
			setSearchTerm('')
		);
	};

	//가격순 정렬
	//내림차순 6
	const onSortPriceDown = () => {
		const params = {
			page,
			// price,
			mainSort: 2,
			bigCategoryId,
			smallCategoryId,
		};
		//정렬 - 백엔
		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			navigate(`/products?mainSort=${params.mainSort}`),
		);
	};

	//오름차순 7
	const onSortPriceUp = () => {
		const params = {
			page,
			// price,
			mainSort: 1,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			navigate(`/products?mainSort=${params.mainSort}`),
		);
	};

	//후기순 정렬 sort함수사용 8
	const onSortComments = () => {
		const params = {
			page,
			// price,
			mainSort: 3,
			bigCategoryId,
			smallCategoryId,
		};

		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			navigate(`/products?mainSort=${params.mainSort}`),
		);
	};

	return (
		<>
			<InfiniteScroll
				dataLength={page}
				next={getMoreItems}
				// width={'1200px'}
				hasMore={page < 38 ? true : false}
				height={document.documentElement.scrollHeight}
				loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
				scrollThreshold="0px" // 뷰포트가 스크롤영역 하단에서 0px 미만일때 이벤트를 트리거
				endMessage={<div style={{ textAlign: 'center' }}>더이상 상품이 없습니다.</div>}
				// style={{ 'scrollbar-width': 'none' }}
			>
				<Header></Header>
				<Sidebar></Sidebar>
				<ScrollContainer>
					<MainContainer>
						{/* 카테고리 */}
						<Category>
							<CategoryTitle>
								<div
									className="page_title"
									onClick={() => {
										// pageTest();
										navigate(`/`);
										setPage(0);
										setPrice();
										setMainSort();
									}}
								>
									{bigCategory[bigCategoryId]}
								</div>
								<div className="hash_tag">#{bigCategory[bigCategoryId]}</div>
								<div className="hash_tag">
									#{smallCategory[smallCategoryId][Math.floor(Math.random() * 10)]}
								</div>
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
												value={searchInput}
											></input>
											<img src="https://image.msscdn.net/skin/musinsa/images/search_grey_14.gif"></img>
										</form>
									</div>
								</CategoryName>
								<div
									className="all_item"
									onClick={() => {
										onReset();
									}}
									style={{ color: 'black', 'font-weight': 'bold' }}
								>
									전체
								</div>
								<div className="all_item_list">
									<ul>
										{product
											?.map(data => data.productTitle)
											.filter(
												(val, idx) => product?.map(data => data.productTitle).indexOf(val) === idx,
											)
											.filter(val => {
												if (searchInput === '') return val;
												else if (val.toLowerCase().includes(searchInput)) return val;
											})
											.map((data, idx) => {
												return <li onClick={e => onSort(e.target.textContent)}>{data}</li>;
											})}
									</ul>
								</div>
							</MiddleCategory>

							<OtherCategory>
								<CategoryName>가격</CategoryName>
								<div className="price">
									<ul>
										<li
											onClick={() => {
												onReset();
											}}
											style={{ color: 'black', fontWeight: 'bold' }}
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
												onChange={e => {
													setMinPriceInput(e.target.value);
												}}
												value={minPriceInput}
											></input>
											<span>원 ~</span>
											<input
												className="maxPrice"
												type="text"
												onChange={e => setMaxPriceInput(e.target.value)}
												value={maxPriceInput}
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
									<input
										type="text"
										id="search_items"
										value={searchTerm}
										onChange={e => setSearchTerm(e.target.value)}
									/>
									<span type="submit" className="search_btn" onClick={() => onSearch()}>
										검색
									</span>
								</div>
							</OtherCategory>
						</Category>

						<ItemSection>
							<SelectBox>
								<div
									className={selectBox ? 'visible' : 'invisible'}
									onClick={() => {
										setSelectBox(false);
										const params = {
											page,
											//price,
											bigCategoryId,
											smallCategoryId,
										};

										{
											onSortClick
												? PostQueryApi(`/api/product/productList`, params).then(
														res =>
															setNewProduct(
																res.data.productData.filter(data => {
																	return data.productTitle === selectTitle;
																}),
															),
														navigate('/products'),
												  )
												: navigate('/');
										}

										console.log(newProduct);
									}}
								>
									<span className="select-medium">{selectTitle}</span>
									<span className="select-medium-button">&#160;X</span>
								</div>
								<div
									className={secondSelectBox ? 'visible' : 'invisible'}
									onClick={() => {
										setSecondSelectBox(false);
										const params = {
											page,
											bigCategoryId,
											smallCategoryId,
										};

										PostQueryApi(`/api/product/productList`, params).then(res => {
											onSortClick
												? setNewProduct(
														res.data.productData.filter(data => {
															return data.productTitle === selectTitle;
														}),
												  )
												: setNewProduct(res.data.productData);
										}, navigate('/products'));
									}}
								>
									<span className="select-medium">{selectPrice}</span>
									<span className="select-medium-button">&#160;X</span>
								</div>
							</SelectBox>

							<Items>
								<SortBox>
									<div>
										<span className="sort" onClick={() => onSortPriceUp()}>
											낮은 가격순
										</span>
										<span className="sort" onClick={() => onSortPriceDown()}>
											높은 가격순
										</span>
										<span className="sort" onClick={() => onSortComments()}>
											후기순
										</span>
									</div>
								</SortBox>

								<ListBox>
									<ul className="list_item">
										<Routes>
											<Route
												exact
												path="/"
												element={
													<ShowList
														product={product}
														page={page}
														setPage={setPage}
														setPrice={setPrice}
														setMainSort={setMainSort}
														bigCategoryId={bigCategoryId}
														smallCategoryId={smallCategoryId}
														setProduct={setProduct}
													/>
												}
											></Route>
											<Route
												path="/products"
												element={<NewList product={product} newProduct={newProduct} />}
											></Route>
										</Routes>
									</ul>
								</ListBox>
							</Items>
						</ItemSection>
					</MainContainer>
				</ScrollContainer>
			</InfiniteScroll>
		</>
	);
};

export default Main;
