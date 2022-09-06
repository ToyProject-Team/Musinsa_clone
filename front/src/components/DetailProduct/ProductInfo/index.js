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

const ProductInfo = () => {
	const [buttonClick, setButtonClick] = useState(false);

	// const IsMore = useMemo(() => {
	// 	const ImageSimpleInfo = () => {
	// 		return (
	// 			<ImageInfo clicked={buttonClick}>
	// 				<img src="https://www.dummyimage.com/943x1800/bdbdbd/000000&text=productInfo" />
	// 			</ImageInfo>
	// 		);
	// 	};
	// 	if (buttonClick === false) {
	// 		return <ImageSimpleInfo />;
	// 	}
	// 	return <ImageSimpleInfo />;
	// }, [buttonClick]);

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
				<img src="https://www.dummyimage.com/943x1800/bdbdbd/000000&text=productInfo" />
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
