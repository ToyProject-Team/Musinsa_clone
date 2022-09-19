import React from 'react';
import { DetailWrapper, ProductWrapper } from './styles';

import ProductInfoRight from 'components/DetailProduct/ProductInfoRight/InfoRight';
import ProductInfoLeft from 'components/DetailProduct/ProductInfoLeft';
import HeaderInfo from 'components/DetailProduct/ProductInfoRight/HeaderInfo';
import ProductInfo from 'components/DetailProduct/ProductInfo';
import { GetApi, PostHeaderBodyApi } from 'utils/api';
import { useEffect } from 'react';
import {
	initialProduceDetail,
	PRODUCTDETAIL,
	ProductDetailProvider,
	useProductDetailDispatch,
	useProductDetailState,
} from 'context/ProductDetailContext';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { URLquery } from 'utils/URLquery';
import Footer from 'layouts/Footer';
import { getData } from 'utils/getData';

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
	option: {
		option1: ['95', '100', '105'],
		option2: [['화이트', '블랙'], ['블랙', '그린', '네이비'], ['네이비']],
	},
	ProductMainTags: [
		{
			name: 'L',
			ProductSubTags: [
				{
					name: '딥레드',
					amount: 8,
				},
				{
					name: '블랙',
					amount: 8,
				},
			],
		},
		{
			name: 'XL',
			ProductSubTags: [
				{
					name: '블루',
					amount: 8,
				},
				{
					name: '그린',
					amount: 8,
				},
			],
		},
	],
};

const DetailProduct = () => {
	const location = useLocation();
	const query = URLquery(location);

	const [initialProduceDetail, setInitialProduceDetail] = useState({
		user: {},
		product: {},
		order: {
			pay: 'card',
			modal: false,
		},
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const asyncFunction = async () => {
			try {
				const result = await GetApi(`/api/product/productDetail?productId=${query.productId}`);
				setInitialProduceDetail(prev => ({
					...prev,
					product: result.data.product,
				}));

				const { accessToken } = getData();
				const data = {
					keys: ['address'],
				};
				const user = await PostHeaderBodyApi(
					`/api/auth/getUserData`,
					data,
					'Authorization',
					accessToken,
				);
				console.log(user);
				// setInitialProduceDetail(prev => ({
				// 	...prev,
				// 	user: result.data.product,
				// }));

				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		asyncFunction();
	}, []);

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : (
				<ProductDetailProvider value={initialProduceDetail}>
					<DetailWrapper>
						<HeaderInfo />
						<ProductWrapper>
							<ProductInfoLeft data={dummyProduct} />
							<ProductInfoRight data={dummyProduct} />
						</ProductWrapper>
					</DetailWrapper>
					<ProductInfo />
					<Footer></Footer>
				</ProductDetailProvider>
			)}
		</>
	);
};

export default DetailProduct;
