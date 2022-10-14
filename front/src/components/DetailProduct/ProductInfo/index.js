import { useState, useMemo, useEffect, useRef } from 'react';
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

import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import ProductInfoImageList from '../ProductInfoImageList';

const dummyImage = {
    dummyImage: [
        {
            id: 0,
            src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            preload: true,
        },
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
            preload: false,
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
            preload: false,
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
            preload: false,
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717',
            preload: false,
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1576672843344-f01907a9d40c',
            preload: false,
        },
    ],
};

const ProductInfo = () => {
    const [buttonClick, setButtonClick] = useState(false);

    const IsMore = () => {
        return (
            <div>
                <MoreInfo />
                <Button>
                    상품정보 더보기
                    <RiArrowDownSLine />
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
                {dummyImage.dummyImage.map(image => (
                    <ProductInfoImageList image={image} />
                ))}
            </ImageInfo>
            <ButtonWrapper onClick={() => setButtonClick(!buttonClick)}>
                {!buttonClick ? (
                    <IsMore />
                ) : (
                    <Button>
                        상품정보 접기 <RiArrowUpSLine />
                    </Button>
                )}
            </ButtonWrapper>
        </InfoWrapper>
    );
};

export default ProductInfo;
