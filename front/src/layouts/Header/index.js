import React, { useCallback, useState, useRef, useEffect, useTransition } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import { DeleteHeaderBodyApi, PostHeaderApi, PostHeaderBodyApi, PostQueryApi } from 'utils/api';
import { IoMdArrowDropup } from 'react-icons/io';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import useInput from 'hooks/useInput';
import { BiSkipPreviousCircle } from 'react-icons/bi';
import FirstModal from 'components/Modals/FirstModal';

const Header = props => {
	const navigate = useNavigate();
	const token = getData()?.accessToken;
	const [login, setLogin] = useState(getData());
	const [cartNum, setCartNum] = useState(0);
	const [inputValue, onChangeInputValue, setInputValue] = useInput();
	const [search, setSearch] = useState(JSON.parse(localStorage.getItem('keywords')) || []);
	const [open, setOpen] = useState(false);
	const [notice, setNotice] = useState(false);

	const [modalFirst, setModalFirst] = useState(false);
	const onCloseModal = useCallback(() => {
		setModalFirst(false);
	}, []);
	useEffect(() => {
		PostQueryApi(`/api/product/productList`).catch(() => {
			setModalFirst(true);
		});
	}, []);

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
											<li className="no-item">최근 검색어 내용이 없습니다.</li>
										)}
										{search?.map((text, idx) => {
											return (
												<li key={idx}>
													<a>{text}</a>
													<div class="box-edit">
														<a href="#" className="move" onClick={() => onClickSearchItem(idx)}>
															↖
														</a>
														<a
															href="#"
															className="remove"
															onClick={() => onClickDeleteSearchItem(idx)}
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
									<p>
										PC에서는 공지, 구매 정보 알림만 확인하실 수 있습니다. <br />그 외 알림은 앱에서
										확인 가능합니다.
									</p>
									<p>등록된 알림이 없습니다.</p>
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
								장바구니 <CountNum>{shoppingNumber ? shoppingNumber.length : 0}</CountNum>
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
