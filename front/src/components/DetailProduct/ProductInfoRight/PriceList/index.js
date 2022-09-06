import { useProductDetailState } from 'context/ProductDetailContext';
import { ListWrapper, List, Level, Price } from './styles';

const PriceList = () => {
	const detail = useProductDetailState();

	return (
		<div>
			<ListWrapper>
				<List>
					<Level>비회원가</Level>
					<Price>{detail.product.nonMemberPrice}</Price>원
				</List>
				<List>
					<Level>루키</Level>
					<Price>{detail.product.rookiePrice}</Price>원
				</List>
				<List>
					<Level>멤버</Level>
					<Price>{detail.product.memberPrice}</Price>원
				</List>
				<List>
					<Level>브론즈</Level>
					<Price>{detail.product.bronzePrice}</Price>원
				</List>
				<List>
					<Level>실버</Level>
					<Price>{detail.product.silverPrice}</Price>원
				</List>
				<List>
					<Level>골드</Level>
					<Price>{detail.product.goldPrice}</Price>원
				</List>
				<List>
					<Level>플레티넘</Level>
					<Price>{detail.product.platinumPrice}</Price>원
				</List>
				<List>
					<Level>다이아몬드</Level>
					<Price>{detail.product.diamondPrice}</Price>원
				</List>
			</ListWrapper>
		</div>
	);
};

export default PriceList;
