import styled from '@emotion/styled';

export const FormWrapper = styled.div`
	margin-top: 30px;
	position: relative;
	backgroud: #f3f3f3;
	border: 1px solid #ddd;
	margin-left: 20px;
	padding: 12px 9px 7px 9px;
`;

export const BuyOption = styled.select`
	width: 100%;
	padding: 5px;
	--swiper-theme-color: #007aff;
	border: none;
	margin-bottom: 5px;
`;

export const TotalPrice = styled.div`
	height: 16px;
	margin-left: 20px;
	padding: 15px;
	border: 1px solid #ddd;
	border-top: none;
	p {
		font-size: 16px;
		font-weight: bold;
		float: left;
		padding-right: 214px;
	}
	div {
		font-size: 16px;
		font-weight: bold;
		float: left;
	}
`;

export const ButtonWrapper = styled.div`
	margin-top: 15px;
	margin-left: 20px;
	display: inline-flex;
`;

export const ButtonBuy = styled.div`
	background-color: black;
	color: white;
	width: 270px;
	height: 60px;
	text-align: center;
	line-height: 58px;
	font-weight: bold;
	font-size: 20px;
	cursor: pointer;
`;

export const ButtonLike = styled.div`
	border: 1px solid #ddd;
	margin-left: 5px;
	background-color: ${props => (props.clickedlike === true ? '#fff' : '#F42C28')};
	width: 60px;
	position: relative;
`;

export const Like = styled.span`
	position: absolute;
	line-height: normal;
	color: #bbb;
	color: ${props => (props.clickedlike === true ? '#bbb' : '#fff')};
	font-size: 12px;
	font-weight: bold;
	top: 35px;
	left: 12px;
`;

export const Button = styled.i`
	position: absolute;
	top: 8px;
	left: 17px;
	width: 30px;
	height: 30px;
	background: url('https://static.msscdn.net/skin/musinsa/images/icon.png?20190715');
	background-position: ${props => (props.clickedlike === true ? '-181px -12px' : '-212px -12px')};

	cursor: pointer;
	color: rgb(0, 0, 0, 0);
`;

export const ButtonCart = styled.div`
	border: 1px solid #ddd;
	margin-left: 5px;
	background-color: white;
	width: 60px;
	position: relative;
	i {
		position: absolute;
		top: 12px;
		left: 17px;
		width: 30px;
		height: 30px;
		background: url('https://static.msscdn.net/skin/musinsa/images/icon.png?20190715');
		background-position: -240px -10px;
		cursor: pointer;
		color: rgb(0, 0, 0, 0);
	}
`;
