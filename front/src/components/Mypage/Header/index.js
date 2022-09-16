import React, { useEffect, useState } from 'react';
import { getData } from 'utils/getData';
import Avatar from 'react-avatar';
import { Header, MypageTitle, NickName, Profile, PrfImg } from './styles';

function Mypage_header() {
	// 세션스토리지에서 아이디가져오기
	const [nickname, setNickname] = useState('');
	const [user, setUser] = useState(() => getData());

	useEffect(() => {
		setNickname(user.userData.loginId);
	});

	// console.log(user.userData.loginId);

	return (
		<Header>
			<MypageTitle>My Page</MypageTitle>
			<Profile>
				<dt><Avatar color='gray' name={nickname} round={true} size="160" textSizeRatio={1.5} /></dt>
				<NickName>{nickname}</NickName>
			</Profile>
		</Header>
	);
}

export default Mypage_header;
