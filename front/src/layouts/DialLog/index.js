import React, { useState, useCallback } from 'react';
import { Filter } from './styles';
import { BiShoppingBag, BiHomeCircle, BiHomeHeart } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';
import { TbArrowBigUpLine, TbArrowBigDownLine } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import UrlCopyModal from 'components/Modals/UrlCopyModal';

const DialLog = () => {
	// 다이얼 로그
	const [basic, setBasic] = useState(true);

	// url 모달
	const [modalAuth, setModalAuth] = useState(false);

	const onCloseModal = useCallback(() => {
		setModalAuth(false);
	}, []);

	return (
		<>
			<Filter>
				<div
					style={
						basic
							? { backgroundColor: 'white' }
							: { boxShadow: 'inset 0px 0px 4px 1px rgba(0,0,255,0.5)' }
					}
				>
					<Link to="/">
						<button type="button" onClick={() => setBasic(e => !e)}>
							{basic ? <BiHomeCircle /> : <BiHomeHeart style={{ color: 'blue' }} />}
						</button>
					</Link>
				</div>
				<div>
					<Link to="/Mypage/Cart">
						<button type="button">
							<BiShoppingBag />
						</button>
					</Link>
				</div>
				<div>
					<a title="공유 하기" onClick={() => setModalAuth(e => !e)}>
						<BsShare />
					</a>
				</div>
				<div>
					<a title="위로 가기">
						<TbArrowBigUpLine />
					</a>
				</div>
				<div>
					<a title="아래로 가기">
						<TbArrowBigDownLine />
					</a>
				</div>
			</Filter>

			<UrlCopyModal show={modalAuth} onCloseModal={onCloseModal} />
		</>
	);
};

export default DialLog;
