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
// import { useInView } from 'react-intersection-observer';
import {
	Router,
	Route,
	Routes,
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
// import qs from 'qs';
import loadable from '@loadable/component';

const Main = () => {
	const navigate = useNavigate();

	const ShowList = loadable(() => import('./showList'), {
		fallback: <div>로딩중</div>,
	});

	const NewList = loadable(() => import('./newList'), {
		fallback: <div>로딩중</div>,
	});

	//무한스크롤
	// const [loading, setLoaing] = useState(false);
	// useEffect(() => {
	// 	getItems();
	// }, [getItems]);

	// useEffect(() => {
	// 	// 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
	// 	if (inView && !loading) {
	// 		setPage(prevState => prevState + 1);
	// 	}
	// }, [inView, loading]);

	//데이터 저장할 state(원본 담을 state/조건추가시 필터된 데이터 담을 state)
	const [product, setProduct] = useState();
	const [newProduct, setNewProduct] = useState([]);

	//params
	const [mainSort, setMainSort] = useState();
	const [page, setPage] = useState(1);
	const [price, setPrice] = useState(1);
	const [priceMin, setPriceMin] = useState(0);
	const [priceMax, setPriceMax] = useState(100000000);
	const [bigCategoryId, setBigCategoryId] = useState(1);
	const [smallCategoryId, setSmallCategoryId] = useState(1);

	//상품리스트 리셋(전체보기)
	const resetList = () => {
		setMainSort(0);
		setPage(1);
		setPrice(1);
	};

	//데이터 받아오기 1
	useEffect(() => {
		const params = {
			mainSort,
			page,
			price,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi('/api/product/productList', params).then(res => setProduct(res.data.productData));
	}, [page, price, bigCategoryId, smallCategoryId]);

	const [inputState, setInputState] = useState(false);
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
			mainSort,
			page,
			price,
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
			navigate('/products'),
		);
		setSelectBox(true);
	};

	//가격별로 분류 3
	const onFilterPrice = val => {
		setPrice(val);
		const params = {
			mainSort,
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
			mainSort,
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
			mainSort,
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
			price,
			mainSort: 2,
			bigCategoryId,
			smallCategoryId,
		};
		//정렬 - 백엔
		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			// setNewProduct(
			// 	res.data.productData.sort((a, b) => {
			// 		return b.productPrice - a.productPrice;
			// 	}),
			// ),
			navigate(`/products?mainSort=${params.mainSort}`),
		);
	};

	//오름차순 7
	const onSortPriceUp = () => {
		const params = {
			page,
			price,
			mainSort: 1,
			bigCategoryId,
			smallCategoryId,
		};
		PostQueryApi('/api/product/productList', params).then(
			res => setNewProduct(res.data.productData),
			// setNewProduct(
			// 	res.data.productData.sort((a, b) => {
			// 		return a.productPrice - b.productPrice;
			// 	}),
			// ),
			navigate(`/products?mainSort=${params.mainSort}`),
		);
	};

	//후기순 정렬 sort함수사용 8
	const onSortComments = () => {
		const params = {
			page,
			price,
			bigCategoryId,
			smallCategoryId,
		};

		PostQueryApi('/api/product/productList', params).then(
			res =>
				setNewProduct(
					res.data.productData.sort((a, b) => {
						return b.comments - a.comments;
					}),
				),
			navigate(`/products`),
		);
	};

	return (
		<MainContainer>
			{/* 카테고리 */}
			<Category>
				<CategoryTitle>
					<div className="page_title">useLocation테스트</div>
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
							resetList();
						}}
					>
						<Link
							to="/"
							style={{ 'text-decoration': 'none', color: 'black', 'font-weight': 'bold' }}
						>
							전체
						</Link>
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
									return (
										<li onClick={e => onSort(e.target.textContent)}>
											<Link
												to="/category"
												style={{
													'text-decoration': 'none',
													color: '#b2b2b2',
													'font-weight': 'bold',
												}}
											>
												{data}
											</Link>
										</li>
									);
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
								onClick={() => {
									resetList();
								}}
							>
								<Link
									to="/"
									style={{ 'text-decoration': 'none', color: 'black', 'font-weight': 'bold' }}
								>
									전체보기
								</Link>
							</li>
							<li onClick={() => onFilterPrice(1)}>
								{/* <Link
									to="/price"
									style={{ 'text-decoration': 'none', color: '#b2b2b2', 'font-weight': 'bold' }}
								> */}
								~ 50,000원
								{/* </Link> */}
							</li>
							<li onClick={() => onFilterPrice(2)}>
								{/* <Link
									to="/price"
									style={{ 'text-decoration': 'none', color: '#b2b2b2', 'font-weight': 'bold' }}
								>								</Link> */}
								50,000원 ~ 100,000원
							</li>
							<li onClick={() => onFilterPrice(3)}>
								{/* <Link
									to="/price"
									style={{ 'text-decoration': 'none', color: '#b2b2b2', 'font-weight': 'bold' }}
								> */}
								100,000원 ~ 200,000원
								{/* </Link> */}
							</li>
							<li onClick={() => onFilterPrice(4)}>
								{/* <Link
									to="/price"
									style={{ 'text-decoration': 'none', color: '#b2b2b2', 'font-weight': 'bold' }}
								>
								</Link> */}
								200,000원 ~ 300,000원
							</li>
							<li onClick={() => onFilterPrice(5)}>
								{/* <Link
									to="/price"
									style={{ 'text-decoration': 'none', color: '#b2b2b2', 'font-weight': 'bold' }}
								>

								</Link> */}
								300,000원 ~
							</li>
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
									<Link to="/price" style={{ 'text-decoration': 'none', color: 'black' }}>
										검색
									</Link>
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
							<Link
								to="/search"
								style={{ 'text-decoration': 'none', color: 'black', 'font-weight': 'bold' }}
							>
								검색
							</Link>
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
						<span className="sort" onClick={() => onSortPriceUp()}>
							<Link to="/sort" style={{ 'text-decoration': 'none', color: 'black' }}>
								낮은 가격순
							</Link>
						</span>
						<span className="sort" onClick={() => onSortPriceDown()}>
							<Link to="/sort" style={{ 'text-decoration': 'none', color: 'black' }}>
								높은 가격순
							</Link>
						</span>
						<span className="sort" onClick={() => onSortComments()}>
							<Link to="/sort" style={{ 'text-decoration': 'none', color: 'black' }}>
								후기순
							</Link>
						</span>
					</SortBox>
					<ListBox>
						<ul className="list_item">
							<Routes>
								<Route exact path="/" element={<ShowList product={product} />}></Route>
								{/* <Route path="/category" element={<NewList newProduct={newProduct} />}></Route> */}
								<Route path="/products" element={<NewList newProduct={newProduct} />}></Route>
								{/* <Route path="/sort" element={<NewList newProduct={newProduct} />}></Route>
								<Route path="/search" element={<NewList newProduct={newProduct} />}></Route> */}
							</Routes>
						</ul>
					</ListBox>
				</Items>
			</ItemSection>
		</MainContainer>
	);
};

export default Main;
