import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const ItemUl = styled.ul`
	li {
		strong {
			font-weight: bold;
		}
		a{
			text-decoration: none;
			color: #000;
		}
		&:last-child{
			color: gray;
		}
	}
`;

export const StyleLink = styled(Link)`
	color: #fff;
	text-decoration: none;
`;

export const CheckLabel = styled.label`
	display: inline-flex;
	position: relative;
	width: auto;
	min-height: 15px;
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
		width: 15px;
		height: 15px;
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
			top: 10px;
			left: 7px;
			width: 3px;
			height: 7px;
			border-right: 1px solid #fff;
			border-bottom: 1px solid #fff;
			transform: translateY(calc(-50% - 2px)) rotate(45deg);
			display: block;
			box-sizing: border-box;
		}
	}
`;
