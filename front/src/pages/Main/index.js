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

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { PostQueryApi } from 'utils/api';
import loadable from '@loadable/component';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
// import InfiniteScroll from 'react-infinite-scroll-component';
import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';
import Footer from 'layouts/Footer';
import DialLog from 'layouts/DialLog';
// import { URLquery } from 'utils/URLquery';

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

	//쿼리스트링 활용
	const location = useLocation();

	//parameter관리할 state - object로 한번에 관리
	const [filterVal, setFilterVal] = useState({});

	//가격 배열
	const priceArr = [
		'~ 50,000원',
		'50,000원 ~ 100,000원',
		'100,000원 ~ 200,000원',
		'200,000원 ~ 300,000원',
		'300,000원 ~',
	];

	//parameter 추가
	const handleFilter = (val, name) => {
		setFilterVal(prev => {
			return { ...prev, [name]: val };
		});
	};

	//smallCateId 삭제 함수(중분류 - 전체)
	const onReset = () => {
		delete filterVal.smallCategoryId;
		//setFilterVal(filterVal)는 작동X useEffect 감지안되나바
		setFilterVal({ ...filterVal });

		const newArr = clickCate;
		if (newArr.includes(true)) {
			newArr[clickCate.indexOf(true)] = false;
		}
		setClickCate(newArr);
	};

	//Price 삭제 함수(가격 - 전체보기)
	const onResetPrice = () => {
		delete filterVal.price;
		setFilterVal({ ...filterVal });

		const newArr = clickPrice;
		if (newArr.includes(true)) {
			newArr[clickPrice.indexOf(true)] = false;
		}
		setClickPrice(newArr);
	};

	//클릭된 요소 style
	const [clickCate, setClickCate] = useState(
		Array.from({
			length: smallCategory[filterVal.bigCategoryId ? filterVal.bigCategoryId - 1 : 0].length,
		}).fill(false),
	);

	const [clickPrice, setClickPrice] = useState(
		Array.from({
			length: 5,
		}).fill(false),
	);

	const [clickMainSort, setClickMainSort] = useState(
		Array.from({
			length: 3,
		}).fill(false),
	);

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
	}, [location.search]);

	useEffect(() => {
		setClickCate(clickCate.fill(false));
		setClickMainSort(clickMainSort.fill(false));
		setClickPrice(clickPrice.fill(false));
	}, [filterVal.bigCategoryId]);

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

		const newArr = clickCate;
		if (newArr.includes(true)) newArr[clickCate.indexOf(true)] = false;

		newArr[val] = true;
		setClickCate(newArr);
	};

	//price추가
	const onFilterPrice = val => {
		handleFilter(val, 'price');

		const newArr = clickPrice;
		if (newArr.includes(true)) newArr[clickPrice.indexOf(true)] = false;

		newArr[val - 1] = true;
		setClickPrice(newArr);
	};

	//mainSort 추가
	const onMainSort = val => {
		handleFilter(val, 'mainSort');

		const newArr = clickMainSort;
		if (newArr.includes(true)) newArr[clickMainSort.indexOf(true)] = false;

		newArr[val - 1] = true;
		setClickMainSort(newArr);
	};

	//검색창 input들 state
	const [searchInput, setSearchInput] = useState('');
	const [minPriceInput, setMinPriceInput] = useState();
	const [maxPriceInput, setMaxPriceInput] = useState();
	const [searchTerm, setSearchTerm] = useState('');

	//select박스 상태
	const [search, setSearch] = useState(false);
	const [selectBox, setSelectBox] = useState(true);

	//검색창 함수
	const onSearch = () => {
		setSearch(true);
		setNewProduct(
			newProduct.filter(data => data.productTitle.toLowerCase().includes(searchTerm.toLowerCase())),
		);
	};

	//검색창 select박스 reset
	const onResetSearch = () => {
		setSearch(false);
		PostQueryApi(`/api/product/productList${location.search}`).then(res =>
			setNewProduct(res.data.productData),
		);
		setSearchTerm('');
	};

	return (
		<>
			<DialLog />
			<Header></Header>
			<ScrollContainer>
				<Sidebar
					filterVal={filterVal}
					setFilterVal={setFilterVal}
					// setSelectBox={setSelectBox}
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
									onReset();
								}}
								style={{ color: 'black', 'font-weight': 'bold' }}
							>
								전체
							</div>
							<div className="all_item_list">
								<ul>
									{smallCategory[filterVal.bigCategoryId ? filterVal.bigCategoryId - 1 : 0]
										.filter(val => {
											if (searchInput === '') return val;
											else if (val.includes(searchInput)) return val;
										})
										.map((data, idx) =>
											idx === 0 ? null : (
												<li
													className={clickCate[idx] ? 'active' : 'inactive'}
													onClick={() => onSort(idx)}
												>
													{data}
												</li>
											),
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
											onResetPrice();
										}}
										style={{ color: 'black', fontWeight: 'bold' }}
									>
										전체보기
									</li>
									<li
										className={clickPrice[0] ? 'active' : 'inactive'}
										onClick={() => onFilterPrice(1)}
									>
										~ 50,000원
									</li>
									<li
										className={clickPrice[1] ? 'active' : 'inactive'}
										onClick={() => onFilterPrice(2)}
									>
										50,000원 ~ 100,000원
									</li>
									<li
										className={clickPrice[2] ? 'active' : 'inactive'}
										onClick={() => onFilterPrice(3)}
									>
										100,000원 ~ 200,000원
									</li>
									<li
										className={clickPrice[3] ? 'active' : 'inactive'}
										onClick={() => onFilterPrice(4)}
									>
										200,000원 ~ 300,000원
									</li>
									<li
										className={clickPrice[4] ? 'active' : 'inactive'}
										onClick={() => onFilterPrice(5)}
									>
										300,000원 ~
									</li>
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
								<span type="submit" className="search_btn" onClick={() => onSearch()}>
									검색
								</span>
							</div>
						</OtherCategory>
					</Category>

					<ItemSection>
						<SelectBox>
							<div
								className={filterVal.smallCategoryId ? 'visible' : 'invisible'}
								onClick={() => {
									onReset();
								}}
							>
								<span className="select-medium">
									{
										smallCategory[filterVal.bigCategoryId ? filterVal.bigCategoryId - 1 : 0][
											filterVal.smallCategoryId
										]
									}
								</span>
								<span className="select-medium-button">&#160;X</span>
							</div>
							<div
								className={filterVal.price ? 'visible' : 'invisible'}
								onClick={() => {
									onResetPrice();
								}}
							>
								<span className="select-medium">{priceArr[filterVal.price]}</span>
								<span className="select-medium-button">&#160;X</span>
							</div>
							<div
								className={search ? 'visible' : 'invisible'}
								onClick={() => {
									onResetSearch();
								}}
							>
								<span className="select-medium">{searchTerm}</span>
								<span className="select-medium-button">&#160;X</span>
							</div>
						</SelectBox>

						<Items>
							<SortBox>
								<div>
									<span
										className={clickMainSort[0] ? 'active' : 'sort'}
										onClick={() => onMainSort(1)}
									>
										낮은 가격순
									</span>
									<span className="sort">|</span>
									<span
										className={clickMainSort[1] ? 'active' : 'sort'}
										onClick={() => onMainSort(2)}
									>
										높은 가격순
									</span>
									<span className="sort">|</span>
									<span
										className={clickMainSort[2] ? 'active' : 'sort'}
										onClick={() => onMainSort(3)}
									>
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
