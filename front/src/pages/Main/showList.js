import React, { useState, useEffect, useCallback } from 'react';
import './styles';
import InfiniteScroll from 'react-infinite-scroll-component';

const ShowList = props => {
	const itemCard = props.dummyData.map(data => (
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
	));
	// 무한스크롤
	const [list, setList] = useState(
		Array.from({ length: 1 }, () => {
			return itemCard;
		}),
	);
	const fetchMoreData = () => {
		setTimeout(() => {
			setList([
				...list,
				Array.from({ length: 1 }, () => {
					return itemCard;
				}),
			]);
		}, 1500);
	};

	return (
		<ul className="list_item" id="list_item">
			<InfiniteScroll
				dataLength={list.length}
				next={fetchMoreData}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				height={850}
			>
				{list}
			</InfiniteScroll>
		</ul>
	);
};

export default ShowList;