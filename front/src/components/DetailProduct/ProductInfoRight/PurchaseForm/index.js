import {
    FormWrapper,
    BuyOption,
    ButtonBuy,
    ButtonWrapper,
    TotalPrice,
    ButtonLike,
    ButtonCart,
    Button,
    Like,
    SelectedOption,
    Decrease,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Order from 'components/Order';
import {
    LIKES,
    useProductDetailDispatch,
    useProductDetailState,
} from 'context/ProductDetailContext';
import { thousandComma } from 'utils/thousandComma';
import { getData } from 'utils/getData';
import { URLquery } from 'utils/URLquery';
import { DeleteHeaderBodyApi, GetTokenApi, PostHeaderBodyApi } from 'utils/api';
import ConfirmModal from 'components/Modals/ConfirmModal';
import OrderModal from 'components/Modals/OrderModal';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

const PurchaseForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = URLquery(location);
    const detail = useProductDetailState();
    const dispatch = useProductDetailDispatch();
    const user = getData();

    const [clickedlike, setClickedlike] = useState(false);

    const [optionData, setOptionData] = useState({
        option1: '옵션 선택',
        option2: '옵션 선택',
    });
    const [option, setOption] = useState({});
    const [selectList, setSelectList] = useState({});
    const [selectIdx, setSelectIdx] = useState();

    const [firstSelectId, setFirstSelectId] = useState();
    const [selectArr, setSelectArr] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [pay, setPay] = useState('card');
    const [order, setOrder] = useState(false);

    const [modalOrder, setModalOrder] = useState(false);
    const [modalBasket, setModalBasket] = useState(false);

    // 데이터 구조 변경
    const optionDataStructureChange = useCallback(() => {
        const option1 = detail.product.ProductMainTags.map(v => `${v.name}/${v.id}`);
        const option2 = detail.product.ProductMainTags.map(v =>
            v.ProductSubTags.map(item => `${item.name}/${item.amount}/${item.id}`),
        );
        const productArr = {
            option1,
            option2,
        };

        setOptionData(productArr);
    }, []);

    // 선택 List 옵션 초기화
    const optionListInit = useCallback(() => {
        const value = Object.keys(optionData);

        setOption(() =>
            value.map(v => {
                return { [v]: '옵션 선택' };
            }),
        );
    }, [optionData]);

    // 좋아요 표시
    const userLikes = useCallback(async () => {
        const token = user.accessToken;
        try {
            const result = await GetTokenApi('/api/mypage/favoriteGoods', token);
            let likeProduct = result.data.likeProduct.filter(v => `${v.id}` === query.productId);
            setClickedlike(Object.keys(likeProduct).length > 0 ? true : false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // 첫화면 초기화
    useEffect(() => {
        const asyncFunction = async () => {
            await optionDataStructureChange();
            await optionListInit();
            if (user) await userLikes();
        };

        asyncFunction();
    }, []);

    const changeDispatch = useCallback((type, payload) => {
        return dispatch({ type, payload });
    }, []);

    // 옵션 선택
    const selectOption = useCallback(
        e => {
            var selectBox = e.target;
            var selectedValue = selectBox.options[e.target.selectedIndex].getAttribute('data-id');

            const { name, value } = e.target;
            const objData = Object.keys(optionData);
            const index = Number(e.target.getAttribute('data-index'));
            const lastOptionIndex = objData.includes('add')
                ? objData.length - 2
                : objData.length - 1;
            let inifFlag = false;

            // 첫번째 옵션 눌렀다면?
            if (index === 0) {
                optionListInit();
                setSelectIdx(optionData[name].map(v => v.split('/')[0]).indexOf(value));
                setFirstSelectId(selectedValue);
            }

            // 마지막 옵션 눌렀다면?
            if (index === lastOptionIndex && value !== '옵션 선택') {
                const overlap = selectArr
                    .map(v => v[5] === `${firstSelectId}/${selectedValue}`)
                    .includes(true);
                if (overlap) return alert('중복된 상품이 있습니다.');

                const key = option[0][objData[0]];
                const nowValue = value;
                let flag = false;

                if (value.includes('품절')) return alert('이미 품절된 상품입니다.');

                if (flag) return alert('이미 선택한 상품입니다.');

                // 이곳부터 진행
                setSelectArr(prev => [
                    ...prev,
                    [
                        firstSelectId,
                        selectedValue,
                        1,
                        key,
                        nowValue,
                        `${firstSelectId}/${selectedValue}`,
                    ],
                ]);

                inifFlag = true;
            }
            setOption(prev => {
                prev[index][name] = value;
                return prev;
            });

            if (inifFlag) {
                optionListInit();
                setSelectIdx(-1);
            }
        },
        [option, selectArr],
    );

    const onClickIncrease = useCallback(
        idx => {
            const reg = /[^0-9]/g;
            const maxCount = selectArr[idx][4].replace(reg, '');
            const nowCount = selectArr[idx][2];

            if (Number(maxCount) === nowCount) return alert('더이상 수량을 추가할 수 없습니다.');

            setSelectArr(
                selectArr.map((v, i) => {
                    if (idx === i) {
                        v[2] += 1;
                    }
                    return v;
                }),
            );
        },
        [selectArr],
    );

    const onClickDecrease = useCallback(
        idx => {
            setSelectArr(
                selectArr.map((v, i) => {
                    if (idx === i) {
                        v[2] -= 1;
                    }
                    return v;
                }),
            );
        },
        [selectArr],
    );

    const onClickRemove = useCallback(
        idx => {
            setSelectArr(selectArr.filter((v, i) => i !== idx));
        },
        [selectArr],
    );

    const TotalPr = useMemo(() => {
        return selectArr.length > 0
            ? selectArr?.map(v => Number(v[2]))?.reduce((a, b) => a + b) *
                  detail.product.rookiePrice
            : 0;
    }, [selectArr]);

    // 좋아요
    const onLikeClicked = useCallback(async () => {
        if (!user) {
            const { pathname, search } = location;
            Cookies.set('redirect', pathname + search);
            navigate(`/login`);
        }

        const token = user.accessToken;

        setClickedlike(prev => !prev);
        if (clickedlike) {
            changeDispatch(LIKES, {
                likes: detail.product.likes - 1,
            });
            detail.product.likes -= 1;
            try {
                const params = {
                    productId: query.productId,
                };
                await DeleteHeaderBodyApi(
                    '/api/mypage/favoriteGoods/del',
                    params,
                    'Authorization',
                    token,
                );
            } catch (error) {
                setClickedlike(true);
            }
        } else {
            changeDispatch(LIKES, {
                likes: detail.product.likes + 1,
            });
            detail.product.likes += 1;
            try {
                const params = {
                    productId: query.productId,
                };
                PostHeaderBodyApi('/api/product/likeProduct', params, 'Authorization', token);
            } catch (error) {
                setClickedlike(false);
            }
        }
    }, [clickedlike]);

    // 장바구니 추가
    const onClickBasket = useCallback(async () => {
        // if (!user) {
        //     const { pathname, search } = location;
        //     Cookies.set('redirect', pathname + search);
        //     navigate(`/login`);
        // }
        // create arr ############
        const addCarts = [];
        for (let list of selectArr) {
            const obj = {
                productId: query.productId,
                productMainTagId: Number(list[0]),
                productSubTagId: Number(list[1]),
                packingAmount: list[2],
            };
            addCarts.push(obj);
        }

        // create arr ############
        const token = user.accessToken;
        try {
            const params = {
                addCarts,
            };
            await PostHeaderBodyApi('/api/product/addCart', params, 'Authorization', token);
            setModalBasket(true);
        } catch (error) {
            console.error(error);
        }
    }, [selectArr]);

    const onCloseModal = useCallback(() => {
        setModalBasket(false);
        setModalOrder(false);
        setOrder(false);
    }, [modalBasket, modalOrder]);

    const onLinkModal = useCallback(() => {
        setModalBasket(false);
        navigate('/mypage/cart');
    }, [modalBasket]);

    // 바로구매
    const onClickOrderButton = useCallback(() => {
        if (!user) {
            const { pathname, search } = location;
            Cookies.set('redirect', pathname + search);
            return navigate(`/login`);
        }

        if (selectArr.length === 0) return alert('구매하실 상품이 없습니다.');

        setModalOrder(true);
    }, [selectArr]);

    // 결제
    const onClickOrder = useCallback(() => {
        if (!user) {
            const { pathname, search } = location;
            Cookies.set('redirect', pathname + search);
            navigate(`/login`);
        }

        setModalOrder(false);
        setOrder(true);
    }, []);

    useEffect(() => {
        console.log('Fruit', selectArr);
    }, [selectArr]);

    return (
        <div>
            <FormWrapper style={{ backgroundColor: '#f3f3f3' }}>
                {Object.keys(optionData).map((item, idx) => {
                    return (
                        Array.isArray(option) && (
                            <BuyOption
                                key={item + idx}
                                onChange={selectOption}
                                value={option[idx][item]}
                                name={item}
                                data-index={idx}
                            >
                                <option>옵션 선택</option>
                                {/* 첫번째 옵션 */}
                                {typeof optionData[item][0] === 'string'
                                    ? optionData[item].map(itemOption => {
                                          const itemName = itemOption.split('/')[0];
                                          const itemId = itemOption.split('/')[1];
                                          return (
                                              <option key={itemId} data-id={itemId}>
                                                  {itemName}
                                              </option>
                                          );
                                      })
                                    : selectIdx >= 0 &&
                                      // 두번째 옵션
                                      optionData[item][selectIdx].map(itemOption => {
                                          const itemName = itemOption.split('/')[0];
                                          const itemAmount = itemOption.split('/')[1];
                                          const itemId = itemOption.split('/')[2];
                                          return (
                                              <option key={itemOption} data-id={itemId}>
                                                  {itemName}(
                                                  {itemAmount === '0'
                                                      ? '품절'
                                                      : `${itemAmount}개남음`}
                                                  )
                                              </option>
                                          );
                                      })}
                            </BuyOption>
                        )
                    );
                })}
            </FormWrapper>

            {selectArr?.map((select, idx) => {
                const count = select[2];
                const option_1 = select[3];
                const option_2 = select[4];

                const reg = /[^0-9]/g;
                const max = option_2.replace(reg, '');

                return (
                    <div key={option_1 + option_2}>
                        <SelectedOption>
                            <div>
                                {option_1}/{option_2}
                            </div>
                            <div>
                                <ul>
                                    <Decrease
                                        orderAmount={count}
                                        onClick={() =>
                                            count > 1
                                                ? onClickDecrease(idx)
                                                : alert('더이상 수량을 줄일 수 없습니다.')
                                        }
                                    >
                                        -
                                    </Decrease>
                                    <li>{count}</li>
                                    <li onClick={() => onClickIncrease(idx)}>+</li>
                                </ul>
                            </div>
                            <div>
                                <div>{thousandComma(count * detail.product.rookiePrice)}원</div>
                                <p onClick={() => onClickRemove(idx)}>X</p>
                            </div>
                        </SelectedOption>
                    </div>
                );
            })}

            <TotalPrice>
                <p>총 상품 금액</p>
                <div>{thousandComma(TotalPr)}원</div>
            </TotalPrice>
            <ButtonWrapper>
                <ButtonBuy onClick={onClickOrderButton}>바로구매</ButtonBuy>
                {order && <Order pay={pay} />}
                <ButtonLike clickedlike={clickedlike} onClick={onLikeClicked}>
                    <Button clickedlike={clickedlike} />
                    <Like clickedlike={clickedlike}>{thousandComma(detail.product.likes)}</Like>
                </ButtonLike>
                <ButtonCart onClick={onClickBasket}>
                    <i>장바구니 아이콘</i>
                </ButtonCart>
            </ButtonWrapper>

            {modalOrder && (
                <OrderModal
                    show={modalOrder}
                    onCloseModal={onCloseModal}
                    onClickConfirm={onClickOrder}
                    price={thousandComma(totalPrice * detail.product.rookiePrice)}
                    pay={pay}
                    setPay={setPay}
                ></OrderModal>
            )}

            <ConfirmModal
                show={modalBasket}
                onCloseModal={onCloseModal}
                onClickConfirm={onLinkModal}
                content={'장바구니로 이동하시겠습니까?'}
            ></ConfirmModal>
        </div>
    );
};

export default PurchaseForm;
