import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/* Keyframes */
const tooltipInSlide = keyframes`
  100% {
    transform: translate3d(0,0,0);
  }
`;

const tooltipOutSlide = keyframes`
  0% {
    transform: translate3d(0,0,0);
  }
  99.9% {
    transform: translate3d(0,0,0);
  }
  100% {
    display: none;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

/* Styled */
export const Container = styled.div`
	height: 100vh;
	background-color: #f1f1f1;
	overflow: hidden;

	a {
		color: inherit;
		text-decoration: none;
	}

	& input {
		border-radius: 4px;
		background-color: #fff;
		font-size: 15px;
		color: #000;
		box-shadow: 0 0 0 30px #fff inset !important;
		transition: border 0.2s ease-in-out;
		padding: 0 12px;
		box-sizing: border-box;
		width: 100%;
		appearance: none;
	}

	& button {
		border: 0;
		background: 0 0;
		font-size: inherit;
		font-family: inherit;
		line-height: 1.5;
		appearance: none;
		cursor: pointer;
	}

	.login-button__item {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		padding: 14px 16px 15px;
		border: 1px solid #000;
		border-radius: 4px;
		font-weight: 700;
		color: #000;
	}
`;

export const SignupSection = styled.section`
	max-width: 340px;
	height: 100vh;
	margin: 0 auto;
	background-color: #fff;
	padding: 62px;
`;

export const Header = styled.h2`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	height: 50px;
	position: relative;
	font-size: 16px;
	font-weight: 600;
`;

export const SignupInner = styled.div`
	padding-right: 15px;
	padding-left: 15px;

	& > form {
		margin-top: 20px;
	}

	& > div {
		margin-top: 20px;
		padding-bottom: 0;
		text-align: center;
	}
`;

export const SignupContainer = styled.div`
	margin-top: 8px;

	& > label {
		display: inline-block;
		margin: 16px 0 8px;

		& > span {
			display: inline-block;
			overflow: hidden;
			width: 4px;
			height: 4px;
			margin-top: 4px;
			border-radius: 50%;
			background-color: red;
			text-indent: -9999px;
			vertical-align: top;
		}
	}

	& > div {
		display: flex;
		box-sizing: border-box;
		height: 50px;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;

		& > input {
			height: 48px;
			border: none;
			flex: 0 1 auto;
		}

		& > button {
			display: flex;
			margin-right: 7px;
			padding: 5px;
			flex: 0 0 auto;
		}
	}

	& > div:focus-within {
		border-color: #aaa !important;
		transition: border 0.2s ease-in-out;
	}

	& input:focus-visible {
		outline: none;
	}

	& p {
		margin-top: 8px;
		font-size: 11px;
		line-height: 16.5px;
		color: red;
	}

	& p.helper-text {
		margin-top: 8px;
		font-size: 11px;
		line-height: 16.5px;
		color: #6e6e6e;
	}
`;

export const SignupCheckBox = styled.div`
	margin-top: 40px;

	& > .all-check {
		display: inline-flex;
		margin-bottom: 4px;
		color: #000;
		align-items: center;

		& > input {
			overflow: hidden;
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			clip: rect(0 0 0 0);
		}
		& > label {
			font-weight: 700;
			font-size: 15px;
			display: inline-flex;
			position: relative;
			width: auto;
			min-height: 24px;
			padding: 0 0 0 31px;
			color: inherit;
			text-align: left;
			white-space: normal;
			cursor: pointer;
			align-items: center;

			&::before {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				display: block;
				width: 24px;
				height: 24px;
				border: 1px solid #ccc;
				border-radius: 100%;
				background-color: #f1f1f1;
				box-sizing: border-box;
				content: '';
			}
		}
	}

	& > .check {
		display: flex;
		margin-left: 4px;
		padding-left: 28px;
		margin-top: 12px;
		flex-wrap: wrap;

		& > input {
			overflow: hidden;
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			clip: rect(0 0 0 0);
		}

		& > label {
			margin-right: 4px;
			margin-left: -28px;
			display: inline-flex;
			font-size: 13px;
			line-height: 19px;
			color: #6e6e6e;
			align-items: center;
			cursor: pointer;
		}

		& > a {
			font-size: 13px;
			line-height: 19px;
			color: #6e6e6e;
			text-decoration: underline;
			cursor: pointer;
		}
	}
`;

export const LookButton = styled.button`
	min-width: 30px;
	height: 30px;
	margin-right: 7px;
	background: url('https://static.msscdn.net/ui/build/m/img/login/ic-30-show-button.svg?v=20220720164756')
		no-repeat 50% 50% !important;
`;

export const LoginButton = styled.div`
	margin-top: 20px;
	padding-bottom: 0;
	position: static;
	right: 0;
	bottom: 0;
	left: 0;
	max-width: 355px;

	& .login-button__item {
		background-color: #000;
		color: #fff;
	}
`;

export const LoginMember = styled.div`
	position: relative;
	height: 21px;
	padding: 16px 0 4px;
`;

export const LoginCheck = styled.div`
	display: inline-flex;
	position: relative;
	color: #000;
	align-items: center;

	& > input {
		overflow: hidden;
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		clip: rect(0 0 0 0);
	}
	& > label {
		display: inline-flex;
		position: relative;
		width: auto;
		min-height: 20px;
		padding: 0 0 0 26px;
		font-size: 14px;
		color: inherit;
		text-align: left;
		white-space: normal;
		align-items: center;
		cursor: pointer;

		&::before {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 20px;
			height: 20px;
			border: 1px solid #ccc;
			border-radius: 100%;
			background-color: #f1f1f1;
			content: '';
		}
	}

	& > div {
		display: none;
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		box-sizing: border-box;
		width: auto;
		height: auto;
		padding: 8px 8px 6px;
		border-radius: 4px;
		background: #0078ff;
		opacity: 0;
		font-weight: 400;
		font-size: 11px;
		font-family: '-apple-system', 'Apple SD Gothic Neo', Roboto, 'Noto Sans KR', helvetica, Gulim,
			sans-serif;
		line-height: 1.5;
		color: #fff;
		text-align: left;
		white-space: nowrap;
		transform: translate3d(0, -8px, 0);
		-webkit-animation: ${tooltipOutSlide} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
			${fadeOut} 0.3s ease forwards;
		animation: ${tooltipOutSlide} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
			${fadeOut} 0.3s ease forwards;
		align-items: flex-start;
		justify-content: space-between;

		&::before {
			position: absolute;
			top: -3px;
			left: 7px;
			width: 6px;
			height: 6px;
			background: #0078ff;
			transform: rotate(45deg) translateZ(0);
			content: '';
		}
	}

	& > div.active {
		display: inline-flex;
		-webkit-animation: ${tooltipInSlide} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
			${fadeIn} 0.3s ease forwards;
		animation: ${tooltipInSlide} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
			${fadeIn} 0.3s ease forwards;
	}
`;

export const FindLogin = styled.ul`
	position: absolute;
	top: 16px;
	right: 0;

	& li {
		display: inline-block;
		position: relative;
		padding-left: 15px;
		font-size: 14px;
		line-height: 21px;
		color: #aaa;

		&:last-child::before {
			display: block;
			position: absolute;
			top: 3px;
			left: 5px;
			width: 1px;
			height: 14px;
			background-color: #d8d8d8;
			content: '';
		}
	}

	& a {
		font-size: 14px;
		line-height: 21px;
	}
`;

export const KakaoLogIn = styled.a`
	&.login-button__item.login-button__item--kakao {
		height: 45px;
		padding-top: 11px;
		padding-bottom: 10px;
		border-color: #fee500;
		background-color: #fee500;
		font-size: 15px;
		line-height: 22px;
		cursor: pointer;
	}

	& svg {
		display: inline-block;
		margin-top: -5px;
		margin-right: 0px;
		vertical-align: top;
	}
`;

export const SignupLink = styled.div`
	margin-top: 40px;
	padding-right: 15px;
	padding-left: 15px;
	color: #0078ff;
	text-align: center;

	& a {
		display: inline-block;
		box-sizing: border-box;
		padding: 3px 8px;
		border: 1px solid #0078ff;
		border-radius: 4px;
		font-size: 14px;
		line-height: 21px;
		cursor: pointer;
	}
`;
