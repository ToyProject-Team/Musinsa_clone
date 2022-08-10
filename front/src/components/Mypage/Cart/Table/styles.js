import styled from '@emotion/styled';

export const OrderTable = styled.table`
	width: 100%;
	font-size: 14px;
	border-collapse: collapse;
	table-layout: fixed;
	text-align: center;
	th {
		height: 52px;
		border-bottom: 1px solid #000000;
		font-size: 16px;
		vertical-align: middle;
		font-weight: normal;
	}
	td {
		position: relative;
		display: table-cell;
		height: 70px;
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5;
		text-align: center;
		vertical-align: middle;
		word-break: break-all;
		line-height: 16.8px;
		&:first-of-type {
			text-align: left;
		}
		div{
			position: absolute;
			left: 50%;
			bottom: 25%;
			transform: translateX(-50%);
			input {
			font-size: 14px;
			font-weight: 300;
			line-height: 20px;
			text-indent: 0;
			width: 32px;
			height: 30px;
			border: 1px solid #eee;
			text-align: center;
			color: #000000;
			float: left;
			}
			button{
			display: block;
			border: 0;
			background: #eee;
			padding: 5px;
			position: relative;
			float: left;
			svg{
				display: inline-block;
				width: 22px;
				height: 22px;
				font-size: 22px !important;
				overflow: hidden;
			}
		}
		}
}
		
		
		
`;

export const ImgSpan = styled.span`
	float: left;
	margin-right: 10px;
`;
