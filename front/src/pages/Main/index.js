import React, { useState, useEffect, useCallback } from 'react';
import {
	MainContainer,
	Category,
	CategoryTitle,
	BrandCategory,
	MiddleCategory,
	BrandList,
	BrandAttribute,
	OtherCategory,
	CategoryName,
	ItemSection,
	Items,
	SelectBox,
	SortBox,
	ListBox,
} from './styles';
import Data from './data.json';

const Main = () => {
	const [dummyData, setDummyData] = useState(Data);
	const [selectBox, setSelectBox] = useState(true);
	const [searchInput, setSearchInput] = useState('');
	const [priceArr, setPriceArr] = useState([]);

	const allTypeArr = dummyData.map(data => data.item);
	const [priceRange, setPriceRange] = useState(true);

	// 가격대별 검색
	const priceSearch = (min, max) => {
		setPriceArr(
			dummyData.filter(data => {
				return data.price >= min && data.price < max;
			}),
		);
		setPriceRange(false);
	};

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
					<CategoryName>중분류</CategoryName>
					<div className="all_item">전체</div>
					<div className="all_item_list">
						<ul>
							{allTypeArr
								.filter((val, idx) => allTypeArr.indexOf(val) === idx)
								.map(data => {
									return <li>{data}</li>;
								})}
						</ul>
					</div>
				</MiddleCategory>

				<BrandCategory>
					<CategoryName>
						<div>브랜드</div>
						<div>
							<form>
								<input
									type="text"
									title="브랜드 검색"
									onChange={e => {
										setSearchInput(e.target.value);
									}}
								></input>
								<img src="https://image.msscdn.net/skin/musinsa/images/search_grey_14.gif"></img>
							</form>
						</div>
					</CategoryName>
					<div>
						<BrandList style={{ paddingBottom: '10px' }}>
							<BrandAttribute style={{ display: 'flex', alignItems: 'center' }}>
								<img src="https://image.msscdn.net/skin/musinsa/images/icon_like_small_on.png?20171024"></img>
								<span>좋아요</span>
							</BrandAttribute>
							<div style={{ minWidth: '600px' }}>등록된 관심브랜드가 없습니다.</div>
						</BrandList>

						<BrandList>
							<BrandAttribute>인기</BrandAttribute>
							<div>
								<ul>
									<li>..상품들</li>
									<li>..상품들</li>
									<li>..상품들</li>
									<li>..상품들</li>
									<li>..상품들</li>
									<li>..상품들</li>
								</ul>
							</div>
						</BrandList>

						<BrandList>
							<BrandAttribute>
								<div>
									<p>단독</p>
									<button>+</button>
								</div>
								<div>
									<p>상품수 | </p>
									<p>&#160;가나다</p>
								</div>
							</BrandAttribute>
							<div>
								<ul>
									{dummyData
										.filter(val => {
											if (searchInput === '') return val;
											else if (val.brandName.includes(searchInput)) {
												return val;
											}
										})
										.map(data => {
											return (
												<li>
													<span>{data.brandName}</span>
												</li>
											);
										})}
								</ul>
							</div>
						</BrandList>

						<BrandList>
							<BrandAttribute>
								<div>
									<p>전체</p>
									<button>+</button>
								</div>
								<div>
									<p>상품수 | </p>
									<p>&#160;가나다</p>
								</div>
							</BrandAttribute>
							<div>
								<ul>
									<li>..상품들</li>
									<li>..상품들</li>
								</ul>
							</div>
						</BrandList>
					</div>
				</BrandCategory>

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
						<span className="sort">낮은 가격순</span>
						<span className="sort">높은 가격순</span>
						<span className="sort">할인율순</span>
						<span className="sort">후기순</span>
						<span className="sort">판매순</span>
					</SortBox>
					<ListBox>
						<ul className="list_item">
							{priceRange
								? dummyData.map(data => (
										<li className="li_outer">
											<div className="li_inner">
												<div className="list_img">
													<a href="/detail">
														<img src={data.url}></img>
													</a>
												</div>
												<div className="item_info">
													<p>{data.brandName}</p>
													<p>{data.model}</p>
													<p>{data.price.toLocaleString('ko-KR')}원</p>
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
								: priceArr.map(data => (
										<li className="li_outer">
											<div className="li_inner">
												<div className="list_img">
													<a href="/detail">
														<img src={data.url}></img>
													</a>
												</div>
												<div className="item_info">
													<p>{data.brandName}</p>
													<p>{data.model}</p>
													<p>{data.price.toLocaleString('ko-KR')}원</p>
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
						</ul>
					</ListBox>
				</Items>
			</ItemSection>
		</MainContainer>
	);
};

export default Main;
