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

	//쿼리스트링
	const location = useLocation();
	const query = URLquery(location);
	const selectBigCate = Object.values(query)[0] * 1;
	const selectSmallCate = Object.values(query)[1] * 1;

	//params
	// // const [mainSort, setMainSort] = useState(0);
	// const [price, setPrice] = useState(0);
	// // const [priceMin, setPriceMin] = useState(0);
	// // const [priceMax, setPriceMax] = useState(100000000);
	// const [bigCategoryId, setBigCategoryId] = useState(1);
	// const [smallCategoryId, setSmallCategoryId] = useState(1);

	//쿼리스트링 먼저!!!!!!받아와보기
	const [filterVal, setFilterVal] = useState({});

	const handleFilter = (val, name) => {
		setFilterVal(prev => {
			return { ...prev, [name]: val };
		});
	};

	const resetFilter = () => {
		delete filterVal.smallCategoryId;
		//setFilterVal(filterVal)는 작동X useEffect 감지안되나바
		setFilterVal({ ...filterVal });
	};

	//맨처음 데이터 받아오기(parameter 없이)
	useEffect(() => {
		PostQueryApi(`/api/product/productList`).then(res => setProduct(res.data.productData));
	}, []);

	//parameter 바뀔때마다 새로운 queryString 적용 후 axios
	useEffect(() => {
		const queryString = `?${
			filterVal.bigCategoryId ? `bigCategoryId=${filterVal.bigCategoryId}` : ''
		}${filterVal.smallCategoryId ? `&smallCategoryId=${filterVal.smallCategoryId}` : ''}${
			filterVal.price ? `&price=${filterVal.price}` : ''
		}${filterVal.priceMin ? `&priceMin=${filterVal.priceMin}` : ''}${
			filterVal.priceMax ? `&priceMax=${filterVal.priceMax}` : ''
		}${filterVal.mainSort ? `&mainSort=${filterVal.mainSort}` : ''}`;

		navigate({ pathname: `/products`, search: queryString });
	}, [filterVal]);

	useEffect(() => {
		PostQueryApi(`/api/product/productList${location.search}`).then(res =>
			setNewProduct(res.data.productData),
		);
		console.log(location.search);
	}, [location.search]);

	//bigCategoryId 반영(중분류 전체보기)
	// const onReset = val => {
	// 	resetFilter(val, 'bigCategoryId');
	// };

	//handleFilter함수 사용해서 쿼리문 추가
	//smallCategoryId추가(중분류)
	const onSort = val => {
		{
			filterVal.bigCategoryId
				? handleFilter(val, 'smallCategoryId')
				: setFilterVal(() => {
						return { bigCategoryId: 1, smallCategoryId: val };
				  });
		}
	};

	//price추가
	const onFilterPrice = val => {
		handleFilter(val, 'price');
	};

	//mainSort 추가
	const onMainSort = val => {
		handleFilter(val, 'mainSort');
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

	return (
		<>
			<DialLog />
			<Header></Header>
			<ScrollContainer>
				<Sidebar
					filterVal={filterVal}
					setFilterVal={setFilterVal}
					setSelectBox={setSelectBox}
				></Sidebar>
				<MainContainer>
					{/* 카테고리 */}
					<Category>
						<CategoryTitle>
							<div
								className="page_title"
								onClick={() => {
									navigate('/');
								}}
							>
								{filterVal.bigCategoryId
									? bigCategory[filterVal.bigCategoryId - 1]
									: bigCategory[0]}
							</div>
							<div className="hash_tag">
								#
								{filterVal.bigCategoryId
									? bigCategory[filterVal.bigCategoryId - 1]
									: bigCategory[0]}
							</div>
							<div className="hash_tag">
								#{filterVal.bigCategoryId ? alpabet[filterVal.bigCategoryId - 1] : alpabet[0]}
							</div>
							<div className="hash_tag">
								#
								{filterVal.bigCategoryId
									? smallCategory[filterVal.bigCategoryId][1]
									: smallCategory[0][1]}
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
									resetFilter();
									// setFilterVal({ bigCategoryId: filterVal.bigCategoryId });
								}}
								style={{ color: 'black', 'font-weight': 'bold' }}
							>
								전체
							</div>
							<div className="all_item_list">
								<ul>
									{smallCategory[1]
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
											// onSecondReset();
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
												//onFilterPriceRange(minPriceInput, maxPriceInput);
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
								{/* <span type="submit" className="search_btn" onClick={() => onSearch()}> */}
								<span>검색</span>
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
											// 	onSortSecondClick
											// 		? PostQueryApi(`/api/product/productList`, {
											// 				price,
											// 				bigCategoryId,
											// 		  }).then(
											// 				res => setNewProduct(res.data.productData),
											// 				navigate({
											// 					pathname: `/products`,
											// 					search: `bigCategoryId=${bigCategoryId}&price=${price}`,
											// 				}),
											// 		  )
											// 		: PostQueryApi(`/api/product/productList`, {
											// 				bigCategoryId,
											// 		  }).then(
											// 				res => setNewProduct(res.data.productData),
											// 				navigate({
											// 					pathname: `/products`,
											// 					search: `bigCategoryId=${bigCategoryId}`,
											// 				}),
											// 		  );
											// }
											// setOnSortClick(false);
										}
									}}
								>
									<span className="select-medium">{smallCategory[1][selectSmallCate]}</span>
									<span className="select-medium-button">&#160;X</span>
								</div>
							) : null}

							<div
								className={secondSelectBox ? 'visible' : 'invisible'}
								onClick={() => {
									setSecondSelectBox(false);
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
