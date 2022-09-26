import React, { useCallback, useState, useRef } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import { PostHeaderApi } from 'utils/api';
import Cookies from 'js-cookie';

const Header = () => {
	const [login, setLogin] = useState(getData());
	const [cartNum, setCartNum] = useState(0);
	const [search, setSearch] = useState(Cookies.get("input", ""));
	const [open, setOpen] = useState(false);

	const valRef = useRef();

	const formSub = useCallback((e)=>{
		e.preventDefault();
		const val = valRef.current.value;
		// Cookies.set("input", val)
		setSearch(Cookies.set("input",val))

		// let val = valRef.current.value
		// let co = Cookies.get("input", val)
		// setSearch(co)
		// console.log(val,123123,search.length, 11111, co)
	},[])
		
	const inputChange = useCallback(()=>{
		const val = valRef.current.value;
		// console.log(co,123123,search,123123,val)
	},[])
	

	const inputValue = () =>{
		setOpen(!open)
		// if(e.keyCode == 13) console.log("asd")
	}


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
						<form id="search_form" onSubmit={formSub}>
							<input 
							id="search_query" 
							type="text" 
							maxLength={30} 
							autoComplete="off" 
							onMouseOver={inputValue} 
							ref={valRef}
							// onChange={inputChange}
							/>
							<span>
								<AiOutlineCamera />
							</span>
							<span>
								<AiOutlineSearch />
							</span>
						</form>
					</div>
					<article className={open ? "block" : "none"} >
						<dl>
							<dt>
								<h3>최근 검색어</h3>
								<button type="button">전체 삭제</button>
							</dt>
						{search}
							<dd>
								<ul>
									<li>최근 검색어 내용이 없습니다.</li>
								</ul>
							</dd>
						</dl>
					</article>
				</HSearch>

				<HUser>
					{login ? 
						<button className="nowLogin">{login.userData.loginId}</button>
							:
						<Link to="/login">
								<button className="notLogin">로그인</button>
						</Link>
					}
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
					{login ? 
						<div onClick={deleteLogout} className="logOut">
							로그아웃
						</div> 
						:
						null
					}
						
				</HUser>
			</HDiv>
			
		
		</HContainer>
	);
};

export default Header;
