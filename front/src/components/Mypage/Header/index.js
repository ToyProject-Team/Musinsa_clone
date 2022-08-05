import React from "react";
import { Header, MypageTitle, PRFL_IMAGE, NickName, Profile, Navi, NaviList, StyleLink } from "pages/Mypage/styles";

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
					<StyleLink to="/cart">장바구니</StyleLink>
				</NaviList>
				<NaviList>
					<StyleLink to="">로그아웃</StyleLink>
				</NaviList>
			</Navi>
		</Header>
	);
}

export default mypage_header;
