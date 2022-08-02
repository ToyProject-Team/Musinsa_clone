import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryWrapper = styled.div`
	font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
	position: relative;
	padding-top: 5px;
	padding-bottom: 10px;
	font-weight: bold;
	font-size: 12px;
	color: #a9a9a9;
	& > p {
		cursor: pointer;
		text-decoration: underline;
		text-decoration-color: #a9a9a9;
		display: inline-block;
		padding: 1px;
	}
	& > span {
		cursor: none;
		text-decoration-color: #a9a9a9;
		display: inline-block;
		padding: 1px;
	}
`;

const Header = styled.div`
	margin: '40px 20px 20px 20px';
`;

const Title = styled.p`
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: bold;
	padding-top: 5px;
	padding-bottom: 5px;
`;

const HeaderInfo = ({ data }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Header>
				<CategoryWrapper>
					<p onClick={() => navigate(`/${data.BigCategoryName}`)}>{data.BigCategoryName}</p>
					<span> &gt; </span>
					<p onClick={() => navigate(`/${data.SmallCategoryName}`)}>{data.SmallCategoryName}</p>
				</CategoryWrapper>
				<Title>{data.ProductTitle}</Title>
			</Header>
		</div>
	);
};
export default HeaderInfo;
