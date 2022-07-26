import {
    ProductInfo,
    InfoWrapper,
    DetailInfoWrapper,
    TitleBox,
    DetailInfo,
    DownIcon,
    InfoContent,
    InfoTitle,
    PriceTitle,
    PriceContent,
    Price,
    InfoWrapperProduct,
    Box,
    TextBox,
    DetailList,
} from './styles';

import { useState, useCallback } from 'react';
import PriceList from 'components/DetailProduct/ProductInfoRight/PriceList';
import PurchaseForm from '../PurchaseForm';
import { useProductDetailState } from 'context/ProductDetailContext';
import { ReactComponent as ArrowDown } from 'assets/svg/ArrowDown.svg';
import { thousandComma } from 'utils/thousandComma';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';

const ProductInfoRight = ({ data }) => {
    const detail = useProductDetailState();
    const [toggle, setToggle] = useState(false);

    const onToggle = useCallback(() => {
        setToggle(prev => !prev);
    }, [toggle]);

    // 숫자 단위로 바꾸기
    // ex) 8 => 1, 82 => 10, 5912 => 1000
    function roundDown(v) {
        let wordCnt = 0;
        let unitWords = ['', '만', '억', '조', '경'];
        let value = Math.pow(10, Math.floor(Math.log10(v)));
        let limitValue = 10000;

        while (value >= limitValue) {
            value /= limitValue;
            wordCnt++;
        }

        return value + unitWords[wordCnt];
    }

    return (
        <div>
            <ProductInfo>
                <InfoWrapperProduct>
                    <TitleBox>
                        <h4>Product Info</h4>
                        <p>제품정보</p>
                    </TitleBox>
                    <DetailInfoWrapper>
                        <DetailInfo>
                            <InfoTitle>시즌 / 성별</InfoTitle>
                            <InfoContent>{detail.product.season}</InfoContent>
                            <span>/</span>
                            <InfoContent>{detail.product.gender === 1 ? '남' : '여'}</InfoContent>
                        </DetailInfo>
                        <DetailInfo>
                            <InfoTitle>조회수(1개월)</InfoTitle>
                            <InfoContent>{roundDown(detail.product.views)}회 이상</InfoContent>
                        </DetailInfo>
                        <DetailInfo>
                            <InfoTitle>좋아요</InfoTitle>
                            <img
                                src="	https://image.msscdn.net/skin/musinsa/images/icon_like_small_on.png"
                                style={{ paddingRight: '6px', width: 15, height: 15 }}
                            />
                            <InfoContent style={{ color: 'red' }}>
                                {detail.product.likes}
                            </InfoContent>
                        </DetailInfo>
                        <DetailInfo>
                            <InfoTitle>구매후기</InfoTitle>
                            <div>
                                <a href="#estimateBox">
                                    {detail.product.comments < 100 ? null : detail.product
                                          .comments < 2000 ? (
                                        <>
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    color: '#FF923A',
                                                }}
                                            >
                                                <AiFillStar />
                                            </p>
                                            <span className="review-rating">1.0</span>
                                        </>
                                    ) : data.comments < 4000 ? (
                                        <>
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    color: '#FF923A',
                                                }}
                                            >
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                            <span className="review-rating">2.0</span>
                                        </>
                                    ) : data.comments < 8000 ? (
                                        <>
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    color: '#FF923A',
                                                }}
                                            >
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                            <span className="review-rating">3.0</span>
                                        </>
                                    ) : data.comments < 10000 ? (
                                        <>
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    color: '#FF923A',
                                                }}
                                            >
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                            <span className="review-rating">4.0</span>
                                        </>
                                    ) : (
                                        <>
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    color: '#FF923A',
                                                }}
                                            >
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                            <span className="review-rating">5.0</span>
                                        </>
                                    )}
                                    <span className="review-bar">/</span>
                                    <span className="review-count">후기 9,292개 보기</span>
                                </a>
                            </div>
                        </DetailInfo>
                        <DetailList>
                            <p>
                                {detail.product.CustomCategories.map(v => (
                                    <span key={v.id}>#{v.categoryName}</span>
                                ))}
                            </p>
                        </DetailList>
                    </DetailInfoWrapper>
                </InfoWrapperProduct>
                <InfoWrapper>
                    <TitleBox>
                        <h4>Delivery Info</h4>
                        <InfoTitle>배송정보</InfoTitle>
                    </TitleBox>
                    <DetailInfoWrapper>
                        <DetailInfo>
                            <InfoTitle>출고 정보</InfoTitle>
                            <InfoContent>{data.beReleased}</InfoContent>
                        </DetailInfo>
                        <DetailInfo>
                            <InfoTitle>배송 방법</InfoTitle>
                            <InfoContent>
                                {detail.product.deliveryFrom ? '해외' : '국내'}
                            </InfoContent>
                            <span>/</span>
                            <InfoContent>
                                {detail.product.deliveryWay ? '무신사 직배송' : '입점사 배송'}
                            </InfoContent>
                            <span>/</span>
                            <InfoContent>{detail.product.deliveryCompany}</InfoContent>
                        </DetailInfo>
                    </DetailInfoWrapper>
                </InfoWrapper>
                <InfoWrapper>
                    <TitleBox>
                        <h4>Price Info</h4>
                        <p>가격정보</p>
                    </TitleBox>
                    <DetailInfoWrapper>
                        <DetailInfo>
                            <PriceTitle>무신사 판매가</PriceTitle>
                            <PriceContent className="line">
                                {thousandComma(detail.product.productPrice)}
                                <Price>원</Price>
                            </PriceContent>
                        </DetailInfo>
                        <DetailInfo>
                            <PriceTitle>무신사 회원가</PriceTitle>
                            <PriceContent onClick={onToggle}>
                                {thousandComma(detail.product.rookiePrice)}
                                <Price>원</Price>
                                <ArrowDown style={{ paddingLeft: '8px' }} />
                            </PriceContent>
                            {toggle ? <PriceList /> : <></>}
                        </DetailInfo>
                    </DetailInfoWrapper>
                    <TextBox>
                        <li>무신사 회원은 무료배송입니다.</li>
                        <li>회원 특별 혜택</li>
                    </TextBox>
                </InfoWrapper>
            </ProductInfo>
            <PurchaseForm data={data} />
        </div>
    );
};

export default ProductInfoRight;
