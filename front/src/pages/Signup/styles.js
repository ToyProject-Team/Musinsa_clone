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

	.signup-button__item {
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
	max-width: 380px;
	margin: 0 auto;
	background-color: #fff;
	padding: 40px;
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
			width: 4px;
			height: 4px;
			margin-top: 6px;
			margin-left: 5px;
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

	& > .all-check {
		display: inline-flex;
		margin-bottom: 4px;
		color: #000;
		align-items: center;
		border: 0;

		& input {
			overflow: hidden;
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			clip: rect(0 0 0 0);
		}
		& label {
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

	& > .all-check:not(:first-child) {
		margin-left: 10px;
	}

	& .auth-confirm {
		font-size: 12px;
		border-radius: 3px;
		font-weight: 600;
		background-color: #e5e5e5;
		color: #fff;
		transition: 0.2s;
		cursor: pointer;

		&:hover {
			background-color: #0078ffa1;
		}

		&.success {
			background-color: #0078ff;
		}
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

export const SignupButton = styled.div`
	position: static;
	margin-top: 40px;

	& > button.signup-button__item {
		border-color: #f3f3f3;
		background-color: #f3f3f3;
		color: #b3b3b3;
		cursor: default;

		&.active {
			border-color: #0078ff;
			background-color: #0078ff;
			color: #fff;
			cursor: pointer;
		}
	}
`;