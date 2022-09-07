import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Ul from 'components/Mypage/Like/List';
import { LikeSection, PagenationBox } from './styles';
import dummy from 'components/Mypage/data.json';
import Pagination from 'react-js-pagination';
import { GetApi, PostHeaderApi, PostQueryApi } from 'utils/api';
import { getData } from 'utils/getData';

function Mainlike() {
	// 페이지네이션
	const [page, setPage] = useState(1);
	const [items, setItems] = useState(8);
	const handlePageChange = page => {
		setPage(page);
	};

	// 좋아요 리스트 추가 삭제
	const [likeList, setlikeList] = useState([]);

	const onRemove = id => e => {
		setlikeList(likeList.filter(dummy.id != id));
	};

	const loginToken = getData();
	// console.log(loginToken)
	useEffect(() => {
		// const params = {
		// 	header: loginToken.accessToken
		// }
		// PostHeaderApi('/api/mypage/favoriteGoods',{Authorization: params} ).then(res => {setlikeList(res.likeProduct)});
		fetch('http://141.164.48.244/api/mypage/favoriteGoods', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: loginToken.accessToken,
			},
		})
			.then(res => res.json())
			.then(res => {
				setlikeList(res.likeProduct);
			});
	}, []);

	// console.log('like', likeList);
	return (
		<>
			<MypageMain>
				<LikeSection>
					<header>
						<h1>좋아요</h1>
						<h2>상품</h2>
					</header>
					{likeList.slice(items * (page - 1), items * (page - 1) + items).map((data, index) => (
						<Ul
							key={index}
							id={index}
							img={data.ProductImg.src}
							model={data.productTitle}
							price={data.productPrice}
							like={data.likes}
							onRemove={onRemove}
						/>
					))}
					<PagenationBox>
						<Pagination
							activePage={page}
							itemsCountPerPage={items}
							totalItemsCount={likeList.length - 1}
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
