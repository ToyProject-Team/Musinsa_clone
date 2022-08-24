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
// import ShowList from './showList';
import axios from 'axios';
// import { GetApi } from 'utils/api';

const Main = () => {
	const [page, price, priceMin, priceMax, bigCategoryId, smallCategoryId] = useState('');
	const [product, setProduct] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const params = {
				page: page,
				price: price,
				priceMin: priceMin,
				priceMax: priceMax,
				bigCategoryId: bigCategoryId,
				smallCategoryId: smallCategoryId,
			};

			await axios
				.get('http://141.164.48.244/api/product/productList', { params })
				.then(res => setProduct(res.data.productData));
		};
		fetchData();
	}, []);

	const [sortData, setSortData] = useState([]);
	const [titleRange, setTitleRange] = useState(true);
	const [colorRange, setColorRange] = useState(true);
	const [priceRange, setPriceRange] = useState(true);

	const [selectBox, setSelectBox] = useState(true);
	const [searchInput, setSearchInput] = useState('');

	//item(품목명) array
	const allTypeArr = product?.map(data => data.productTitle);

	//중분류 분류
	const onSort = val => {
		setSortData(
			product.filter(data => {
				return data.productTitle === val;
			}),
		);
		setTitleRange(!titleRange);
	};

	//가격순 정렬
	//내림차순
	const onSortPriceDown = () => {
		setSortData(
			product.sort((a, b) => {
				return b.productPrice - a.productPrice;
			}),
		);
		setPriceRange(false);
	};

	//오름차순
	const onSortPriceUp = () => {
		setSortData(
			product.sort((a, b) => {
				return a.productPrice - b.productPrice;
			}),
		);
		setPriceRange(false);
	};

	// 가격대별 검색
	const priceSearch = (min, max) => {
		setSortData(
			product.filter(data => {
				return data.productPrice >= min && data.productPrice < max;
			}),
		);
		setPriceRange(false);
	};

	// 가격대별 정렬

	return (
		<MainContainer>
			{/* 카테고리 */}
			<Category>
				<CategoryTitle>
					<div className="page_title">Bag</div>
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
							setSortData(product);
							setTitleRange(true);
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
									setPriceRange(true);
								}}
							>
								전체보기
							</li>
							<li onClick={() => priceSearch(0, 50000)}>~ 50,000원</li>
							<li onClick={() => priceSearch(50000, 80000)}>50,000원 ~ 80,000원</li>
							<li onClick={() => priceSearch(80000, 110000)}>80,000원 ~ 110,000원</li>
							<li onClick={() => priceSearch(110000, 130000)}>110,000원 ~ 130,000원</li>
							<li onClick={() => priceSearch(130000, 10000000000)}>130,000원 ~</li>
							<li style={{ width: '248px' }}>
								<input className="minPrice" type="text"></input>
								<span>원 ~</span>
								<input className="maxPrice" type="text"></input>
								<span>원</span>
								<span type="submit" className="search_btn">
									검색
								</span>
							</li>
						</ul>
					</div>
				</OtherCategory>

				<OtherCategory>
					<CategoryName>검색</CategoryName>
					<div className="search_items">
						<input type="text" id="search_items" />
						<span type="submit" className="search_btn">
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
						<span className="select-medium">중분류: 백팩</span>
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
						<ul className="list_item" id="list_item">
							{titleRange && priceRange && colorRange
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
												<span>M</span>
												<span className="option_btn">OPTION ▼</span>
											</div>
										</li>
								  ))
								: sortData.map(data => (
										<li className="li_outer">
											<div className="li_inner">
												<div className="list_img">
													<a href="/detail">
														<img src={data.ProductImg.src}></img>
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
												<span>M</span>
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
