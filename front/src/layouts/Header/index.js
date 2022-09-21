import React, { useCallback, useState } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import { PostHeaderApi } from 'utils/api';

const Header = () => {
	const [login, setLogin] = useState(getData());
	const [cartNum, setCartNum] = useState(0);

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
		<HContainer>
			<HDiv>
				<Link to="/">
					<HLogo>MUSINSA</HLogo>
				</Link>
				<HSearch>
					<div>
						<form id="search_form">
							<input type="hidden" name="type" value />
							<label htmlFor="search_query">통합 검색</label>
							<input id="search_query" type="text" name="q" maxLength={30} autoComplete="off" />
							<span>
								<AiOutlineCamera />
							</span>
							<span>
								<AiOutlineSearch />
							</span>
						</form>
					</div>
				</HSearch>

				{login && (
					<HUser>
						<button className="nowLogin">{login.userData.loginId}</button>
						<div>
							<a>알림</a>
						</div>
						<div>
							<Link to="/mypage/like">
								<a>좋아요</a>
							</Link>
						</div>
						<div>
							<Link to="/mypage/cart">
								<a>장바구니</a>
							</Link>
							<CountNum>{cartNum}</CountNum>
						</div>
						<div>
							<a>주문배송조회</a>
						</div>
						<div onClick={deleteLogout} className="logOut">로그아웃</div>
					</HUser>
				)}
				{!login && (
					<HUser>
						<Link to="/login">
							<button className="notLogin">로그인</button>
						</Link>
						<div>
							<a>알림</a>
						</div>
						<div>
							<Link to="/mypage/like">
								<a>좋아요</a>
							</Link>
						</div>
						<div>
							<Link to="/mypage/cart">
								<a>장바구니</a>
							</Link>
							<CountNum>{cartNum}</CountNum>
						</div>
						<div>
							<a>주문배송조회</a>
						</div>
					</HUser>
				)}
			</HDiv>
		</HContainer>
	);
};

export default Header;
