import styled from '@emotion/styled';

export const OrderTable = styled.table`
	width: 100%;
	font-size: 14px;
	line-height: 1.5;
	border-collapse: collapse;
	table-layout: fixed;
	border-top: 1px solid #000000;
	th {
		height: 52px;
		border-bottom: 1px solid #000000;
		font-size: 16px;
		vertical-align: middle;
		font-weight: normal;
		#check_all{
			display: block;
			position: absolute;
			overflow: hidden;
			width: 1px;
			height: 1px;
			clip: rect(0 0 0 0);
		}
		label{
			width: 0;
			height: 21px;
			padding-left: 22px;
			overflow: hidden;
			display: inline-block;
			font-family: "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
			line-height: 1.5;
			font-size: 14px;
			position: relative;
			&::before{
				background-color: #0078ff;
    			border-color: #0078ff;
				content: "";
				display: block;
				width: 14px;
				height: 14px;
				border: 1px solid #0078ff;;
				border-radius: 100%;
				position: absolute;
				left: 3px;
				top: 2px;
			}
			&::after{
				width: 5px;
				height: 3px;
				border-left: 1px solid #ffffff;
				border-bottom: 1px solid #ffffff;
				left: 8px;
				top: 7px;
				transform: rotate(-45deg);
				content: "";
				display: block;
				position: absolute;
			}
		}
	}
	.cart_cont {
		position: relative;
		height: 70px;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5;
		text-align: center;
		vertical-align: middle;
		word-break: break-all;
		
		table{
			border-top: 0;
			width: 100%;
			line-height: 1.5;
			font-size: 14px;
			border-collapse: collapse;
			table-layout: fixed;
			td{
				position: relative;
				height: 70px;
				padding: 10px;
				box-sizing: border-box;
				border-bottom: 1px solid #f5f5f5;
				text-align: center;
				vertical-align: middle;
				word-break: break-all;

				#cart_check{
					margin: 0;
					box-sizing: border-box;
    				padding: 0;
					display: block;
					position: absolute;
					overflow: hidden;
					width: 1px;
					height: 1px;
					clip: rect(0 0 0 0);
				}
				label{
					width: 0;
					height: 21px;
					padding-left: 22px;
					overflow: hidden;
					display: inline-block;
					font-family: "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
					line-height: 1.5;
					font-size: 14px;
					position: relative;
					&::before{
						background-color: #0078ff;
						border-color: #0078ff;
						content: "";
						display: block;
						width: 14px;
						height: 14px;
						border: 1px solid #0078ff;;
						border-radius: 100%;
						position: absolute;
						left: 3px;
						top: 2px;
					}
					&::after{
						width: 5px;
						height: 3px;
						border-left: 1px solid #ffffff;
						border-bottom: 1px solid #ffffff;
						left: 8px;
						top: 7px;
						transform: rotate(-45deg);
						content: "";
						display: block;
						position: absolute;
					}
				}
				
				.input_amount{
					display: inline-block;
    				position: relative;
					button{
						display: block;
						border: 0;
						background: #eee;
						padding: 5px;
						position: relative;
						float: left;
						cursor: pointer;
						svg{
							width: 22px;
    						height: 22px;
						}
					}
					input[type="text"]{
						width: 32px;
						height: 30px;
						border: 1px solid #eee;
						text-align: center;
						font-family: "Apple SD Gothic Neo", "Noto Sans KR", sans-serif !important;
						color: #000000;
						float: left;
						vertical-align: middle;
						text-indent: 3px;
					}
				}
				.btn{
					float: left;
					display: block;
					width: 90px;
					min-width: 90px;
					margin: 4px auto;
					border: 1px solid #000000;
    				background-color: #000000;
					height: 32px;
					line-height: 30px;
					font-family: "Apple SD Gothic Neo", "Noto Sans KR", sans-serif !important;
					color: #ffffff;
    				box-sizing: border-box;
					font-size: 14px;
					text-align: center;
					cursor: pointer;
					transition: border 0.2s, background 0.2s ease-in-out;
					text-decoration: none;

				}
				.del_btn{
					position: absolute;
					top: 50%;
					left: 110px;
					transform: translateY(-50%);
					margin: 0;
					display: block;
					float: left;
					padding: 5px;
					opacity: 0.2;
				}
			}
			.top{
				vertical-align: top;
				div{
					margin: 10px 0;
					display: table;
					table-layout: fixed;
					width: 100%;
					min-height: 96px;
					font-family: "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
					line-height: 1.5;
					font-size: 14px;
					text-align: left;
					position: relative;
					ul{
						width: 100%;
						display: table-cell;
						padding-left: 10px;
						vertical-align: middle;
					}
				}
			}
		}

}
			
`;

export const ImgSpan = styled.span`
	display: table-cell;
    width: 80px;
    padding-top: 96px;
    vertical-align: middle;
	position: relative;
    overflow: hidden;
	img{
		width: 100%;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
`;
