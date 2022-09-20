import { useProductDetailState } from 'context/ProductDetailContext';
import { useState, useCallback, useEffect } from 'react';
import ImageZoom from '../ImageZoom';
import { ProductImage, MainImage, ImageList, Image } from './styles';

const ProductInfoLeft = ({ data }) => {
	const detail = useProductDetailState();

	const dummyImage = {
		Images: [
			{
				id: 0,
				src: `https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${detail.product.ProductImg.src}`,
			},
			{
				id: 0,
				src: 'https://image.msscdn.net/images/goods_img/20220907/2778463/2778463_1_500.jpg?t=20220907145349',
			},
			{
				id: 1,
				src: 'https://image.msscdn.net/images/prd_img/20220907/2778463/detail_2778463_1_big.jpg',
			},
			{
				id: 2,
				src: 'https://image.msscdn.net/images/prd_img/20220907/2778463/detail_2778463_2_big.jpg',
			},
			{
				id: 3,
				src: 'https://image.msscdn.net/images/prd_img/20220907/2778463/detail_2778463_3_500.jpg',
			},
			{
				id: 4,
				src: 'https://image.msscdn.net/images/prd_img/20220907/2778463/detail_2778463_4_500.jpg',
			},
			{
				id: 5,
				src: 'https://image.msscdn.net/images/prd_img/20220907/2778463/detail_2778463_5_500.jpg',
			},
		],
	};

	const [thumbNum, setThumbNum] = useState(0);
	const [active, setActive] = useState('');

	const imageList = dummyImage.Images.map((image, index) => (
		<div
			key={index}
			onMouseOver={() => setActive(index)}
			className={active === index ? 'active' : ''}
		>
			<img src={image.src} onMouseOver={() => setThumbNum(image.id)} />
		</div>
	));

	return (
		<ProductImage>
			<MainImage>
				<ImageZoom img={dummyImage.Images[thumbNum].src} alt={'사진'}></ImageZoom>
			</MainImage>
			<ImageList>{imageList}</ImageList>
		</ProductImage>
	);
};

export default ProductInfoLeft;
