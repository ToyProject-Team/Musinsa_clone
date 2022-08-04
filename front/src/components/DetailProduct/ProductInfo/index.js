import { InfoWrapper, Button, TitleBox, ImageInfo } from './styles';

const ProductInfo = () => {
	return (
		<InfoWrapper>
			<TitleBox>
				<h4>Product Info</h4>
				<p>제품정보</p>
				<div>해당 상품정보에 문제가 있으면 알려주세요.</div>
			</TitleBox>
			<ImageInfo></ImageInfo>
			<Button>상품 더보기</Button>
		</InfoWrapper>
	);
};

export default ProductInfo;
