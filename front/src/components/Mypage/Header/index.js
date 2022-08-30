import React, { useState } from 'react';
import { Header, MypageTitle, PRFL_IMAGE, NickName, Profile } from 'pages/Mypage/styles';
import axios from 'axios';
import { EMAIL } from 'context/UserContext';

function Mypage_header() {
	const [nickname, setNickname] = useState('test');

	axios.get('pages/Login').then(function(){
		let emailcut = EMAIL.split("@");
		setNickname(emailcut);
		

	})

	return (
		<Header>
			<MypageTitle>My Page</MypageTitle>
			<Profile>
				<PRFL_IMAGE></PRFL_IMAGE>
				<NickName>{nickname}</NickName>
			</Profile>
		</Header>
	);
}

export default Mypage_header;
