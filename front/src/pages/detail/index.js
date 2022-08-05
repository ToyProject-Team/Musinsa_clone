import React from 'react';
import { DetailWrapper, ProductWrapper } from './styles';

import ProductInfoRight from 'components/DetailProduct/ProductInfoRight/InfoRight';
import ProductInfoLeft from 'components/DetailProduct/ProductInfoLeft';
import HeaderInfo from 'components/DetailProduct/ProductInfoRight/HeaderInfo';
import ProductInfo from 'components/DetailProduct/ProductInfo';

const dummyProduct = {
	BigCategoryName: '상의',
	SmallCategoryName: '반소매 티셔츠',
	productTitle: ' [패키지] 핀스 오버핏 카라 반팔티 2PACK YHST2354',
	brandId: 'AST4252',
	brandName: 'JEMUTS',
	season: '2022 S/S',
	gender: '남',
	views: 'AST4252',
	likes: '27,935',
	beReleased: '결제 3일 이내 출고',
	deliveryFrom: '국내',
	deliveryWay: '입점사 배송',
	deliveryCompany: 'CJ대한통운',
	productPrice: 36900,
	nonMemberPrice: 34900,
	rookiePrice: 34900,
	memberPrice: 33900,
	bronzePrice: 32990,
	sliverPrice: 31900,
	goldPrice: 31900,
	platinumPrice: 30900,
	diamondPrice: 30900,
	productInfo: 'https://neikidnis.imghost.cafe24.com/neikidnis/head_all.gif',
};

const DetailProduct = () => {
	return (
		<div>
			<DetailWrapper>
				<HeaderInfo data={dummyProduct} />
				<ProductWrapper>
					<ProductInfoLeft data={dummyProduct} />
					<ProductInfoRight data={dummyProduct} />
				</ProductWrapper>
			</DetailWrapper>
			<ProductInfo />
		</div>
	);
};

export default DetailProduct;
