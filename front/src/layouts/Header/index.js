import React from "react";
import {
    HContainer,
    HDiv,
    HLogo,
    HSearch,
    HUser,
} from "./styles";
import { Link } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineSearch } from "react-icons/ai";

const Header = () =>{
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

                <HUser>
                    <Link to="/Login"><button>로그인</button></Link>
                    <div><a>마이페이지</a></div>
                    <div><a>최근 본 상품</a></div>
                    <div><a>좋아요</a></div>
                    <div><a>장바구니</a></div>
                    <div><a>주문배송조회</a></div>
                    <div><a>고객센터</a></div>
                </HUser>

            </HDiv>




        </HContainer>    
    )
}

export default Header;




















