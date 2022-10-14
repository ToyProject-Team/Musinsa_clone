import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import CartTable from 'components/Mypage/Cart/Table';
import { OrderTable, CartPayment, OrderBtn, ModalStyle } from 'components/Mypage/Cart/styles';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaEquals } from '@react-icons/all-files/fa/FaEquals';
import Order from 'components/Order';
import OrderModal from 'components/Modals/OrderModal';
import { thousandComma } from 'utils/thousandComma';
import { CheckLabel } from './Table/styles';
import { getData } from 'utils/getData';
import { DeleteHeaderBodyApi, GetTokenApi } from 'utils/api';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

function Cart() {
    const [cartList, setCartList] = useState([]);
    const loginToken = getData().accessToken;
    // console.log(loginToken);

    //장바구니 리스트 가져오기
    useEffect(() => {
        GetTokenApi('/api/shoppingBasket/shoppingList', loginToken).then(res => {
            setCartList(res.data.map(item => Object.assign(item, { check: false })));
        });
    }, []);

    //장바구니 리스트 삭제
    const { data: shoppingNumber, mutate } = useSWR(
        loginToken ? '/api/shoppingBasket/shoppingList' : null,
        url => fetcher(url, loginToken),
        {
            refreshInterval: 0,
        },
    );

    const cartRemove = useCallback(id => {
        const originList = setCartList(cartList);
        const deleteList = cartList.filter(prev => prev.id !== id);
        setCartList(deleteList);
        const params = {
            shoppingBasketId: id,
        };
        DeleteHeaderBodyApi(
            '/api/shoppingBasket/del',
            params,
            'Authorization',
            loginToken.accessToken,
        )
            .then(res => {
                const deleteList = cartList.filter(prev => prev.id !== id);
                setCartList(deleteList);
                mutate();
            })
            .catch(err => {
                switch (err.request.status) {
                    case 400:
                        console.log('입력값을 다시 확인해주세요');
                        break;
                    case 401:
                        console.log('유저의 조회 결과가 없습니다');
                        break;
                    case 402:
                        console.log('장바구니에 없는 상품을 삭제 시도하셨습니다');
                        break;
                    case 500:
                        console.log('서버 에러');
                        break;
                }
                console.log('실패', err);
                // 안지워졌을시 필터했던 아이템 다시 추가
                setCartList(originList);
            });
    });

    const [checkBox, setCheckBox] = useState(false);
    const [sum, setSum] = useState(0);

    const [pay, setPay] = useState('card');
    const [order, setOrder] = useState(false);

    const [modalOrder, setModalOrder] = useState(false);

    const [checkList, setCheckList] = useState({});

    // 체크
    const checkItem = useCallback(() => {
        setCheckBox(check => !check);
        setCartList(cartList => cartList.map(item => ({ ...item, check: !checkBox })));
    }, [cartList, checkBox]);

    const onCloseModal = useCallback(() => {
        setModalOrder(false);
        setOrder(false);
    }, [modalOrder]);

    // 바로구매
    const onClickOrderButton = useCallback(() => {
        setModalOrder(true);
    }, []);

    // 결제
    const onClickOrder = useCallback(() => {
        setModalOrder(false);
        setOrder(true);
        let arrBsId = [];
        let arrPrice = [];
        let arrAmount = [];
        cartList.map(v =>
            v.check
                ? arrBsId.push(v.id) &&
                  arrPrice.push(v.Product.productPrice * v.packingAmount) &&
                  arrAmount.push(v.packingAmount)
                : arrBsId.filter(f => f !== v.id) &&
                  arrPrice.filter(f => f !== v.Product.productPrice * v.packingAmount) &&
                  arrAmount.filter(f => f !== v.packingAmount),
        );

        setCheckList({ shoppingBasketId: arrBsId, price: arrPrice, amout: arrAmount });

        // console.log('ok', arrBsId, arrPrice, arrAmount);
    }, [cartList]);

    console.log('check', checkList);

    // 모두 체크 확인 및 총상품 금액

    const [basketId, setBasketId] = useState([]);
    // console.log(basketId);

    useEffect(() => {
        let arrId = [];
        cartList.map(v => (v.check ? arrId.push(v.id) : arrId.filter(f => f !== v.id)));

        setBasketId(arrId);

        if (cartList.length === arrId.length && cartList.length != 0) setCheckBox(true);
        else setCheckBox(false);

        // 총 상품 금액
        if (arrId.length > 0) {
            setSum(
                arrId
                    .map(v => {
                        let total = 0;
                        cartList.map(
                            m => m.id === v && (total += m.packingAmount * m.Product.productPrice),
                        );
                        return total;
                    })
                    ?.reduce((a, b) => a + b),
            );
        } else setSum(0);
    }, [cartList]);

    console.log('cart', cartList);
    // console.log('prdid', prdId);
    // console.log('arrId',arrId);

    return (
        <>
            <MypageMain>
                <div>
                    <h3>장바구니</h3>
                    <OrderTable>
                        <colgroup>
                            <col width="3.62%" />
                            <col width="*" />
                            <col width="9.5%" />
                            <col width="12%" />
                            <col width="9.5%" />
                            <col width="17.3%" />
                            <col width="15%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <CheckLabel
                                        onClick={checkItem}
                                        className={checkBox ? 'active' : ''}
                                    ></CheckLabel>
                                </th>
                                <th scope="col">상품정보</th>
                                <th scope="col">상품금액</th>
                                <th scope="col">수량</th>
                                <th scope="col">주문금액</th>
                                <th scope="col">배송 형태/배송비</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        {cartList.map((item, index) => (
                            <CartTable
                                key={index}
                                item={item}
                                setCartList={setCartList}
                                cartList={cartList}
                                cartRemove={cartRemove}
                            />
                        ))}
                    </OrderTable>
                    <CartPayment>
                        <li>
                            <p>상품금액</p>
                            <p>
                                <span>{thousandComma(sum)}</span>원
                            </p>
                        </li>
                        <li>
                            <FaPlus />
                        </li>
                        <li>
                            <p>배송비</p>
                            <p>
                                <span>{sum > 30000 || sum === 0 ? 0 : thousandComma(3000)}</span>원
                            </p>
                        </li>
                        <li>
                            <FaEquals />
                        </li>
                        <li>
                            <p>최종 결제 금액</p>
                            <p>
                                <span>
                                    {thousandComma(sum + (sum > 30000 || sum === 0 ? 0 : 3000))}
                                </span>
                                원
                            </p>
                        </li>
                    </CartPayment>
                    <OrderBtn>
                        <button onClick={onClickOrderButton}>결제하기</button>
                        {order && <Order pay={pay} checkList={checkList} />}
                    </OrderBtn>
                </div>

                {modalOrder && (
                    <OrderModal
                        show={modalOrder}
                        onCloseModal={onCloseModal}
                        onClickConfirm={onClickOrder}
                        price={thousandComma(sum + (sum > 30000 ? 0 : 3000))}
                        pay={pay}
                        setPay={setPay}
                    ></OrderModal>
                )}
            </MypageMain>
        </>
    );
}

export default Cart;
