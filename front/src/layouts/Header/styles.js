import styled from '@emotion/styled';

export const HContainer = styled.div`
	border-bottom: 1px solid #dddddd;
	max-width: 100%;
`;

export const HDiv = styled.div`
	display: flex;
	min-height: 32px;
	height: auto;
	width: 100%;
	padding: 23px 0 23px 0;
	background-color: black;

	.none {
		display: none;
	}

	.block {
		display: block;
	}
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
	position: relative;
	margin-left: 20px;
	margin-right: auto;

	& article {
		position: absolute;
		left: 1px;
		width: 257px;
		height: 466px;
		background-color: white;
		z-index: 999;
		border: 1px solid #ddd;

		& dl {
			& dt {
				display: flex;
				justify-content: space-between;
				background-color: #f3f3f3;
				line-height: 30px;
				border-bottom: 1px solid #ddd;

				& h3 {
					font-size: 14px;
					font-weight: 900;
					padding: 8px;
				}

				& button {
					border: none;
					font-size: 12px;
					background-color: transparent;
					text-decoration: underline;
					padding: 0;
					color: #b2b2b2;
					font-weight: 600;
					margin-right: 8px;
					cursor: pointer;
				}
			}

			& dd {
				& ul {
					.no-item {
						font-size: 12px;
						font-weight: 700;
						padding: 50px 0;
						text-align: center;
						vertical-align: middle;
					}

					& li:not(.no-item) {
						display: flex;
						width: 100%;
						margin: 0;
						padding: 0;
						padding-right: 10px;
						border-bottom: 1px solid #ddd;
						box-sizing: border-box;
						line-height: 28px;
						color: #b2b2b2;
						gap: 10px;

						&:hover {
							background-color: #f3f3f3;
						}

						& > a {
							display: inline-block;
							box-sizing: border-box;
							width: calc(100% - 46px);
							max-width: none;
							padding: 6px 0 5px 10px;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							cursor: pointer;

							&:hover {
								text-decoration: underline;
							}
						}

						& > div {
							width: 37px;
							a {
								text-decoration: none;
							}
							a:hover {
								text-decoration: underline;
							}

							.move {
								display: inline-block;
								padding: 6px 3px 5px;
								color: #b2b2b2;
								cursor: pointer;
							}

							.remove {
								display: inline-block;
								padding: 6px 3px 5px;
								color: #f00 !important;
								font-weight: normal !important;
							}
						}
					}
				}
			}
		}
	}

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
				outline: none;
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

	& > div {
		cursor: pointer;
	}

	.flex {
		position: relative;
		display: flex;
	}

	.basket {
		display: flex;
		align-items: start;
	}

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
		position: relative;
		& a {
			text-decoration: none;
			color: inherit;
		}

		& article {
			position: absolute;
			top: 100%;
			width: 375px;
			padding: 15px 0;
			transform: translate(-164px, 18px);
			border: 1px solid #ddd;
			background-color: white;
			color: #777;
			font-size: 12px;
			line-height: 1.5;
			z-index: 11;
			animation: fadeIn 0.4s;

			& p:last-of-type {
				padding: 20px;
			}

			& span {
				position: absolute;
				font-size: 46px;
				top: -24%;
				left: 42%;
				z-index: 4;
				& svg {
					fill: white;
				}
			}
		}
		@keyframes fadeIn {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}
	}

	& div:nth-of-type(2) {
		& a {
			color: rgb(237, 0, 96);
		}
	}

	& .logOut:hover {
		background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045, #b3ffab, #12fff7);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: rainbow 6s ease-in-out infinite;
		background-size: 400% 100%;
	}
`;

export const CountNum = styled.span`
	display: inline-block;
	width: 18px;
	height: 18px;
	padding: 2px;
	border-radius: 50%;
	background-color: #0078ff;
	font-size: 12px;
	font-family: 'Arial', 'sans-serif';
	line-height: normal;
	color: white;
	margin: -1px 0 -4px 2px;
`;
