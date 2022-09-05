import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Ul from 'components/Mypage/Like/List';
import { LikeSection, PagenationBox } from './styles';
import dummy from 'components/Mypage/data.json';
import Pagination from 'react-js-pagination';
import { GetApi, PostQueryApi } from 'utils/api';
import { getData } from 'utils/getData';

function Mainlike() {
	// 페이지네이션
	const [page, setPage] = useState(1);
	const [items, setItems] = useState(4);
	const handlePageChange = page => {
		setPage(page);
	};

	// 좋아요 리스트 추가 삭제 
	const [likeProducts, setlikeProduct] = useState([]);

	const onRemove = id => e => {
		setlikeProduct(likeProducts.filter(dummy.id != id));
	};

	// const [loginToken, setLoginToken] = useState(() => getData());
	// console.log(loginToken);

	// console.log(getData().accessToken)

	const loginToken = getData();
	console.log(loginToken)



	useEffect(() => {
		fetch('http://141.164.48.244/api/mypage/favoriteGoods', {
			headers: {
				'Content-Type':'application/json',
				Authorization: loginToken.accessToken,
			},
		})
		.then(res => res.json())
		.then(res => {setlikeProduct(res);}
		);
	},[]);

	console.log(likeProducts);
	return (
		<>
			<MypageMain>
				<LikeSection>
					<header>
						<h1>좋아요</h1>
						<h2>상품</h2>
					</header>
					{dummy.slice(items * (page - 1), items * (page - 1) + items).map((data, index) => (
						<Ul
							key={data.id}
							id={data.id}
							img={data.url}
							brand={data.brandName}
							model={data.model}
							price={data.price}
							state={data.orderstatus}
							option={data.option}
							like={data.like}
							onRemove = {onRemove}
						/>
					))}
					<PagenationBox>
						<Pagination
							activePage={page}
							itemsCountPerPage={4}
							totalItemsCount={dummy.length - 1}
							pageRangeDisplayed={5}
							onChange={handlePageChange}
							firstPageText={''}
							lastPageText={''}
							prevPageText={''}
							nextPageText={''}
						/>
					</PagenationBox>
				</LikeSection>
			</MypageMain>
		</>
	);
}

export default Mainlike;
