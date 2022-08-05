import {
	ProductInfo,
	InfoWrapper,
	DetailInfoWrapper,
	TitleBox,
	DetailInfo,
	DownIcon,
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
							<InfoContent>{data.gender}</InfoContent>
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
							<InfoContent>{data.beReleased}</InfoContent>
						</DetailInfo>
						<DetailInfo>
							<InfoTitle>배송 방법</InfoTitle>
							<InfoContent>{data.deliveryFrom}</InfoContent>
							<span>/</span>
							<InfoContent>{data.deliveryWay}</InfoContent>
							<span>/</span>
							<InfoContent>{data.deliveryCompany}</InfoContent>
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
								{data.productPrice}
								<Price>원</Price>
							</PriceContent>
						</DetailInfo>
						<DetailInfo>
							<PriceTitle>무신사 회원가</PriceTitle>
							<PriceContent onClick={onToggle}>
								{data.rookiePrice}
								<Price>원</Price>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									width="16"
									height="16"
									style={{ paddingLeft: '6px' }}
								>
									<path
										fill-rule="evenodd"
										d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"
									></path>
								</svg>
							</PriceContent>
							{toggle ? <PriceList data={data} /> : <></>}
						</DetailInfo>
					</DetailInfoWrapper>
					<TextBox>
						<Box>무신사는 전 상품 무료배송입니다.</Box>
						<Box>회원 특별 혜택</Box>
					</TextBox>
					{/* <Add_1>무신사는 전 상품 무료배송입니다.</Add_1>
					<Add_2>회원 특별 혜택</Add_2> */}
				</InfoWrapper>
			</ProductInfo>
			<PurchaseForm data={data} />
		</div>
	);
};

export default ProductInfoRight;
