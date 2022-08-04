import {
	ProductInfo,
	InfoWrapper,
	DetailInfoWrapper,
	TitleBox,
	DetailInfo,
	InfoContent,
	InfoTitle,
	PriceTitle,
	PriceContent,
	Price,
	InfoWrapperProduct,
	Box,
	TextBox,
} from './styles';

import { useState, useCallback } from 'react';
import PriceList from 'components/DetailProduct/ProductInfoRight/PriceList';
import PurchaseForm from '../PurchaseForm';

const ProductInfoRight = ({ data }) => {
	const [toggle, setToggle] = useState(false);

	const onToggle = useCallback(() => {
		setToggle(prev => !prev);
	}, [toggle]);

	return (
		<div>
			<ProductInfo>
				<InfoWrapperProduct>
					<TitleBox>
						<h4>Product Info</h4>
						<p>제품정보</p>
					</TitleBox>
					<DetailInfoWrapper>
						<DetailInfo>
							<InfoTitle>시즌 / 성별</InfoTitle>
							<InfoContent>{data.season}</InfoContent>
							<span>/</span>
							<InfoContent>{data.sex}</InfoContent>
						</DetailInfo>
						<DetailInfo>
							<InfoTitle>조회수(1개월)</InfoTitle>
							<InfoContent>{data.views}</InfoContent>
						</DetailInfo>
						<DetailInfo>
							<InfoTitle>좋아요</InfoTitle>
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
						<InfoTitle>배송정보</InfoTitle>
					</TitleBox>
					<DetailInfoWrapper>
						<DetailInfo>
							<InfoTitle>출고 정보</InfoTitle>
							<InfoContent>{data.BeReleased}</InfoContent>
						</DetailInfo>
						<DetailInfo>
							<InfoTitle>배송 방법</InfoTitle>
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
							<PriceTitle>무신사 판매가</PriceTitle>
							<PriceContent className="line">
								{data.NonMemberPrice}
								<Price>원</Price>
							</PriceContent>
						</DetailInfo>
						<DetailInfo>
							<PriceTitle>무신사 회원가</PriceTitle>
							<PriceContent onClick={onToggle}>
								{data.RookiePrice}
								<Price>원</Price>
							</PriceContent>
							{toggle ? <PriceList data={data} /> : <></>}
						</DetailInfo>
					</DetailInfoWrapper>
					<TextBox>
						<Box>무신사는 전 상품 무료배송입니다.</Box>
						<Box>회원 특별 혜택</Box>
					</TextBox>
				</InfoWrapper>
			</ProductInfo>
			<PurchaseForm />
		</div>
	);
};

export default ProductInfoRight;
