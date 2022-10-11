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
					background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
  -webkit-background-clip: text;
          background-clip: text;
  -webkit-text-fill-color: transparent;

				}
			}
			& li:first-of-type{
				& a{
					color: red;
					font-size: 3.6em;
				}
			}
			& li:first-of-type{
				& a{
					color: red;
					font-size: 3.6em;
				}
			}
			& li:first-of-type{
				& a{
					color: red;
					font-size: 3.6em;
				}
			}
			& li:first-of-type{
				& a{
					color: red;
					font-size: 3.6em;
				}
			}
		}
		@keyframes rainbow {
			0%,
			100% {
				background-position: 0 0;
			}
			50% {
				background-position: 100% 0;
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

