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

import { Router, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import qs from 'qs';
import { PostQueryApi } from 'utils/api';
import loadable from '@loadable/component';
import Header from 'layouts/Header';

const Main = () => {
	const navigate = useNavigate();
	const bigCategory = [
		'상의',
		'아우터',
		'바지',
		'원피스',
		'스커트',
		'스니커즈',
		'신발',
		'가방',
		'여성 가방',
		'스포츠/용품',
		'모자',
		'양말/레그웨어',
		'속옷',
		'선글라스/안경테',
		'악세서리',
		'시계',
		'주얼리',
		'뷰티',
		'디지털/테크',
		'생활/취미/예술',
		'책/음악/티켓',
		'반려동물',
	];

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

	//상품리스트 리셋(전체보기)
	const onResetList = () => {
		// setPage(0);
		setPrice();
		setMainSort();
		navigate('/');
	};

	//데이터 받아오기 1
	//첫화면은 mainSort, price 적용안해야 랜덤으로 데이터 받음
	const getItems = () => {
		const params = {
			page,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi('/api/product/productList', params).then(res => setProduct(res.data.productData));
	};

	useEffect(() => {
		getItems();
	}, [page]);

	//🔶🔶무한스크롤 관련 함수🔶🔶
	//데이터 더 불러오기
	//데이터 100개 받아오기
	//setProduct([...product, res.data.productData])는 안됨
	//뭐가 잘못된건지 잘모르겠는데 일단 pass하고 그냥 100개씩 불러옴
	//✅asysnc await로 비동기처리해보기(노션 참고)
	//가져올 데이터 수 min, max 설정가능?
	//option 누를때마다 axios
	// const getMoreItems = () => {
	// 	//페이지 + 1하고 나머지 params들은 리셋
	// 	setPage(page + 1);
	// 	setPrice();
	// 	setMainSort();
	// 	const params = {
	// 		page: page + 1,
	// 		bigCategoryId,
	// 		smallCategoryId,
	// 	};

	// 	// const [loading, setLoading] = useState(true);

	// 	const async = async () => {
	// 		await PostQueryApi('/api/product/productList', params).then(res =>
	// 			setProduct(prev => [...prev, res.data.productData]),
	// 		);
	// 	};

	// 	async();
	// };

	const [selectBox, setSelectBox] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [minPriceInput, setMinPriceInput] = useState(0);
	const [maxPriceInput, setMaxPriceInput] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	// const [toggle, setToggle] = useState(true);

	//중분류 분류 2
	//onSort버튼 클릭 -> params 값 전송 -> url에 박아넣기 구현..
	const onSort = val => {
		const params = {
			// mainSort,
			page,
			// price,
			bigCategoryId,
			smallCategoryId,
		};

		//백엔드 데이터에 상품명이 없기 때문에 쿼리스트링으로 못넣음
		PostQueryApi('/api/product/productList', params).then(
			res =>
				setNewProduct(
					res.data.productData.filter(data => {
						return data.productTitle === val;
					}),
				),
			navigate(`/products`),
		);
		setSelectBox(true);
	};

	//가격별로 분류 3
	const onFilterPrice = val => {
		setPrice(val);
		const params = {
			// mainSort,
			page,
			price: val,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi(`/api/product/productList`, params).then(
			res => setNewProduct(res.data.productData),
			navigate(`/products?price=${params.price}`),
		);
	};

	//가격별로 분류 4
	const onFilterPriceRange = (val1, val2) => {
		setPriceMin(val1);
		setPriceMax(val2);

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
			price,
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
			<ScrollContainer>
				<Header></Header>
				<MainContainer>
					{/* 카테고리 */}
					<Category>
						<CategoryTitle>
							<div
								className="page_title"
								onClick={() => {
									navigate(`/`);
									setPage(0);
									setPrice();
									setMainSort();
								}}
							>
								{bigCategory[bigCategoryId - 1]}
							</div>
							<div className="hash_tag">#smallCategory명</div>
							<div className="hash_tag">#한국어</div>
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
									onResetList();
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
										.map(data => {
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
											onResetList();
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
							<CategoryName>색상</CategoryName>
							<div className="color">
								<ul>
									<li>..빨강</li>
									<li>..파랑</li>
								</ul>
							</div>
						</OtherCategory>

						<OtherCategory>
							<CategoryName>검색</CategoryName>
							<div className="search_items">
								<input
									type="text"
									id="search_items"
									onChange={e => setSearchTerm(e.target.value)}
								/>
								<span type="submit" className="search_btn" onClick={() => onSearch()}>
									검색
								</span>
							</div>
						</OtherCategory>
					</Category>

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
								<div className="page">{page}</div>
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
										<Route path="/products" element={<NewList newProduct={newProduct} />}></Route>
									</Routes>
								</ul>
							</ListBox>
						</Items>
					</ItemSection>
				</MainContainer>
				{/* </InfiniteScroll> */}
			</ScrollContainer>
		</>
	);
};

export default Main;
