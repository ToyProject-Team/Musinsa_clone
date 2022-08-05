import { useNavigate } from 'react-router-dom';
import { Header, CategoryWrapper, Title } from './styles';

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
