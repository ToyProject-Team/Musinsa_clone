import React, { useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Ul from 'components/Mypage/Like/List';
import { LikeSection, PagenationBox } from './styles';
import dummy from 'components/Mypage/data.json';
import Pagination from 'react-js-pagination';

function Mainlike() {
	const [page, setPage] = useState(1);
	const [items, setItems] = useState(4);
	const handlePageChange = page => {
		setPage(page);
	};

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
						/>
					))}
          <PagenationBox>
          <Pagination
						activePage={1}
						itemsCountPerPage={4}
						totalItemsCount={dummy.length - 1}
						pageRangeDisplayed={5}
						onChange={handlePageChange}
            firstPageText={""}
            lastPageText={""}
            prevPageText={""}
            nextPageText={""}
					/>
          </PagenationBox>	
				</LikeSection>
			</MypageMain>
		</>
	);
}

export default Mainlike;
