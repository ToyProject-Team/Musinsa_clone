import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const MypageLayout = styled.div`
	min-width: 1560px;
	width: auto;
	margin: 0px auto;
	box-sizing: border-box;
	&::after{
		content: "";
		display: block;
		clear: both;
	}
	
`;

export const Header = styled.div`
	background: black;
	padding: 20px 20px 40px;
	width: 100%;
`;

export const MypageTitle = styled.h2`
	font-size: 24px;
	line-height: 52px;
	color: rgb(255, 255, 255);
	padding: 20px 0px 24px;
`;

export const Profile = styled.dl`
	padding-left: 45px;
	&::after {
		display: block;
		content: '';
		clear: both;
	}
`;

export const PRFL_IMAGE = styled.dt`
	float: left;
	width: 160px;
	height: 160px;
	border-radius: 50%;
	background: white;
`;

export const NickName = styled.dd`
	display: inline-block;
	padding-left: 50px;
	padding-top: 30px;
	color: white;
	font-weight: bold;
	font-size: 58px;
	line-height: 87px;
`;

export const StyleLink = styled(Link)`
	color: #fff;
	text-decoration: none;
`;

export const StyleNav = styled.nav`
	width: 170px;
	float: left;
	margin: 54px 40px 0px 40px;
	font-size: 14px;
	h3 {
		padding: 13px 0px 2px;
		font-size: 24px;
		font-weight: normal;
		line-height: 40px;
	}
	ul {
		display: flex;
		flex-direction: column;
		padding-bottom: 15px;
		li {
			display: flex;
			margin-top: 2px;
			a {
				font-size: 16px;
				line-height: 40px;
				color: rgb(110, 110, 110);
				text-decoration: none;
			}
		}
	}
`;

export const MypageMain = styled.section`
	width: calc(100% - 250px);
	padding: 0;
	float: right;
	margin-top: 80px;
	h3 {
		display: block;
		font-size: 24px;
		border-bottom: 3px solid #000000;
		padding-bottom: 17px;
		font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		line-height: 1.5;
		position: relative;
	}
	
`;
