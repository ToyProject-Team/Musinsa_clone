import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ImgSpan } from '../styles';
import { FiMinus } from '@react-icons/all-files/fi/FiMinus';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { thousandComma } from 'utils/thousandComma';
import { smallCategory } from 'utils/smallCategory';
import { bigCategory } from 'utils/bigCategory';
import { CheckLabel, ItemUl } from './styles';
import OrderModal from 'components/Modals/OrderModal';
import Order from 'components/Order';

function CartTable({ item, setCartList, cartList, cartRemove }) {
    const [modalOrder, setModalOrder] = useState(false);
    const [pay, setPay] = useState('card');
    const [order, setOrder] = useState(false);
    const id = item.id;
    const amountValue = item.ProductSubTag.amount == 0 ? 0 : item.packingAmount;

    // 수량 기입
    const handleChange = useCallback(
        ({ target: { value } }) => {
            if (value > item.ProductSubTag.amount) {
                alert('상품의 재고보다 많은 수량을 선택할 수 없습니다');
            } else if (value == 0) {
                alert('수량을 줄일 수 없습니다.');
            } else {
                setCartList(prev =>
                    prev.map(v => (v.id === item.id ? { ...v, packingAmount: Number(value) } : v)),
                );
            }
        },
        [cartList],
    );

    // 수량 증가
    const plusCount = useCallback(() => {
        if (amountValue >= item.ProductSubTag.amount) {
            alert('상품의 재고보다 많은 수량을 선택할 수 없습니다');
        } else {
            setCartList(prev =>
                prev.map(v =>
                    v.id === item.id ? { ...v, packingAmount: v.packingAmount + 1 } : v,
                ),
            );
        }
    }, [cartList]);

    // 수량 감소
    const minusCount = useCallback(() => {
        if (amountValue === 1) {
            alert('수량을 줄일 수 없습니다.');
        } else {
            setCartList(prev =>
                prev.map(v =>
                    v.id === item.id ? { ...v, packingAmount: v.packingAmount - 1 } : v,
                ),
            );
        }
    }, [cartList]);

    // 체크
    const checkItem = useCallback(() => {
        item.ProductSubTag.amount > 0
            ? setCartList(prev => prev.map(v => (v.id === item.id ? { ...v, check: !v.check } : v)))
            : setCartList(cartList);
    }, [cartList]);

    // 결제 모달창
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
    }, []);

    const dlvChr = thousandComma(3000);

    return (
        <tbody>
            <tr>
                <td colSpan="7" className="cart_cont">
                    <table>
                        <colgroup>
                            <col width="3.62%" />
                            <col width="*" />
                            <col width="9.5%" />
                            <col width="12%" />
                            <col width="9.5%" />
                            <col width="17.3%" />
                            <col width="15%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td onClick={checkItem}>
                                    <CheckLabel
                                        className={
                                            item.ProductSubTag.amount > 0
                                                ? item.check
                                                    ? 'active'
                                                    : ''
                                                : 'sold'
                                        }
                                    ></CheckLabel>
                                </td>
                                <td className="top">
                                    <div>
                                        <ImgSpan
                                            className={
                                                item.ProductSubTag.amount === 0 ? 'soldout' : ''
                                            }
                                        >
                                            <a href={`/detail?productId=${item.Product.id}`}>
                                                <img
                                                    src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${item.Product.ProductImg.src}`}
                                                    alt="더미데이터"
                                                />
                                            </a>
                                        </ImgSpan>
                                        <ItemUl>
                                            <li>
                                                <a href={`/detail?productId=${item.Product.id}`}>
                                                    {bigCategory[item.Product.BigCategoryId]} /{' '}
                                                    {
                                                        smallCategory[item.Product.BigCategoryId][
                                                            item.Product.SmallCategoryId
                                                        ]
                                                    }
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`/detail?productId=${item.Product.id}`}>
                                                    <strong>{item.Product.productTitle}</strong>
                                                </a>
                                            </li>
                                            <li>
                                                {item.ProductSubTag.name} /{' '}
                                                {item.ProductMainTag.name} /{' '}
                                                {item.ProductSubTag.amount === 0
                                                    ? `품절`
                                                    : `${item.ProductSubTag.amount}개`}
                                            </li>
                                        </ItemUl>
                                    </div>
                                </td>
                                <td> {thousandComma(item.Product.productPrice)}원</td>
                                <td>
                                    <div className="input_amount">
                                        <button value={1} onClick={minusCount}>
                                            <FiMinus
                                                style={
                                                    amountValue <= 1
                                                        ? { color: '#ddd' }
                                                        : { color: '#777' }
                                                }
                                            />
                                        </button>
                                        <input
                                            type="text"
                                            value={amountValue}
                                            onChange={handleChange}
                                        ></input>
                                        <button value={1} onClick={plusCount}>
                                            <FiPlus
                                                style={
                                                    amountValue === 0
                                                        ? { color: '#ddd' }
                                                        : { color: '#777' }
                                                }
                                            />
                                        </button>
                                    </div>
                                </td>
                                <td>{thousandComma(item.Product.productPrice * amountValue)}원</td>
                                <td>
                                    택배배송 <br />
                                    <strong>
                                        {item.Product.productPrice * amountValue > 30000
                                            ? '배송비 무료'
                                            : `${dlvChr}원`}
                                    </strong>
                                </td>
                                <td>
                                    <div>
                                        <button
                                            className="btn"
                                            onClick={amountValue === 0 ? false : onClickOrderButton}
                                        >
                                            결제하기
                                        </button>
                                        {order && <Order pay={pay} />}
                                        <button className="del_btn" onClick={e => cartRemove(id)}>
                                            <FiX />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            {modalOrder && (
                <OrderModal
                    show={modalOrder}
                    onCloseModal={onCloseModal}
                    onClickConfirm={onClickOrder}
                    price={thousandComma(
                        item.Product.productPrice * item.packingAmount +
                            (item.Product.productPrice * item.packingAmount > 30000 ? 0 : 3000),
                    )}
                    pay={pay}
                    setPay={setPay}
                ></OrderModal>
            )}
        </tbody>
    );
}

export default CartTable;
