import {
	PRODUCTDETAIL,
	useProductDetailDispatch,
	useProductDetailState,
} from 'context/ProductDetailContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, CategoryWrapper } from './styles';

const HeaderInfo = () => {
	const detail = useProductDetailState();
	const navigate = useNavigate();

	return (
		<Header>
			<CategoryWrapper>
				<p onClick={() => navigate(`/${detail.product.BigCategoryId}`)}>
					{detail.product.BigCategoryId}
				</p>
				<span> &gt; </span>
				<p onClick={() => navigate(`/${detail.product.SmallCategoryId}`)}>
					{detail.product.SmallCategoryId}
				</p>
			</CategoryWrapper>
			<p>{detail.product.productTitle}</p>
		</Header>
	);
};
export default HeaderInfo;
