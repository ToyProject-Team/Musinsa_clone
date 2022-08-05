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
	min-height: 100vh;
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

	& label.check-labal {
		display: inline-flex;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: auto;
		min-height: 20px;
		padding: 0 0 0 26px;
		font-size: 14px;
		color: inherit;
		text-align: left;
		white-space: normal;
		align-items: center;
		margin-left: auto;
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

		&.active {
			&::before {
				border-color: #0078ff;
				background-color: #0078ff;
			}

			&::after {
				content: '';
				position: absolute;
				top: 12px;
				left: 9px;
				width: 4px;
				height: 8px;
				border-right: 1px solid #fff;
				border-bottom: 1px solid #fff;
				transform: translateY(calc(-50% - 2px)) rotate(45deg);
				display: block;
				box-sizing: border-box;
			}
		}
	}
`;

export const SignupSection = styled.section`
	min-height: calc(100vh - 80px);
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
		font-weight: 700;

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

	& .select-container {
		padding: 10px;

		& select {
			border: 0;
			outline: none;
			height: 100%;
			border-radius: 5px;
			width: 100%;
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

export const SignupAddress = styled.div`
	padding: 20px 0;
	text-align: left;

	& > label {
		display: inline-block;
		margin: 16px 0 8px;
		font-weight: 700;

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

	& > table {
		width: 100%;
		font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		line-height: 1.5;
		font-size: 14px;
		border-collapse: collapse;
		table-layout: fixed;
		border-collapse: separate;
		border-spacing: 0 10px;

		& td {
			position: relative;

			& p {
				margin-top: 8px;
				font-size: 11px;
				line-height: 16.5px;
				color: red;
			}
		}

		& .n-input {
			height: 32px;
			padding: 5px 6px;
			border: 1px solid #e5e5e5;
			background-color: #ffffff;
			box-sizing: border-box;
			font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif !important;
			font-size: 14px;
			line-height: 20px;
			-webkit-transition: border 0.2s ease-in-out;
			-moz-transition: border 0.2s ease-in-out;
			-o-transition: border 0.2s ease-in-out;
			transition: border 0.2s ease-in-out;
		}

		& .size-input {
			width: 57px;
			height: 32px;
			padding: 5px 6px;
			border: 1px solid #e5e5e5;
			background-color: #ffffff;
			box-sizing: border-box;
			font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif !important;
			font-size: 14px;
			line-height: 20px;
			-webkit-transition: border 0.2s ease-in-out;
			-moz-transition: border 0.2s ease-in-out;
			-o-transition: border 0.2s ease-in-out;
			transition: border 0.2s ease-in-out;
		}

		& .address-input {
			& > :not(:last-child) {
				margin-bottom: 10px;
			}

			& > div {
				width: calc(100% - 60px);
				padding-right: 60px;
				position: relative;

				& > button {
					min-width: 60px;
					height: 32px;
					position: absolute;
					right: 0;
					top: 0;
					border: 1px solid #000000;
					background-color: #000000;
					color: #ffffff;
					box-sizing: border-box;
					padding: 2px 8px 0 8px;
					font-size: 14px;
					text-align: center;
					cursor: pointer;
				}
			}
		}

		& input:focus-visible {
			outline: none;
			border-color: #aaa !important;
			transition: border 0.2s ease-in-out;
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
