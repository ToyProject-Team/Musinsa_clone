import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Btm, Filter } from './styles';
import { BiHomeCircle } from '@react-icons/all-files/bi/BiHomeCircle';
import { BiHomeHeart } from '@react-icons/all-files/bi/BiHomeHeart';
import { BiShoppingBag } from '@react-icons/all-files/bi/BiShoppingBag';
import { AiOutlineShareAlt } from '@react-icons/all-files/ai/AiOutlineShareAlt';
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UrlCopyModal from 'components/Modals/UrlCopyModal';

const DialLog = props => {
    const saveUrl = useLocation();
    const navigate = useNavigate();

    // 다이얼 로그
    const [basic, setBasic] = useState({
        home: true,
        cart: true,
    });

    useEffect(() => {
        const { pathname } = saveUrl;

        if (pathname === '/' || pathname === '/products')
            setBasic(pre => ({ ...pre, home: false }));
        else setBasic(pre => ({ ...pre, home: true }));

        if (pathname === '/mypage/cart') setBasic(e => ({ ...e, cart: false }));
        else setBasic(e => ({ ...e, cart: true }));
    }, [saveUrl]);

    // url 모달
    const [modalAuth, setModalAuth] = useState(false);

    const btm = useRef();

    const onCloseModal = useCallback(() => {
        setModalAuth(false);
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    };

    const scrollBtm = () => {
        // window.scroll({
        // 	bottom: document.body.scrollHeight,
        // 	behavior: 'smooth',
        // });
        btm.current.scrollIntoView();
        console.log(document.body.scrollHeight);
    };

    return (
        <>
            <Filter>
                <div
                    style={
                        basic.home
                            ? { backgroundColor: 'white' }
                            : { boxShadow: 'inset 0px 0px 4px 1px rgba(0,0,255,0.5)' }
                    }
                >
                    <Link to="/">
                        <button type="button">
                            {basic.home ? (
                                <BiHomeCircle />
                            ) : (
                                <BiHomeHeart style={{ color: 'blue' }} />
                            )}
                        </button>
                    </Link>
                </div>
                <div
                    style={
                        basic.cart
                            ? { backgroundColor: 'white' }
                            : { boxShadow: 'inset 0px 0px 4px 1px rgba(0,0,255,0.5)' }
                    }
                >
                    <Link to="/mypage/cart">
                        <button type="button">
                            {basic.cart ? (
                                <BiShoppingBag />
                            ) : (
                                <BiShoppingBag style={{ color: 'blue' }} />
                            )}
                        </button>
                    </Link>
                </div>
                <div onClick={() => setModalAuth(e => !e)}>
                    <a title="공유 하기">
                        <AiOutlineShareAlt />
                    </a>
                </div>
                <div onClick={scrollTop}>
                    <a title="위로 가기">
                        <RiArrowUpSLine />
                    </a>
                </div>
                <div onClick={scrollBtm}>
                    <a title="아래로 가기">
                        <RiArrowDownSLine />
                    </a>
                </div>
            </Filter>
            <Btm ref={btm} />
            <UrlCopyModal show={modalAuth} onCloseModal={onCloseModal} />
        </>
    );
};

export default DialLog;
