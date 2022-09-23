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

import {
	Router,
	Route,
	Routes,
	useNavigate,
	useLocation,
	useSearchParams,
	useParams,
} from 'react-router-dom';
import { PostQueryApi } from 'utils/api';
import loadable from '@loadable/component';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
// import InfiniteScroll from 'react-infinite-scroll-component';
import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';
import Footer from 'layouts/Footer';
import DialLog from 'layouts/DialLog';

import qs from 'qs';
import { URLquery } from 'utils/URLquery';

const Main = () => {
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

	const location = useLocation();
	const query = URLquery(location);

	//쿼리스트링
	const selectBigCate = Object.values(query)[0] * 1;
	const selectSmallCate = Object.values(query)[1] * 1;

	//페이지네이션

	//params
	// const [mainSort, setMainSort] = useState(0);
	const [price, setPrice] = useState(0);
	// const [priceMin, setPriceMin] = useState(0);
	// const [priceMax, setPriceMax] = useState(100000000);
	const [bigCategoryId, setBigCategoryId] = useState(1);
	const [smallCategoryId, setSmallCategoryId] = useState(1);

	//처음 아무 조건없이 한번만 데이터 받아오기
	useEffect(() => {
		PostQueryApi('/api/product/productList').then(
			res => setProduct(res.data.productData),
			navigate('/'),
		);
	}, []);

	const [detect, setDetect] = useState(true);

	//Sidebar에서 카테고리 선택했을 때 데이터 받아오기
	//url스트링 반영하면 다른 요소에 영향줘서 bigCate로 바꿈(mainSort에)
	useEffect(() => {
		if (selectBigCate >= 1)
			PostQueryApi('/api/product/productList', {
				bigCategoryId: selectBigCate,
			}).then(res => setNewProduct(res.data.productData));
	}, [bigCategoryId, detect]);

	useEffect(() => {
		if (selectSmallCate >= 1)
			PostQueryApi('/api/product/productList', {
				bigCategoryId: selectBigCate,
				smallCategoryId: selectSmallCate,
			}).then(res => setNewProduct(res.data.productData));
	}, [smallCategoryId]);

	//중분류 전체보기 - bigCate만 적용
	const onReset = () => {
		//셀렉박스 없애기, smallCate선택 여부 false로
		setSelectBox(false);
		setOnSortClick(false);

		//가격이 선택돼 있을때/없을때
		onSortSecondClick
			? PostQueryApi('/api/product/productList', { bigCategoryId, price }).then(
					res => setNewProduct(res.data.productData),
					navigate({
						pathname: `/products`,
						search: `bigCategoryId=${bigCategoryId}&price=${price}`,
					}),
			  )
			: PostQueryApi('/api/product/productList', { bigCategoryId }).then(
					res => setNewProduct(res.data.productData),
					navigate({ pathname: `/products`, search: `bigCategoryId=${bigCategoryId}` }),
			  );

		setBigCategoryId(bigCategoryId);
	};

	//가격 전체보기
	const onSecondReset = () => {
		//SmallCate선택되어 있을때 / 아닐때
		onSortClick
			? PostQueryApi('/api/product/productList', { bigCategoryId, smallCategoryId }).then(
					res => setNewProduct(res.data.productData),
					navigate({
						pathname: `/products`,
						search: `bigCategoryId=${bigCategoryId}&smallCategoryId=${smallCategoryId}`,
					}),
			  )
			: PostQueryApi('/api/product/productList', { bigCategoryId }).then(
					res => setNewProduct(res.data.productData),
					navigate({ pathname: `/products`, search: `bigCategoryId=${bigCategoryId}` }),
			  );
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
		setSmallCategoryId(val);

		onSortSecondClick
			? PostQueryApi('/api/product/productList', {
					bigCategoryId,
					smallCategoryId: val,
					price,
			  }).then(
					res => setNewProduct(res.data.productData),
					navigate({
						pathname: `/products`,
						search: `bigCategoryId=${bigCategoryId}&smallCategoryId=${val}&price=${price}`,
					}),
			  )
			: PostQueryApi('/api/product/productList', { bigCategoryId, smallCategoryId: val }).then(
					res => setNewProduct(res.data.productData),
					navigate({
						pathname: `/products`,
						search: `bigCategoryId=${bigCategoryId}&smallCategoryId=${val}`,
					}),
			  );

		setSearchInput('');
		setSelectBox(true);
		setOnSortClick(true);
		setSelectSmallCateId(val);

		// console.log(selectBigCate, selectSmallCate);
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
			price: val,
			bigCategoryId,
			smallCategoryId,
		};

		//smallCate 선택된 경우/ 안된 경우
		{
			onSortClick
				? PostQueryApi(`/api/product/productList`, params).then(res => {
						setNewProduct(res.data.productData);
						navigate(
							`/products?bigCategoryId=${bigCategoryId}&smallCategoryId=${smallCategoryId}&price=${params.price}`,
						);
				  })
				: PostQueryApi(`/api/product/productList`, { bigCategoryId, price: val }).then(res => {
						setNewProduct(res.data.productData);
						navigate(`/products?bigCategoryId=${bigCategoryId}&price=${val}`);
				  });
		}

		priceBox(val);
		setOnSortSecondClick(true);
		setSecondSelectBox(true);
		// console.log(newProduct);
	};

	//가격별로 분류 4
	const onFilterPriceRange = (val1, val2) => {
		setMinPriceInput('');
		setMaxPriceInput('');

		const params = {
			bigCategoryId,
			smallCategoryId,
			priceMin: val1,
			priceMax: val2,
		};

		//smallCate 선택된경우 /안된경우
		{
			onSortClick
				? PostQueryApi('/api/product/productList', params).then(
						res => setNewProduct(res.data.productData),
						navigate(
							`/products?bigCategoryId=${bigCategoryId}&smallCategoryId=${smallCategoryId}&priceMin=${params.priceMin}&priceMax=${params.priceMax}`,
						),
				  )
				: PostQueryApi('/api/product/productList', {
						bigCategoryId,
						priceMin: val1,
						priceMax: val2,
				  }).then(
						res => setNewProduct(res.data.productData),
						navigate(`/products?bigCategoryId=${bigCategoryId}&priceMin=${val1}&priceMax=${val2}`),
				  );
		}
	};

	//검색창 5
	const onSearch = () => {
		const params = {
			bigCategoryId,
			smallCategoryId,
		};

		//smallCate 선택된 경우 / 안된경우
		onSortClick
			? PostQueryApi('/api/product/productList', params).then(
					res =>
						setNewProduct(
							res.data.productData.filter(data =>
								data.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
							),
						),
					navigate(
						`/products?bigCategoryId=${bigCategoryId}&smallCategoryId=${smallCategoryId}&search=${searchTerm}`,
					),
			  )
			: PostQueryApi('/api/product/productList', { bigCategoryId }).then(
					res =>
						setNewProduct(
							res.data.productData.filter(data =>
								data.productTitle.toLowerCase().includes(searchTerm.toLowerCase()),
							),
						),
					navigate(`/products?bigCategoryId=${bigCategoryId}&search=${searchTerm}`),
			  );
		setSearchTerm('');
	};

	//가격순 정렬
	//내림차순 6
	const onMainSort = val => {
		//smallCate 선택된 경우 / 안된 경우
		onSortClick
			? PostQueryApi('/api/product/productList', {
					bigCategoryId,
					smallCategoryId,
					mainSort: val,
			  }).then(
					res => setNewProduct(res.data.productData),
					navigate({
						pathname: `/products`,
						search: `bigCategoryId=${bigCategoryId}&smallCategoryId=${smallCategoryId}&mainSort=${val}`,
					}),
			  )
			: PostQueryApi('/api/product/productList', { bigCategoryId, mainSort: val }).then(
					res => setNewProduct(res.data.productData),
					navigate({
						pathname: `/products`,
						search: `bigCategoryId=${bigCategoryId}&mainSort=${val}`,
					}),
			  );
	};

	return (
		<>
			<DialLog />
			<Header></Header>
			<ScrollContainer>
				<Sidebar
					bigCategoryId={bigCategoryId}
					smallCategoryId={smallCategoryId}
					setBigCategoryId={setBigCategoryId}
					setSmallCategoryId={setSmallCategoryId}
					setOnSortClick={setOnSortClick}
					setSelectBox={setSelectBox}
					detect={detect}
					setDetect={setDetect}
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
								}}
							>
								{bigCategory[bigCategoryId - 1]}
							</div>
							<div className="hash_tag">#{bigCategory[bigCategoryId - 1]}</div>
							<div className="hash_tag">#{alpabet[bigCategoryId - 1]}</div>
							<div className="hash_tag">#{smallCategory[bigCategoryId][1]}</div>
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
												setSearchInput(e.target.value);
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
									{smallCategory[bigCategoryId - 1]
										.filter(val => {
											if (searchInput === '') return val;
											else if (val.includes(searchInput)) return val;
										})
										.map((data, idx) =>
											idx === 0 ? null : <li onClick={() => onSort(idx)}>{data}</li>,
										)}
								</ul>
							</div>
						</MiddleCategory>

						<OtherCategory>
							<CategoryName>가격</CategoryName>
							<div className="price">
								<ul>
									<li
										onClick={() => {
											onSecondReset();
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
							{selectSmallCate >= 1 ? (
								<div
									className={selectBox ? 'visible' : 'invisible'}
									onClick={() => {
										setSelectBox(false);

										{
											//params price가 적용돼 있다면
											onSortSecondClick
												? PostQueryApi(`/api/product/productList`, {
														price,
														bigCategoryId,
												  }).then(
														res => setNewProduct(res.data.productData),
														navigate({
															pathname: `/products`,
															search: `bigCategoryId=${bigCategoryId}&price=${price}`,
														}),
												  )
												: PostQueryApi(`/api/product/productList`, {
														bigCategoryId,
												  }).then(
														res => setNewProduct(res.data.productData),
														navigate({
															pathname: `/products`,
															search: `bigCategoryId=${bigCategoryId}`,
														}),
												  );
										}
										setOnSortClick(false);
									}}
								>
									<span className="select-medium">
										{smallCategory[bigCategoryId - 1][selectSmallCate]}
									</span>
									<span className="select-medium-button">&#160;X</span>
								</div>
							) : null}

							<div
								className={secondSelectBox ? 'visible' : 'invisible'}
								onClick={() => {
									setSecondSelectBox(false);

									//smallCate가 선택되어 있다면
									onSortClick
										? PostQueryApi(`/api/product/productList`, {
												bigCategoryId,
												smallCategoryId,
										  }).then(
												res => setNewProduct(res.data.productData),
												navigate({
													pathname: `/products`,
													search: `bigCategoryId=${bigCategoryId}&smallCategoryId=${smallCategoryId}`,
												}),
										  )
										: PostQueryApi(`/api/product/productList`, { bigCategoryId }).then(
												res => setNewProduct(res.data.productData),
												navigate({
													pathname: `/products`,
													search: `bigCategoryId=${bigCategoryId}`,
												}),
										  );

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
									<span className="sort" onClick={() => onMainSort(1)}>
										낮은 가격순
									</span>
									<span className="sort" onClick={() => onMainSort(2)}>
										높은 가격순
									</span>
									<span className="sort" onClick={() => onMainSort(3)}>
										후기순
									</span>
								</div>
							</SortBox>

							<ListBox>
								<ul className="list_item">
									<Routes>
										<Route exact path="/" element={<ShowList product={product} />}></Route>
										<Route
											path="/products"
											element={<NewList product={product} newProduct={newProduct} />}
										></Route>
									</Routes>
								</ul>
							</ListBox>
						</Items>
					</ItemSection>
					<Footer></Footer>
				</MainContainer>
			</ScrollContainer>
		</>
	);
};

export default Main;
