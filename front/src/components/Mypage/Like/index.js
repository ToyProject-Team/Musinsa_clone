import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Ul from 'components/Mypage/Like/List';
import { LikeSection, PagenationBox } from './styles';
import dummy from 'components/Mypage/data.json';
import Pagination from 'react-js-pagination';
import { GetApi, PostHeaderApi, PostQueryApi } from 'utils/api';
import { getData } from 'utils/getData';
import axios from 'axios';

function Mainlike() {
	// 페이지네이션
	const [page, setPage] = useState(1);
	const [items, setItems] = useState(8);
	const handlePageChange = page => {
		setPage(page);
	};

	// 좋아요 리스트 저장
	const [likeLists, setlikeList] = useState([]);

	// 좋아요 리스트 서버에서 가져오기
	const loginToken = getData();
	console.log(loginToken);

	useEffect(() => {
		// const params = {
		// 	Authorization: loginToken.accessToken
		// }
		// GetApi('/api/mypage/favoriteGoods', params ).then(res => {setlikeList(res.likeProduct)});
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

	// 좋아요리스트 삭제
	const onRemove = useCallback(id => {
		// front 에서 먼저 리스트 삭제
		const deleteList = likeLists.filter(likeList => likeList.id !== id);
		setlikeList(deleteList);
		axios
			.delete('http://141.164.48.244/api/mypage/favoriteGoods/del', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: loginToken.accessToken,
				},
				data: {
					productId: id,
				},
			})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				// switch (err) {
				// 	case 400:
				// 		console.log('입력값을 다시 확인해주세요');
				// 		break;
				// 	case 401:
				// 		console.log("유저의 조회 결과가 없습니다");
				// 		break;
				// 	case 402:
				// 		console.log("좋아요하지 않은 상품을 삭제 시도하셨습니다");
				// 		break;
				// 	case 500:
				// 		console.log("서버 에러");
				// 		break;
				// }
				console.log('실패');
				// 안지워졌을시 필터했던 아이템 다시 추가 


			});
			

	});

	return (
		<>
			<MypageMain>
				<LikeSection>
					<header>
						<h1>좋아요</h1>
						<h2>상품</h2>
					</header>
					{likeLists.slice(items * (page - 1), items * (page - 1) + items).map((data, index) => (
						<Ul
							key={data.id}
							id={data.id}
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
							totalItemsCount={likeLists.length - 1}
							pageRangeDisplayed={5}
							onChange={handlePageChange}
							hideNavigation={true}
							hideFirstLastPages={true}
						/>
					</PagenationBox>
				</LikeSection>
			</MypageMain>
		</>
	);
}

export default Mainlike;
