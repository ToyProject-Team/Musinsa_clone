import {
	ProductInfo,
	InfoWrapper,
	DetailInfoWrapper,
	DetailInfo,
	TitleBox,
	Title,
	InfoTitle,
	InfoContent,
	SubTitle,
	InfoSplit,
	PriceTitle,
	PriceContent,
	InfoWrapperProduct,
	AAA,
} from './styles';

import { useState, useCallback } from 'react';

const ProductInfoRight = ({ data }) => {
	const [toggle, setToggle] = useState(false);
	const onToggle = useCallback(() => {
		if (!toggle) {
		} else {
		}
	}, []);

	return (
		<ProductInfo>
			<InfoWrapperProduct>
				<TitleBox>
					<h4>Product Info</h4>
					<p>제품정보</p>
				</TitleBox>
				<DetailInfoWrapper>
					<DetailInfo>
						<p>시즌 / 성별</p>
						<InfoContent>{data.season}</InfoContent>
						<span>/</span>
						<InfoContent>{data.sex}</InfoContent>
					</DetailInfo>
					<DetailInfo>
						<p>조회수(1개월)</p>
						<InfoContent>{data.views}</InfoContent>
					</DetailInfo>
					<DetailInfo>
						<p>좋아요</p>
						<img
							src="	https://image.msscdn.net/skin/musinsa/images/icon_like_small_on.png"
							style={{ paddingRight: '6px', width: 15, height: 15 }}
						/>
						<InfoContent style={{ color: 'red' }}>{data.likes}</InfoContent>
					</DetailInfo>
				</DetailInfoWrapper>
			</InfoWrapperProduct>
			<InfoWrapper>
				<TitleBox>
					<h4>Delivery Info</h4>
					<p>배송정보</p>
				</TitleBox>
				<DetailInfoWrapper>
					<DetailInfo>
						<p>출고 정보</p>
						<InfoContent>{data.BeReleased}</InfoContent>
					</DetailInfo>
					<DetailInfo>
						<p>배송 방법</p>
						<InfoContent>{data.DeliveryFrom}</InfoContent>
						<span>/</span>
						<InfoContent>{data.DeliveryWay}</InfoContent>
						<span>/</span>
						<InfoContent>{data.DeliveryCompany}</InfoContent>
					</DetailInfo>
				</DetailInfoWrapper>
			</InfoWrapper>
			<InfoWrapper>
				<TitleBox>
					<h4>Price Info</h4>
					<p>가격정보</p>
				</TitleBox>
				<DetailInfoWrapper>
					<DetailInfo>
						<p>무신사 판매가</p>
						<PriceContent className="line">
							{data.NonMemberPrice}
							<span style={{ fontSize: '15px', fontWeight: 'bold', paddingLeft: '2px' }}>원</span>
						</PriceContent>
					</DetailInfo>
					<DetailInfo>
						<PriceTitle>무신사 회원가</PriceTitle>
						<PriceContent>
							{data.RookiePrice}
							<span style={{ fontSize: '15px', fontWeight: 'bold', paddingLeft: '2px' }}>원</span>
						</PriceContent>
					</DetailInfo>
				</DetailInfoWrapper>
			</InfoWrapper>
		</ProductInfo>
	);
};

export default ProductInfoRight;
