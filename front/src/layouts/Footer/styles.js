import styled from '@emotion/styled';

export const FContainer = styled.footer`
	padding-top: 20px;
	border-top: 2px solid rgba(0, 0, 0, 0.2);
	margin-top: 300px;
`;





export const FDiv = styled.div`
	& div {
		border-bottom: 2px solid rgba(0, 0, 0, 0.2);
		overflow: hidden;
		padding: 20px;
		line-height: 18px;

		& ul{
			display: flex;
			gap: 40px;

			& li{
				width: 60px;
				height: 60px;
				text-align: center;

				
				& a{
					vertical-align: text-top;
					text-decoration: none;
					line-height: 0;

				}
				
			}

			& li:first-of-type{
				& a{
					color: red;
					font-size: 3.6em;
				}
			}
			& li:nth-of-type(2){
				& a{
					font-size: 3.6em;
					background: linear-gradient(to right, #ee9ca7, #ffdde1, #2193b0, #6dd5ed);
					background-size: 300%;
					background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
			& li:nth-of-type(3){
				& a{
					color: #4267B2;
					font-size: 3.6em;
				}
			}
			& li:nth-of-type(4){
				& a{
					color: #1DA1F2;
					font-size: 3.6em;
				}
			}
			& li:nth-of-type(5){
				& a{
					color: #2DB400;
					font-size: 3.6em;
				}
			}

			& li:nth-of-type(6){
				background-color: black;
				border-radius: 50%;
				& a{
					color: white;
					font-size: 12px;
					vertical-align: bottom;
				}
			}
			& li:nth-of-type(7){
				border: 2px solid black;
				border-radius: 50%;
				& a{
					color: black;
					font-weight: 900;
					font-size: 13px;
					vertical-align: bottom;
				}
			}
			& li:last-of-type{
				background-color: #453675;
				border-radius: 50%;
				& a{
					color: white;
					font-size: 12px;
					vertical-align: bottom;
				}
			}
		}
		@keyframes gradient{
			0% {
			background-position: 0 50%;
			}
			50% {
			background-position: 100% 50%;
			}
			100% {
			background-position: 0 50%;
			}
		}

	}
`;



export const FTitle = styled.p`
	${'' /* font-family: "MusinsaRegualr", "sans-serif"; */}
	font-family: "Arial", "sans-serif";
	color: black;
	font-weight: 600;
	font-size: 14px;
	margin-bottom: 1em;
	line-height: 2em;
	& .subTitle {
		font-size: 18px;
	}

	& span {
		font-size: 12px;
		font-weight: Black;
		display: block;
	}
`;

export const FDescription = styled.p`
	${'' /* font-family: 'Apple SD Gothi', 'sans-serif'; */}
	font-family: 'Arial', 'sans-serif';
	color: #b2b2b2;
	font-weight: 600;
	padding-bottom: 14px;

	& a {
		color: black;
		font-weight: Black;
		cursor: pointer;

		&:hover {
			color: gray;
			transition: all 0.5s;
		}
	}
`;

export const FBttom = styled.p`
	background-color: black;
	color: white;
	font-size: 1em;
	line-height: 36px;
	padding-left: 20px;
	font-weight: 600;

	& span {
		color: #b2b2b2;
	}
`;

