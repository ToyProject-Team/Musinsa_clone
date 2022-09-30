import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Btm, Filter } from './styles';
import { BiShoppingBag, BiHomeCircle, BiHomeHeart } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';
import { TbArrowBigUpLine, TbArrowBigDownLine } from 'react-icons/tb';
import { Link, useParams, useLocation } from 'react-router-dom';
import UrlCopyModal from 'components/Modals/UrlCopyModal';

const DialLog = props => {
	const saveUrl = useLocation();

	// 다이얼 로그
	const [basic, setBasic] = useState({
		home: true,
		cart: true,
	});

	useEffect(() => {
		const { pathname } = saveUrl;

		if (pathname === '/') setBasic(pre => ({ ...pre, home: false }));
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
							{basic.home ? <BiHomeCircle /> : <BiHomeHeart style={{ color: 'blue' }} />}
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
							{basic.cart ? <BiShoppingBag /> : <BiShoppingBag style={{ color: 'blue' }} />}
						</button>
					</Link>
				</div>
				<div>
					<a title="공유 하기" onClick={() => setModalAuth(e => !e)}>
						<BsShare />
					</a>
				</div>
				<div onClick={scrollTop}>
					<a title="위로 가기">
						<TbArrowBigUpLine />
					</a>
				</div>
				<div onClick={scrollBtm}>
					<a title="아래로 가기">
						<TbArrowBigDownLine />
					</a>
				</div>
			</Filter>
			<Btm ref={btm} />
			<UrlCopyModal show={modalAuth} onCloseModal={onCloseModal} />
		</>
	);
};

export default DialLog;
