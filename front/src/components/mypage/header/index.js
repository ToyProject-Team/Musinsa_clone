<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import { Header, MypageTitle, PRFL_IMAGE, NickName, Profile, Navi, NaviList, StyleLink } from "../../../pages/Mypage/styles";
=======
import React from 'react';
import { Link } from 'react-router-dom';
import {
	Header,
	MypageTitle,
	PRFL_IMAGE,
	NickName,
	Profile,
	Navi,
	NaviList,
	StyleLink,
} from 'pages/Mypage/styles';
>>>>>>> a1b58fe9ee58b79f0e2e379ec30e6b72e204aa6d

function mypage_header() {
	return (
		<Header>
			<MypageTitle>My Page</MypageTitle>
			<Profile>
				<PRFL_IMAGE></PRFL_IMAGE>
				<NickName>HELLOi</NickName>
			</Profile>
			<Navi>
				<NaviList>
					<StyleLink to="">장바구니</StyleLink>
				</NaviList>
				<NaviList>
					<StyleLink to="">로그아웃</StyleLink>
				</NaviList>
			</Navi>
		</Header>
	);
}

export default mypage_header;
