import React, { useCallback, useState, useRef, useEffect } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import { PostHeaderApi } from 'utils/api';
import { IoMdArrowDropup } from "react-icons/io";
import Cookies from 'js-cookie';

const Header = props => {
	const [login, setLogin] = useState(getData());
	const [cartNum, setCartNum] = useState(0);
	const [search, setSearch] = useState([] || localStorage.getItem("keywords"));
	const [open, setOpen] = useState(false);
	const [notice, setNotice] = useState(false);
	const valRef = useRef()
	 
	const formSub = useCallback((e)=>{
		e.preventDefault();
		const val = valRef.current.value;
		// const saveInput = {
		// 	input: val,
		// 	id: Date.now(),
		//   };
		
		// search.push(saveInput)
		// saveText();
		// saveInput.input = ""
		// console.log(saveInput,123123,search)
			
	},[])

	const inputValue = (e) =>{
		const val = e.target.value;
		// setSearch(val)
		console.log(val)
	}

	// const saveText = () =>{
	// 	;
	// }
	

	const searchBtn = () =>{
		let val = valRef.current.value
		// val = ""

		const newKeyword = {
			id: Date.now(),
			keywords: val,
		  }

		search.push(newKeyword)
		localStorage.setItem("keywords",JSON.stringify(search))

		// const key = localStorage.getItem("keywords")
		// const getKey = JSON.parse(search)
		// const arr = getW.map((e) => e)
		console.log(search,123321,search.length)
	}

	// useEffect(()=>{
	// 	localStorage.getItem('keywords', JSON.stringify(search))
	// },[search])
	// useEffect (()=>{
	// 	sessionStorage.setItem("input",JSON.stringify(search))
	// },[search])
	useEffect(()=>{
		// let val = localStorage.getItem("keywords")
		// const getW = JSON.parse(val)
		// const arr = getW.map((e) => e)
		console.log(search.length,123,search)	
	
	},[search])
	

	const inputOpen = () =>{
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
				<div onClick={() => props.goMain()}>
					<HLogo>MUSINSA</HLogo>
				</div>
				<HSearch>
					<div>
						<form id="search_form" onSubmit={formSub}>
							<input 
							id="search_query" 
							type="text" 
							maxLength={30} 
							autoComplete="off" 
							onMouseOver={inputOpen} 
							onChange={inputValue}
							ref={valRef}
							/>
							<span>
								<AiOutlineCamera />
							</span>
							<span onClick={searchBtn}>
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
							{search.length !== 0 &&

								<ul>
									{search.map((e) => {
										<li>{e.id}</li>
									})}
									
								
								
								{/* {search.map((text, idx) => {
									if(search.length === 0){
										<li>최근 검색어 내용이 없습니다.</li>
									}
									<li key={idx}>
										{text[0].input}
									</li>
									
								})} */}
								<li>최근 검색어 내용이 없습니다.</li>
								</ul>
							}
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
					{login ? 
						<div>
							<a onClick={() => setNotice(!notice)}>알림</a>
							<article className={notice ? "block" : "none"}>
								<p>PC에서는 공지, 구매 정보 알림만 확인하실 수 있습니다. <br/>그 외 알림은 앱에서 확인 가능합니다.</p>
								<p>등록된 알림이 없습니다.</p>
								<span><IoMdArrowDropup/></span>
							</article>
						</div>
						:
						null
					}
					
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
