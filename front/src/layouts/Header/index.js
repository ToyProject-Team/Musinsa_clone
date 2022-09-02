import React from "react";
import {
    HContainer,
    HDiv,
    HLogo,
    HSearch,
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


            </HDiv>




        </HContainer>    
    )
}

export default Header;




















