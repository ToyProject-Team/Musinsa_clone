import styled from '@emotion/styled';

export const HContainer = styled.div`
	border-bottom: 1px solid #dddddd;
	max-width: 100%;
`;

export const HDiv = styled.div`
	min-height: 32px;
	height: auto;
	width: 100%;
	padding: 23px 0 23px 0;
	background-color: black;
	display: flex;
`;

export const HLogo = styled.h1`
	width: 140px;
	height: 23px;
	background: url(https://static.msscdn.net/skin/musinsa/images/logo_nsl_20211229.png?20200204) 0 0
		no-repeat;
	background-size: auto 100%;
	text-indent: -9999px;
	margin-left: 20px;
	margin-top: 4px;
	cursor: pointer;
`;

export const HSearch = styled.div`
	margin-left: 20px;
	margin-right: auto;

	& div {
		width: 260px;
		& form {
			position: relative;
			bakcground-color: white;
			border: 1px solid #373737;

			& input:first-of-type {
				width: 258px;
				height: 30px;
				line-height: 32px;
				border: 1px solid #373737;
			}

			& label {
				overflow: hidden;
				position: absolute;
				width: 1px;
				height: 1px;
			}

			& input:last-of-type {
				width: 210px;
				border: none;
				background-color: white;
				height: 30px;
				line-height: 32px;
			}

			& span:first-of-type {
				padding: 5px 10px 0 0;
				position: absolute;
				right: 16%;
				cursor: pointer;
				& svg {
					width: 24px;
					height: 24px;
				}
			}

			& span:last-of-type {
				padding: 5px 10px 0 0;
				position: absolute;
				right: 0;
				cursor: pointer;
				& svg {
					width: 24px;
					height: 24px;
					color: white;
				}
			}
		}
	}
`;

export const HUser = styled.div`
	display: flex;
	color: #fff;
	gap: 20px;
	justify-content: center;
	align-items: center;
	padding-right: 40px;
	font-weight: 900;
	cursor: pointer;

	.nowLogin {
		cursor: pointer;
		background: none;
		color: white;
		font-size: 18px;
		position: relative;
		border-radius: 4px;
		font-weight: 900;
		border: none;
	}

	.notLogin {
		cursor: pointer;
		border: 2px solid white;
		background: none;
		color: white;
		padding: 6px 24px 6px 24px;
		font-size: 18px;
		position: relative;
		border-radius: 4px;
		font-weight: 900;

		&.notLogin:hover {
			background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			animation: rainbow 6s ease-in-out infinite;
			background-size: 400% 100%;

			&::after {
				content: '';
				position: absolute;
				top: -3px;
				left: -2px;
				right: -3px;
				bottom: -3px;
				border-radius: 4px;
				background: linear-gradient(120deg, #00f260, #0575e6, #00f260);
				background-size: 300% 300%;
				clip-path: polygon(
					0% 100%,
					3px 100%,
					3px 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) calc(100% - 3px),
					3px calc(100% - 3px),
					3px 100%,
					100% 100%,
					100% 0%,
					0% 0%
				);
				animation: rainbow_frame 1s forwards ease-in-out reverse,
					rainbow_border 4s ease-in-out infinite;
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

		@keyframes rainbow_border {
			0% {
				background-position: 15% 0%;
			}
			50% {
				background-position: 85% 100%;
			}
			100% {
				background-position: 15% 0%;
			}
		}

		@keyframes rainbow_frame {
			0% {
				clip-path: polygon(
					0% 100%,
					3px 100%,
					3px 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) calc(100% - 3px),
					3px calc(100% - 3px),
					3px 100%,
					100% 100%,
					100% 0%,
					0% 0%
				);
			}
			25% {
				clip-path: polygon(
					0% 100%,
					3px 100%,
					3px 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) calc(100% - 3px),
					calc(100% - 3px) calc(100% - 3px),
					calc(100% - 3px) 100%,
					100% 100%,
					100% 0%,
					0% 0%
				);
			}
			50% {
				clip-path: polygon(
					0% 100%,
					3px 100%,
					3px 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) 3px,
					calc(100% - 3px) 3px,
					100% 0%,
					0% 0%
				);
			}
			75% {
				-webkit-clip-path: polygon(
					0% 100%,
					3px 100%,
					3px 3px,
					3px 3px,
					3px 3px,
					3px 3px,
					3px 3px,
					3px 3px,
					3px 0%,
					0% 0%
				);
			}
			100% {
				-webkit-clip-path: polygon(
					0% 100%,
					3px 100%,
					3px 100%,
					3px 100%,
					3px 100%,
					3px 100%,
					3px 100%,
					3px 100%,
					3px 100%,
					0% 100%
				);
			}
		}
	}

	& div {
		text-align: center;
		word-break: keep-all;
		font-size: 18px;

		& a {
			text-decoration: none;
			color: inherit;
		}
	}

	& .logOut:hover {
			background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045, #B3FFAB, #12FFF7);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			animation: rainbow 6s ease-in-out infinite;
			background-size: 400% 100%;
			
	}
	
`;

export const CountNum = styled.span`
	display: inline-block;
	min-width: 18px;
	height: 16px;
	border-radius: 10px;
	background-color: #0078ff;
	font-size: 12px;
	font-family: 'Arial', 'sans-serif';
	line-height: normal;
	color: white;
	vertical-align: text-top;
	margin-left: 2px;
	padding-top: 3px;
`;
