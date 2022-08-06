import { useNavigate } from 'react-router-dom';
import { Header, CategoryWrapper } from './styles';

const HeaderInfo = ({ data }) => {
	const navigate = useNavigate();
	return (
		<Header>
			<CategoryWrapper>
				<p onClick={() => navigate(`/${data.BigCategoryName}`)}>{data.BigCategoryName}</p>
				<span> &gt; </span>
				<p onClick={() => navigate(`/${data.SmallCategoryName}`)}>{data.SmallCategoryName}</p>
			</CategoryWrapper>
			<p>{data.productTitle}</p>
		</Header>
	);
};
export default HeaderInfo;
