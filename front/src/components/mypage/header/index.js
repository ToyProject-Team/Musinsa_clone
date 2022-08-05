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
} from 'pages/mypage/styles';

function MyHeader() {
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

export default MyHeader;
