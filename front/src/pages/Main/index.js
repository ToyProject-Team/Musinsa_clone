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
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sidebar from 'layouts/Sidebar';
import { GiConsoleController } from 'react-icons/gi';
import DialLog from 'layouts/DialLog';

const Main = cancel => {
	const navigate = useNavigate();

	const ShowList = loadable(() => import('components/ProductList'), {
		fallback: <div>로딩중</div>,
	});

	const NewList = loadable(() => import('components/ProductNewList'), {
		fallback: <div>로딩중</div>,
	});

	//데이터 저장할 state(원본 담을 state/조건추가시 필터된 데이터 담을 state)
	const [product, setProduct] = useState([]);
	const [newProduct, setNewProduct] = useState([]);

	//params
	const [mainSort, setMainSort] = useState(0);
	const [page, setPage] = useState(1);
	const [price, setPrice] = useState(0);
	const [priceMin, setPriceMin] = useState(0);
	const [priceMax, setPriceMax] = useState(100000000);
	const [bigCategoryId, setBigCategoryId] = useState(1);
	const [smallCategoryId, setSmallCategoryId] = useState(1);

	// const [count, setCount] = useState(0);

	//데이터 처음으로 받아오기
	//첫화면은 mainSort, price 적용안해야 랜덤으로 데이터 받음
	const getItems = () => {
		const params = {
			bigCategoryId,
			smallCategoryId,
		};

		PostQueryApi('/api/product/productList', params).then(
			res => setProduct(res.data.productData),
			navigate('/'),
		);
	};

	//처음, bigCate클릭, smallCate클릭할 때 데이터 받아오기
	useEffect(() => {
		getItems();
	}, [bigCategoryId, smallCategoryId]);

	//페이지 넘길때(무한스크롤) 데이터 더 불러오기
	const getMoreItems = () => {
		const params = {
			page,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi('/api/product/productList', params).then(res =>
			setProduct(prev => [...prev, ...res.data.productData]),
		);
		setPage(page + 1);
	};

	//중분류 전체보기(리셋)
	const onReset = () => {
		navigate('/');
	};

	//검색창 input들 state
	const [searchInput, setSearchInput] = useState('');
	const [minPriceInput, setMinPriceInput] = useState();
	const [maxPriceInput, setMaxPriceInput] = useState();
	const [searchTerm, setSearchTerm] = useState('');

	//sort박스 토글
	// const [choice, setChoice] = useState(false);
	const [selectBox, setSelectBox] = useState(false);
	const [secondSelectBox, setSecondSelectBox] = useState(false);
	const [selectSmallCateId, setSelectSmallCateId] = useState();
	const [selectPrice, setSelectPrice] = useState();

	//중분류 분류 2
	//onSort버튼 클릭 -> params 값 전송 -> url에 박아넣기 구현..
	const [onSortClick, setOnSortClick] = useState(false);
	const [onSortSecondClick, setOnSortSecondClick] = useState(false);

	const onSort = val => {
		const params = {
			page: 1,
			// mainSort,
			// price,
			// priceMin,
			// priceMax,
			bigCategoryId,
			smallCategoryId: val,
		};

		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			navigate(`/products`),
		);

		// setNewProduct(
		// 	product.filter(data => {
		// 		return data.productTitle === val;
		// 	}),
		// );
		// navigate(`/products`);

		setSearchInput('');
		setSelectBox(true);
		setOnSortClick(true);
		setSelectSmallCateId(val);
		console.log(newProduct);
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
			// mainSort,
			price: val,
			bigCategoryId,
			smallCategoryId,
		};

		{
			onSortClick
				? PostQueryApi(`/api/product/productList`, params).then(res => {
						setNewProduct(res.data.productData);
						navigate(`/products?price=${params.price}`);
						console.log('중분류 선택');
				  })
				: PostQueryApi(`/api/product/productList`, params).then(res => {
						setNewProduct(res.data.productData);
						navigate(`/products?price=${params.price}`);
						console.log('선택안함');
				  });
		}

		priceBox(val);
		setOnSortSecondClick(true);
		setSecondSelectBox(true);
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
		const params = {
			// mainSort,
			page,
			// price,
			bigCategoryId,
			smallCategoryId,
		};

		PostQueryApi('/api/product/productList', params).then(
			res =>
				setNewProduct(
					res.data.productData.filter(data =>
						data.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
					),
				),
			navigate(`/products?search=${searchTerm}`),
		);
		setSearchTerm('');
		// return (
		// 	setNewProduct(
		// 		product.filter(data => data.productTitle.toLowerCase().includes(searchTerm.toLowerCase())),
		// 	),
		// 	navigate(`/products?search=${searchTerm}`),
		// 	setSearchTerm('')
		// );
	};

	//가격순 정렬
	//내림차순 6
	const onSortPriceDown = () => {
		setMainSort(2);
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
		setMainSort(1);
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
		setMainSort(3);
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
		<InfiniteScroll
			dataLength={page}
			next={getMoreItems}
			// width={'1200px'}
			hasMore={page < 38 ? true : false}
			height={document.documentElement.scrollHeight}
			loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
			scrollThreshold="1px" // 뷰포트가 스크롤영역 하단에서 0px 미만일때 이벤트를 트리거
			endMessage={<div style={{ textAlign: 'center' }}>더이상 상품이 없습니다.</div>}
			// style={{
			// 	'::-webkit-scrollbar': {
			// 		display: 'none',
			// 	},
			// }}
		>
			<Header></Header>
			<DialLog></DialLog>
			<ScrollContainer>
				<Sidebar
					bigCategoryId={bigCategoryId}
					smallCategoryId={smallCategoryId}
					setBigCategoryId={setBigCategoryId}
					setSmallCategoryId={setSmallCategoryId}
					setPage={setPage}
				></Sidebar>
				<MainContainer>
					{/* 카테고리 */}
					<Category>
						<CategoryTitle>
							<div
								className="page_title"
								onClick={() => {
									// pageTest();
									navigate(`/`);
									setPage(1);
								}}
							>
								{bigCategory[bigCategoryId - 1]}
							</div>
							<div className="hash_tag">#{bigCategory[bigCategoryId - 1]}</div>
							<div className="hash_tag">#{alpabet[bigCategoryId - 1]}</div>
							<div className="hash_tag">
								#
								{
									smallCategory[bigCategoryId - 1][
										Math.floor(Math.random() * smallCategory[bigCategoryId - 1].length)
									]
								}
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
									{smallCategory[bigCategoryId]
										.filter(val => {
											if (searchInput === '') return val;
											else if (val.toLowerCase().includes(searchInput)) return val;
										})
										.map((data, idx) => (
											<li onClick={() => onSort(idx)}>{data}</li>
										))}
								</ul>
							</div>
							{/* <div className="all_item_list">
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
							</div> */}
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

									{
										onSortSecondClick
											? PostQueryApi(`/api/product/productList`, {
													page,
													price,
													bigCategoryId,
													smallCategoryId,
											  }).then(res => setNewProduct(res.data.productData))
											: PostQueryApi(`/api/product/productList`, {
													page,
													bigCategoryId,
													smallCategoryId,
											  }).then(res => setNewProduct(res.data.productData));
									}
									setOnSortClick(false);
								}}
							>
								<span className="select-medium">
									{smallCategory[bigCategoryId][selectSmallCateId]}
								</span>
								<span className="select-medium-button">&#160;X</span>
							</div>
							<div
								className={secondSelectBox ? 'visible' : 'invisible'}
								onClick={() => {
									setSecondSelectBox(false);
									const params = {
										page,
										// price,
										bigCategoryId,
										smallCategoryId,
									};

									{
										onSortClick
											? PostQueryApi(`/api/product/productList`, params).then(res =>
													setNewProduct(res.data.productData),
											  )
											: navigate('/');
									}

									// PostQueryApi(`/api/product/productList`, params).then(res => {
									// 	onSortSecondClick
									// 		? setNewProduct(
									// 				res.data.productData.filter(data => {
									// 					return data.productTitle === selectTitle;
									// 				}),
									// 		  )
									// 		: setNewProduct(res.data.productData);
									// });
									setOnSortSecondClick(false);
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
													// page={page}
													// bigCategoryId={bigCategoryId}
													// smallCategoryId={smallCategoryId}
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
	);
};

export default Main;
