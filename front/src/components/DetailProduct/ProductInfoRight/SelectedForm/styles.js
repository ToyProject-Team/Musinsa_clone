import styled from '@emotion/styled';

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
	// li:first-child {
	// 	font-size: 20px;
	// 	font-weight: bold;
	// 	background-color: #eee;
	// 	border-right: none;
	// 	cursor: pointer;
	// }
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
	}
`;
