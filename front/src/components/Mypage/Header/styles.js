import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const Header = styled.div`
	position: relative;
	background: black;
	padding: 20px 20px 40px;
`;

export const MypageTitle = styled.h2`
	font-size: 24px;
	line-height: 52px;
	color: white;
	margin-bottom: 10px;
`;

export const Profile = styled.dl`
	display: flex;
	padding-left: 45px;
	
`;


export const NickName = styled.dd`
	padding-left: 50px;
	padding-top: 30px;
	color: white;
	font-weight: bold;
	font-size: 58px;
	line-height: 87px;
`;

export const Navi = styled.ul`
	position: absolute;
	top: 20px;
	right: 0;
	color: white;
	padding: 20px;
	&::after {
		display: block;
		content: '';
		clear: both;
	}
`;

export const NaviList = styled.li`
	float: left;
	margin-left: 32px;
`;

export const StyleLink = styled(Link)`
	color: #fff;
	text-decoration: none;
`;
