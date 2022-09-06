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
	display: flex;
	justify-content: space-between;
	p {
		font-size: 16px;
		font-weight: bold;
		padding-right: 20px;
	}
	div {
		position: absoulte;
		font-size: 16px;
		font-weight: bold;
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
	cursor: pointer;
`;

export const Like = styled.span`
	position: absolute;
	line-height: normal;
	color: #bbb;
	color: ${props => (props.clickedlike ? '#bbb' : '#fff')};
	font-size: 12px;
	font-weight: bold;
	top: 35px;
	left: 50%;
	transform: translateX(-50%);
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

export const SelectedOption = styled.div`
	background-color: white;
  border : 1px solid #ddd;
  border-top:none;
  width : 100%
  padding: 12px 9px 7px 9px;
  margin-left: 20px; 
  height: 47px;
`;

export const Selected = styled.div`
	color: #777;
	font-size: 12px;
	font-weight: bold;
	float: left;
	padding: 10px;
	padding-left: 17px;
	padding-top: 17px;
	width: 145px;
`;

export const Amount = styled.div`
	display: inline-block;
	float: left;
	padding: 10px;
	font-size: 12px;
	li:last-child {
		font-size: 20px;
		font-weight: bold;
		background-color: #eee;
		border-left: none;
		cursor: pointer;
	}
	li {
		float: left;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 23px;
		border: 1px solid #eee;
	}
`;

export const Decrease = styled.li`
	font-size: 20px;
	font-weight: bold;
	background-color: #eee;
	border-right: none;
	cursor: pointer;
	color: ${props => (props.orderAmount === 1 ? '#ddd' : 'black')};
`;

export const Price = styled.div`
	float: left;
	div {
		font-size: 13px;
		font-weight: bold;
		color: #777;
		display: inline-block;
		padding: 15px 10px 10px 40px;
	}
	p {
		font-size: 12px;
		font-weight: bold;
		display: inline-block;
		cursor: pointer;
	}
`;
