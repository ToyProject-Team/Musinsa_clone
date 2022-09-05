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
	gap: 15px;
	justify-content: center;
	align-items: center;
	padding-right: 80px;
	font-weight: 900;

	& button {
		cursor: pointer;
		border: 2px solid #fff;
		background: none;
		color: white;
		padding: 6px 24px 6px 24px;
	}

	& div {
		text-align: center;
		word-break: keep-all;
	}
`;
