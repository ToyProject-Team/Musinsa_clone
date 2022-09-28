import React, { useCallback, useState, useRef, useEffect } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import { PostHeaderApi } from 'utils/api';
import { IoMdArrowDropup } from "react-icons/io";
import Cookies from 'js-cookie';

const Header = () => {
	const [login, setLogin] = useState(getData());
	const [cartNum, setCartNum] = useState(0);
	const [search, setSearch] = useState([]);
	const [open, setOpen] = useState(false);
	const [op, setOp] = useState(false);
	const valRef = useRef()
	 
	const formSub = useCallback((e)=>{
		e.preventDefault();
		const val = valRef.current.value;
		const saveInput = {
			input: val,
			id: Date.now(),
		  };
		
		search.push(saveInput)
		// saveText();
		// saveInput.input = ""
		// console.log(saveInput,123123,search.length)
			
	},[])

	useEffect (()=>{
		sessionStorage.setItem("input",JSON.stringify(search))

	},[search])

	const inputValue = () =>{
		setOpen(!open)
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
							<dd>
								<ul>
								{/* {search.length === 0 ?
									<li>최근 검색어 내용이 없습니다.</li>
									:
									{search.map((text, index) => {
										<li>{text}</li>
									})}
								} */}
								{search.map((text, idx) => {
									<li>
									{/* console.log(text.input,"ddddddd",idx) */}
									{text.input}
									</li>
									{/* <li>{consol}</li> */}
								})}

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
							<a onClick={() => setOp(!op)}>알림</a>
							<article className={op ? "block" : "none"}>
								<p>PC에서는 공지, 구매 정보 알림만 확인하실 수 있습니다. <br/>그 외 알림은 앱에서 확인 가능합니다.</p>
								<p>등록된 알림이 없습니다.</p>
								<span><IoMdArrowDropup/></span>
							</article>
							
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
