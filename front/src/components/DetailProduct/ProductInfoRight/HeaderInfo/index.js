import {
    PRODUCTDETAIL,
    useProductDetailDispatch,
    useProductDetailState,
} from 'context/ProductDetailContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bigCategory } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { Header, CategoryWrapper } from './styles';

const HeaderInfo = () => {
    const detail = useProductDetailState();
    const navigate = useNavigate();

    return (
        <Header>
            <CategoryWrapper>
                <p onClick={() => navigate(`/?bigCategoryId=${detail.product.BigCategoryId}`)}>
                    {bigCategory[detail.product.BigCategoryId - 1]}
                </p>
                <span> &gt; </span>
                <p
                    onClick={() =>
                        navigate(
                            `/?bigCategoryId=${detail.product.BigCategoryId}&smallCategoryId=${detail.product.SmallCategoryId}`,
                        )
                    }
                >
                    {
                        smallCategory[detail.product.BigCategoryId - 1][
                            detail.product.SmallCategoryId
                        ]
                    }
                </p>
            </CategoryWrapper>
            <p>{detail.product.productTitle}</p>
        </Header>
    );
};
export default HeaderInfo;
