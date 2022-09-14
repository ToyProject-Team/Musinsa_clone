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

export const CheckLabel = styled.label`
	display: inline-flex;
	position: relative;
	width: auto;
	min-height: 20px;
	padding: 0 0 0 26px;
	font-size: 14px;
	color: inherit;
	text-align: left;
	white-space: normal;
	align-items: center;
	cursor: pointer;

	&::before {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 20px;
		height: 20px;
		border: 1px solid #ccc;
		border-radius: 100%;
		background-color: #f1f1f1;
		content: '';
	}

	&.active {
		&::before {
			border-color: #0078ff;
			background-color: #0078ff;
		}

		&::after {
			content: '';
			position: absolute;
			top: 12px;
			left: 9px;
			width: 4px;
			height: 8px;
			border-right: 1px solid #fff;
			border-bottom: 1px solid #fff;
			transform: translateY(calc(-50% - 2px)) rotate(45deg);
			display: block;
			box-sizing: border-box;
		}
	}
`;
