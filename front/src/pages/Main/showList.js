import React from 'react';
import './styles';
// import { PostQueryApi, ApiTest } from 'utils/api';
// import InfiniteScroll from 'react-infinite-scroll-component';

const ShowList = props => {
	// //무한스크롤 관련 함수
	// const getMoreItems = () => {
	// 	//페이지 + 1하고 나머지 params들은 리셋
	// 	props.setPage(props.page + 1);
	// 	props.setPrice();
	// 	props.setMainSort();
	// 	const params = {
	// 		page: props.page + 1,
	// 		bigCategoryId: props.bigCategoryId,
	// 		smallCategoryId: props.smallCategoryId,
	// 	};

	// 	// PostQueryApi('/api/product/productList', params).then(res =>
	// 	// 	props.setProduct(res.data.productData),
	// 	// );
	// };

	return props.product?.map(data => (
		<li className="li_outer">
			<div className="li_inner">
				<div className="list_img">
					<a href={`/detail?productId=${data.id}`}>
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
				<span className="option_btn">OPTION ▼</span>
				{/* <div className="option_size">
							<ul><li>{data.ProductSizes[0].size}</li></ul></div> */}
			</div>
		</li>
	));
};

export default ShowList;
