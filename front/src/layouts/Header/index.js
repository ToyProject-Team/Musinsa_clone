import React, {useCallback, useEffect, useState} from "react";
import {
    HContainer,
    HDiv,
    HLogo,
    HSearch,
    HUser,
} from "./styles";
import { Link, Navigate } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from "react-icons/ai";
import { getData } from 'utils/getData';


const Header = () =>{
    const [login, setLogin] = useState(getData());
    // console.log(login.userData.nickname)


    const deleteData = useCallback(()=>{
        sessionStorage.removeItem("data");
        setLogin(false);
        
        if(login == false){
            return <Navigate to="/login"/>;
            
        }
        
    },[login]) 
        
    

    

   

    return (
        <HContainer>
            <HDiv>
            
                <Link to="/"><HLogo>MUSINSA</HLogo></Link>
                <HSearch>
                    <div>
                        <form id="search_form">
                            <input type="hidden" name="type" value/>
                            <label htmlFor="search_query">통합 검색</label>
                            <input id="search_query" type="text" name="q" maxLength={30} autoComplete="off"/>
                            <span><AiOutlineCamera/></span>
                            <span><AiOutlineSearch/></span>
                        </form>
                    </div>
                </HSearch>

                {login&&
                    <HUser>
                        <button className="nowLogin">{login.userData.id}</button>
                        <div><a>알림</a></div>
                        <div><a>마이페이지</a></div>
                        <div><a>좋아요</a></div>
                        <div><a>장바구니</a></div>
                        <div><a>주문배송조회</a></div>
                        <div onClick={deleteData} >로그아웃</div>
                    </HUser> 
                }
                {!login&&
                    <HUser>
                        <Link to="/Login"><button className="notLogin">로그인</button></Link>
                        <div><a>알림</a></div>
                        <div><a>마이페이지</a></div>
                        <div><a>좋아요</a></div>
                        <div><a>장바구니</a></div>
                        <div><a>주문배송조회</a></div>
                    </HUser>
                }
                

            </HDiv>




        </HContainer>    
    )
}

export default Header;




















