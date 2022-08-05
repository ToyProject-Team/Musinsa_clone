import styled from '@emotion/styled';

export const ListWrapper = styled.ul`
	border: 1px solid #cdcdcd;
	position: absolute;
	top: 35px;
	left: 110px;
	background-color: white;
	z-index: 2;
`;

export const List = styled.li`
	font-weight: bold;
	border-bottom: 1px solid #cdcdcd;
	:last-child {
		border-bottom: none;
	}
	padding: 15px;
	color: #06f;
`;

export const Level = styled.p`
	display: inline-block;
	color: black;
	width: 120px;
`;

export const Price = styled.p`
	display: inline-block;
	color: #06f;
`;
