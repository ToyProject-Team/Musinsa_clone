import { ListWrapper, List, Level, Price } from './styles';

const PriceList = ({ data }) => {
	return (
		<div>
			<ListWrapper>
				<List>
					<Level>비회원가</Level>
					<Price>{data.NonMemberPrice}</Price>원
				</List>
				<List>
					<Level>루키</Level>
					<Price>{data.RookiePrice}</Price>원
				</List>
				<List>
					<Level>멤버</Level>
					<Price>{data.MemberPrice}</Price>원
				</List>
				<List>
					<Level>브론즈</Level>
					<Price>{data.BronzePrice}</Price>원
				</List>
				<List>
					<Level>실버</Level>
					<Price>{data.SliverPrice}</Price>원
				</List>
				<List>
					<Level>골드</Level>
					<Price>{data.GoldPrice}</Price>원
				</List>
				<List>
					<Level>플레티넘</Level>
					<Price>{data.PlatinumPrice}</Price>원
				</List>
				<List>
					<Level>다이아몬드</Level>
					<Price>{data.DiamondPrice}</Price>원
				</List>
			</ListWrapper>
		</div>
	);
};

export default PriceList;
