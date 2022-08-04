<<<<<<< HEAD:front/src/pages/Dtail/index.js
import React from 'react';
import ProductInfoRight from 'components/DetailProduct/ProductInfoRight';
// import ProductInfoLeft from 'components/DetailProduct/ProductInfoLeft';
import { DetailWrapper, ProductWrapper } from './styles';
import HeaderInfo from 'components/DetailProduct/HeaderInfo';

const dummyProduct = {
	BigCategoryName: '가방',
	SmallCategoryName: '백팩',
	ProductTitle: '앱솔루트 백팩 블랙',
	brandId: 'AST4252',
	brandName: 'ALVINCLO',
	season: '2022 S/S',
	sex: '남',
	views: 'AST4252',
	likes: '27,935',
	BeReleased: '결제 3일 이내 출고',
	DeliveryFrom: '국내',
	DeliveryWay: '입점사 배송',
	DeliveryCompany: 'CJ대한통운',
	NonMemberPrice: '34900',
	RookiePrice: '34900',
	MemberPrice: '34900',
	BronzePrice: '34900',
	SliverPrice: '34900',
	GoldPrice: '34900',
	PlatinumPrice: '34900',
	DiamondPrice: '34900',
	PlatinumPrice: '34900',
};

const DetailProduct = () => {
	return (
		<div>
			<DetailWrapper>
				<HeaderInfo data={dummyProduct} />
				<ProductWrapper>
					{/* <ProductInfoLeft data={dummyProduct} /> */}
					<ProductInfoRight data={dummyProduct} />
				</ProductWrapper>
			</DetailWrapper>
		</div>
	);
};

export default DetailProduct;
=======
import React from 'react';
import { DetailWrapper, ProductWrapper } from './styles';

import ProductInfoRight from 'components/DetailProduct/ProductInfoRight/InfoRight';
import ProductInfoLeft from 'components/DetailProduct/ProductInfoLeft';
import HeaderInfo from 'components/DetailProduct/ProductInfoRight/HeaderInfo';
import ProductInfo from 'components/DetailProduct/ProductInfo';

const dummyProduct = {
	BigCategoryName: '가방',
	SmallCategoryName: '백팩',
	ProductTitle: '앱솔루트 백팩 블랙',
	brandId: 'AST4252',
	brandName: 'ALVINCLO',
	season: '2022 S/S',
	sex: '남',
	views: 'AST4252',
	likes: '27,935',
	BeReleased: '결제 3일 이내 출고',
	DeliveryFrom: '국내',
	DeliveryWay: '입점사 배송',
	DeliveryCompany: 'CJ대한통운',
	NonMemberPrice: '34900',
	RookiePrice: '34900',
	MemberPrice: '34900',
	BronzePrice: '34900',
	SliverPrice: '34900',
	GoldPrice: '34900',
	PlatinumPrice: '34900',
	DiamondPrice: '34900',
	PlatinumPrice: '34900',
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
>>>>>>> a1b58fe9ee58b79f0e2e379ec30e6b72e204aa6d:front/src/pages/detail/index.js
