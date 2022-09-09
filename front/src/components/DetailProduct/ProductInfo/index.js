import { useState, useMemo } from 'react';
import {
	InfoWrapper,
	Button,
	TitleBox,
	ImageInfo,
	MoreInfo,
	ImagagaInfo,
	ButtonWrapper,
} from './styles';
import { ReactComponent as ArrowDown } from 'assets/svg/ArrowDown.svg';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const dummyImage = {
	dummyImage: [
		{
			id: 0,
			src: 'https://file.platformshop.co.kr/saintjames/2022/ASJU223KR43-017_02.jpg',
		},
		{
			id: 1,
			src: 'https://file.platformshop.co.kr/saintjames/2022/ASJU223KR43-017_03.jpg',
		},
		{
			id: 2,
			src: 'https://file.platformshop.co.kr/saintjames/2022/ASJU223KR43-017_04.jpg',
		},
		{
			id: 3,
			src: 'https://file.platformshop.co.kr/saintjames/2022/ASJU223KR43-017_05.jpg',
		},
		{
			id: 4,
			src: 'https://file.platformshop.co.kr/saintjames/2022/ASJU223KR43-017_06.jpg',
		},
		{
			id: 5,
			src: 'https://file.platformshop.co.kr/saintjames/2022/ASJU223KR43-017_07.jpg',
		},
	],
};

const ProductInfo = () => {
	const [buttonClick, setButtonClick] = useState(false);

	const IsMore = () => {
		return (
			<div>
				<MoreInfo />
				<Button>
					상품정보 더보기
					<IoIosArrowDown />
				</Button>
			</div>
		);
	};

	return (
		<InfoWrapper clicked={buttonClick}>
			<TitleBox>
				<h4>Product Info</h4>
				<p>제품정보</p>
				<div>해당 상품정보에 문제가 있으면 알려주세요.</div>
			</TitleBox>
			<ImageInfo clicked={buttonClick}>
				{dummyImage.dummyImage.map(image => (
					<img key={image.id} src={image.src} />
				))}
			</ImageInfo>
			<ButtonWrapper onClick={() => setButtonClick(!buttonClick)}>
				{!buttonClick ? (
					<IsMore />
				) : (
					<Button>
						상품정보 접기 <IoIosArrowUp />
					</Button>
				)}
			</ButtonWrapper>
		</InfoWrapper>
	);
};

export default ProductInfo;
