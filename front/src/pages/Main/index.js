import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
	PaginationWapper,
} from './styles';

import {
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
import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';
import Footer from 'layouts/Footer';
import DialLog from 'layouts/DialLog';
import Pagination from 'react-js-pagination';
import { createBrowserHistory } from 'history';
import { AiOutlineConsoleSql } from 'react-icons/ai';
//import { MainProvider } from 'context/MainContext';

const Main = () => {
	const navigate = useNavigate();
	const history = createBrowserHistory();

	const ShowList = loadable(() => import('components/ProductList'), {
		fallback: <div>로딩중</div>,
	});

	//데이터 저장할 state(원본 담을 state/조건추가시 필터된 데이터 담을 state)
	const [product, setProduct] = useState([]);

	//쿼리스트링 활용
	const location = useLocation();
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

	//priceMin, Max 삭제함수
	const onResetPriceRange = () => {
		delete filterVal.priceMin;
		delete filterVal.priceMax;
		setFilterVal({ ...filterVal });

		setMinPriceInput('');
		setMaxPriceInput('');
	};

	//클릭한 요소 style변경
	//전체 요소수와 같은 배열 생성 - 모두  false로 채움 - 클릭한 요소만 true로 변경
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

	useEffect(() => {
		const queryString = `${
			filterVal.bigCategoryId ? `bigCategoryId=${filterVal.bigCategoryId}` : ''
		}${filterVal.smallCategoryId ? `&smallCategoryId=${filterVal.smallCategoryId}` : ''}${
			filterVal.price ? `&price=${filterVal.price}` : ''
		}${filterVal.priceMin ? `&priceMin=${filterVal.priceMin}` : ''}${
			filterVal.priceMax ? `&priceMax=${filterVal.priceMax}` : ''
		}${filterVal.mainSort ? `&mainSort=${filterVal.mainSort}` : ''}`;

		if (localStorage.getItem('memo')) {
			PostQueryApi(`/api/product/productList${localStorage.getItem('memo')}`).then(res =>
				setProduct(res.data.productData),
			);
			localStorage.removeItem('memo');
		} else if (queryString == '') {
			PostQueryApi(`/api/product/productList`).then(res => setProduct(res.data.productData));
		} else {
			PostQueryApi(`/api/product/productList?${queryString}`).then(res =>
				setProduct(res.data.productData),
			);
			navigate(`?${queryString}`);
		}
	}, [filterVal]);

	useEffect(() => {
		setMinPriceInput('');
		setMaxPriceInput('');
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
		delete filterVal.priceMin;
		delete filterVal.priceMax;
		setMinPriceInput('');
		setMaxPriceInput('');
		handleFilter(val, 'price');

		const newArr = clickPrice;
		if (newArr.includes(true)) newArr[clickPrice.indexOf(true)] = false;
		newArr[val - 1] = true;
		setClickPrice(newArr);
	};

	//pricaRange 추가
	const onFilterPriceRange = (val1, val2) => {
		delete filterVal.price;
		setFilterVal(prev => {
			return { ...prev, priceMin: val1, priceMax: val2 };
		});

		const newArr = clickPrice;
		if (newArr.includes(true)) newArr[clickPrice.indexOf(true)] = false;
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
	const [minPriceInput, setMinPriceInput] = useState('');
	const [maxPriceInput, setMaxPriceInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	//select박스 상태
	const [search, setSearch] = useState(false);
	const [selectBox, setSelectBox] = useState(true);

	//검색창 함수
	const onSearch = () => {
		setSearch(true);
		setProduct(
			product.filter(data => data.productTitle.toLowerCase().includes(searchTerm.toLowerCase())),
		);
	};

	//검색창 select박스 reset
	const onResetSearch = () => {
		setSearch(false);
		PostQueryApi(`/api/product/productList${location.search}`).then(res =>
			setProduct(res.data.productData),
		);
		setSearchTerm('');
	};

	// //페이지네이션 관련
	const [page, setPage] = useState(1);
	const [items, setItems] = useState(18);
	const handlePageChange = page => {
		//history push
		setPage(page); //페이지바뀔때마다
	};
	// const length = product.length;
	const length = product.length;

	return (
		<>
			<DialLog />
			<Header />
			<ScrollContainer>
				<Sidebar filterVal={filterVal} setFilterVal={setFilterVal}></Sidebar>
				<MainContainer>
					{/* 카테고리 */}
					<Category>
						<CategoryTitle>
							<div
								className="page_title"
								onClick={() => {
									setFilterVal({ bigCategoryId: filterVal.bigCategoryId });
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
									? smallCategory[filterVal.bigCategoryId - 1][
											Math.floor(Math.random() * smallCategory[filterVal.bigCategoryId - 1].length)
									  ]
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
								style={{ color: 'black', 'fontWeight': 'bold' }}
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
													key={idx}
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
										style={{ 'minWidth': '100px', color: 'black', fontWeight: 'bold' }}
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
								<span className="select-medium">{priceArr[filterVal.price - 1]}</span>
								<span className="select-medium-button">&#160;X</span>
							</div>
							{/* 최소, 최대가격 */}
							<div
								className={filterVal.priceMin || filterVal.priceMax ? 'visible' : 'invisible'}
								onClick={() => {
									onResetPriceRange();
								}}
							>
								<span className="select-medium">
									{filterVal.priceMin ? `${filterVal.priceMin}원 ` : null}
								</span>
								<span className="select-medium">~</span>
								<span className="select-medium">
									{filterVal.priceMax ? ` ${filterVal.priceMax}원` : null}
								</span>
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
								<PaginationWapper>
									<Pagination
										activePage={page}
										itemsCountPerPage={items}
										totalItemsCount={length}
										pageRangeDisplayed={10}
										onChange={handlePageChange}
										// hideNavigation={true}
										// hideFirstLastPages={true}
									/>
								</PaginationWapper>
							</SortBox>

							<ListBox>
								<ShowList
									product={product}
									items={items}
									page={page}
									filterVal={filterVal}
									setFilterVal={setFilterVal}
									//memoVal={memoVal}
								/>
								{/* <Routes>
									<Route
										exact
										path="/"
										element={
											<AllList
												product={product}
												items={items}
												page={page}
												filterVal={filterVal}
												setFilterVal={setFilterVal}
												clickCate={clickCate}
												clickPrice={clickPrice}
												clickMainSort={clickMainSort}
												setClickCate={setClickCate}
												setClickPrice={setClickPrice}
												setClickMainSort={setClickMainSort}
											/>
										}
									></Route>
									<Route
										path="/"
										element={<ShowList product={product} items={items} page={page} />}
									></Route>
								</Routes> */}
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
