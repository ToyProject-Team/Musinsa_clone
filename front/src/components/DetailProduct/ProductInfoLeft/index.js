import { useProductDetailState } from 'context/ProductDetailContext';
import { useState, useCallback, useEffect } from 'react';
import ImageZoom from '../ImageZoom';
import { ProductImage, MainImage, ImageList, Image } from './styles';

const dummyImage = {
	Images: [
		{ id: 0, src: 'https://www.dummyimage.com/500x600/a9a9a9/000000&text=productImage1' },
		{ id: 1, src: 'https://www.dummyimage.com/500x600/a9a9a9/000000&text=productImage2' },
		{ id: 2, src: 'https://www.dummyimage.com/500x600/a9a9a9/000000&text=productImage3' },
		{ id: 3, src: 'https://www.dummyimage.com/500x600/a9a9a9/000000&text=productImage4' },
		{ id: 4, src: 'https://www.dummyimage.com/500x600/a9a9a9/000000&text=productImage5' },
	],
};

const ProductInfoLeft = ({ data }) => {
	const detail = useProductDetailState();

	const [thumbNum, setThumbNum] = useState(0);

	const imageList = dummyImage.Images.map((image, index) => (
		<div key={index}>
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
