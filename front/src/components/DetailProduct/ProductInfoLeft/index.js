import { useState } from 'react';
import { ProductImage, MainImage, ImageList, Image } from './styles';

const dummyImage = [
	'http://via.placeholder.com/502x602/000000/ffffff?text=productThumbnail',
	'http://via.placeholder.com/60x72/000000/ffffff?text=productImage1',
	'http://via.placeholder.com/60x72/000000/ffffff?text=productImage2',
	'http://via.placeholder.com/60x72/000000/ffffff?text=productImage3',
];

const ProductInfoLeft = ({ data }) => {
	const [isHovering, setIsHovering] = useState(false);

	const onHover = () => {
		setIsHovering(true);
		setIsHovering();
	};

	return (
		<div>
			<ProductImage>
				<MainImage>
					<img src={dummyImage[0]} />
				</MainImage>
				<ImageList>
					<Image onMouseOver={onHover}>
						<img src={dummyImage[1]} />
					</Image>
					<Image>
						<img src={dummyImage[2]} />
					</Image>
					<Image>
						<img src={dummyImage[3]} />
					</Image>
				</ImageList>
			</ProductImage>
		</div>
	);
};

export default ProductInfoLeft;
