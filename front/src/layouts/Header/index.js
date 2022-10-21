import React, { useCallback, useState, useRef, useEffect, useTransition } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import {
    DeleteHeaderBodyApi,
    PostHeaderApi,
    PostHeaderBodyApi,
    PostQueryApi,
    GetTokenApi,
} from 'utils/api';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import useInput from 'hooks/useInput';
import { BiSkipPreviousCircle } from 'react-icons/bi';
import FirstModal from 'components/Modals/FirstModal';

import { AiOutlineCamera } from '@react-icons/all-files/ai/AiOutlineCamera';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { IoMdArrowDropup } from '@react-icons/all-files/io/IoMdArrowDropup';
import { FaCommentsDollar } from 'react-icons/fa';

const Header = props => {
    const location = useLocation();
    const token = getData()?.accessToken;
    const [login, setLogin] = useState(getData());
    const [inputValue, onChangeInputValue, setInputValue] = useInput();
    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('keywords')) || []);
    const [open, setOpen] = useState(false);
    const [notice, setNotice] = useState(false);

    const [modalFirst, setModalFirst] = useState(false);
    const onCloseModal = useCallback(() => {
        setModalFirst(false);
    }, []);

    //알림 추가, 더미데이터
    const [noticeList, setNoticeList] = useState([]);

    const dummyData = {
        id: 0,
        MerchantUid: '3914619',
        orderPrice: 24970,
        amount: 1,
        state: '2',
        createdAt: '2017-07-21T17:32:28.000Z',
        ProductMainTag: {
            name: 'M',
        },
        ProductSubTag: {
            id: 142,
            name: '빨간색',
            amount: 1,
        },
        Product: {
            productTitle: 'Car',
            ProductImg: {
                src: 'Accessory/Accessory23',
            },
        },
    };

    useEffect(() => {
        if (window.location.host.includes('local')) return;

        PostQueryApi(`/api/product/productList`).catch(() => {
            setModalFirst(true);
        });
    }, []);

    useEffect(() => {
        GetTokenApi('/api/order/orderList', token).then(res => {
            setNoticeList(res.data);
        });
        // console.log(noticeList[0].Product.productTitle);
        // console.log(noticeList[0].Product.ProductImg.src);
    }, [notice]);

    const { data: shoppingNumber, mutate } = useSWR(
        token ? '/api/shoppingBasket/shoppingList' : null,
        url => fetcher(url, token),
        {
            refreshInterval: 0,
        },
    );

    const onClickHello = useCallback(() => {
        const params = {
            productId: 1,
        };
        PostHeaderBodyApi('/api/product/likeProduct', params, 'Authorization', token).then(() => {
            mutate();
        });
    }, []);

    const onClickHell2o = useCallback(() => {
        const params = {
            productId: 1,
        };
        DeleteHeaderBodyApi('/api/mypage/favoriteGoods/del', params, 'Authorization', token).then(
            () => {
                mutate();
            },
        );
    }, []);

    const formSub = useCallback(
        e => {
            e.preventDefault();

            const keyWord = localStorage.getItem('keywords');

            if (!keyWord?.includes(inputValue) || !inputValue === '') {
                setSearch(prev => [...prev, inputValue]);
                const value = [...search, inputValue];
                localStorage.setItem('keywords', JSON.stringify(value));
            }

            props.setFilterVal({ productTitle: inputValue });
        },
        [search, inputValue],
    );

    const searchBtn = useCallback(() => {
        const keyWord = localStorage.getItem('keywords');

        if (!keyWord.includes(inputValue) || !inputValue === '') {
            setSearch(prev => [...prev, inputValue]);
            const value = [...search, inputValue];
            localStorage.setItem('keywords', JSON.stringify(value));
        }
        //console.log(inputValue);
    }, [search, inputValue]);

    const onClickDeleteSearchAll = useCallback(() => {
        setSearch([]);
        localStorage.removeItem('keywords');
    }, []);

    const onClickSearchItem = useCallback(
        idx => {
            setInputValue(search[idx]);
        },
        [search],
    );

    const onClickDeleteSearchItem = useCallback(
        idx => {
            const filterItem = search.filter((v, i) => i !== idx);
            setSearch(filterItem);
            localStorage.setItem('keywords', JSON.stringify(filterItem));
        },
        [search],
    );

    const inputOpen = () => {
        setOpen(!open);
    };

    const deleteLogout = useCallback(() => {
        PostHeaderApi('/api/auth/logout', 'Authorization', login.accessToken)
            .then(() => {
                deleteData();
                setLogin(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [login]);

    // const onClickNotice = () => {
    //     setNotice(!notice);
    //     //알림창에 넣을 orderLsit 호출
    //     GetTokenApi('/api/order/orderList', token).then(res => {
    //         setNoticeList(res.data);
    //     });
    // };

    return (
        <>
            <HContainer>
                <HDiv>
                    <div>
                        <Link to="/">
                            <HLogo>MUSINSA</HLogo>
                        </Link>
                    </div>
                    <HSearch>
                        <div>
                            <form id="search_form" onSubmit={formSub}>
                                <input
                                    id="search_query"
                                    type="text"
                                    maxLength={30}
                                    autoComplete="off"
                                    onClick={inputOpen}
                                    onChange={onChangeInputValue}
                                    value={inputValue}
                                />
                                <span>
                                    <AiOutlineCamera />
                                </span>
                                <span onClick={searchBtn}>
                                    <AiOutlineSearch />
                                </span>
                            </form>
                        </div>
                        <article className={open ? 'block' : 'none'}>
                            <dl>
                                <dt>
                                    <h3>최근 검색어</h3>
                                    <button type="button" onClick={onClickDeleteSearchAll}>
                                        전체 삭제
                                    </button>
                                </dt>
                                <dd>
                                    <ul>
                                        {search.length === 0 && (
                                            <li className="no-item">
                                                최근 검색어 내용이 없습니다.
                                            </li>
                                        )}
                                        {search?.map((text, idx) => {
                                            return (
                                                <li key={idx}>
                                                    <a>{text}</a>
                                                    <div class="box-edit">
                                                        <a
                                                            href="#"
                                                            className="move"
                                                            onClick={() => onClickSearchItem(idx)}
                                                        >
                                                            ↖
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="remove"
                                                            onClick={() =>
                                                                onClickDeleteSearchItem(idx)
                                                            }
                                                        >
                                                            X
                                                        </a>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </dd>
                            </dl>
                        </article>
                    </HSearch>

                    <HUser>
                        {login ? (
                            <button className="nowLogin">{login.userData.loginId}</button>
                        ) : (
                            <Link to="/login">
                                <button className="notLogin">로그인</button>
                            </Link>
                        )}
                        {login ? (
                            <div>
                                <div className="flex" onClick={() => setNotice(!notice)}>
                                    <a>알림</a>
                                    <CountNum>{shoppingNumber ? 'N' : 0}</CountNum>
                                </div>
                                <article className={notice ? 'block' : 'none'}>
                                    {noticeList ? (
                                        noticeList?.map((data, idx) => {
                                            <div>
                                                {/* <p>
                                                    <img
                                                        src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${data.Product.ProductImg.src}`}
                                                    />
                                                </p> */}
                                                <p>{data.Product.productTitle}</p>
                                            </div>;
                                        })
                                    ) : (
                                        <>
                                            <p>
                                                PC에서는 공지, 구매 정보 알림만 확인하실 수
                                                있습니다. <br />그 외 알림은 앱에서 확인 가능합니다.
                                            </p>
                                            <p>등록된 알림이 없습니다.</p>
                                        </>
                                    )}
                                    <span>
                                        <IoMdArrowDropup />
                                    </span>
                                </article>
                            </div>
                        ) : null}

                        <div>
                            <Link to="/mypage/like">좋아요</Link>
                        </div>
                        <div>
                            <Link to="/mypage/cart" className="basket">
                                장바구니{' '}
                                <CountNum>{shoppingNumber ? shoppingNumber.length : 0}</CountNum>
                            </Link>
                        </div>
                        <div onClick={onClickHell2o}>
                            <Link to="/mypage/orderlist">주문배송조회</Link>
                        </div>
                        {login ? (
                            <div onClick={deleteLogout} className="logOut">
                                로그아웃
                            </div>
                        ) : null}
                    </HUser>
                </HDiv>
            </HContainer>

            <FirstModal show={modalFirst} onCloseModal={onCloseModal}></FirstModal>
        </>
    );
};

export default Header;
