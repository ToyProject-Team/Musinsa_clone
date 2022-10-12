import { useProductDetailState } from 'context/ProductDetailContext';
import { useRef } from 'react';
import { useState, useCallback, useEffect } from 'react';
import ImageZoom from '../ImageZoom';
import { ProductImage, MainImage, ImageList } from './styles';

const ProductInfoLeft = ({ data }) => {
    const detail = useProductDetailState();

    const dummyImage = {
        Images: [
            {
                id: 0,
                src: `https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${detail.product.ProductImg.src}`,
            },
            {
                id: 1,
                src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            },
            {
                id: 2,
                src: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
            },
            {
                id: 3,
                src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
            },
            {
                id: 4,
                src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
            },
            {
                id: 5,
                src: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717',
            },
            {
                id: 6,
                src: 'https://images.unsplash.com/photo-1576672843344-f01907a9d40c',
            },
        ],
    };

    const [thumbNum, setThumbNum] = useState(0);
    const [active, setActive] = useState('');

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    const imageList = dummyImage.Images.map((image, index) => (
        <div
            key={index}
            onMouseOver={() => setActive(index)}
            className={active === index ? 'active' : ''}
        >
            <img
                src={
                    image.src +
                    getParametersForUnsplash({
                        width: 60,
                        height: 72,
                        quality: 80,
                        format: 'jpg',
                    })
                }
                onMouseOver={() => setThumbNum(image.id)}
            />
        </div>
    ));

    return (
        <ProductImage>
            <MainImage>
                <ImageZoom img={dummyImage.Images[thumbNum].src} alt={'사진'}></ImageZoom>
            </MainImage>

            <ImageList>{imageList}</ImageList>
        </ProductImage>
    );
};

export default ProductInfoLeft;
