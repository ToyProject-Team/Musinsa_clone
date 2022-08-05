import { ListWrapper, List, Level, Price } from './styles';

const PriceList = ({ data }) => {
	return (
		<div>
			<ListWrapper>
				<List>
					<Level>비회원가</Level>
					<Price>{data.nonMemberPrice}</Price>원
				</List>
				<List>
					<Level>루키</Level>
					<Price>{data.rookiePrice}</Price>원
				</List>
				<List>
					<Level>멤버</Level>
					<Price>{data.memberPrice}</Price>원
				</List>
				<List>
					<Level>브론즈</Level>
					<Price>{data.bronzePrice}</Price>원
				</List>
				<List>
					<Level>실버</Level>
					<Price>{data.sliverPrice}</Price>원
				</List>
				<List>
					<Level>골드</Level>
					<Price>{data.goldPrice}</Price>원
				</List>
				<List>
					<Level>플레티넘</Level>
					<Price>{data.platinumPrice}</Price>원
				</List>
				<List>
					<Level>다이아몬드</Level>
					<Price>{data.diamondPrice}</Price>원
				</List>
			</ListWrapper>
		</div>
	);
};

export default PriceList;
