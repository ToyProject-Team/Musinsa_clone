import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/* Keyframes */
const boxShadow = keyframes`
  25%, 50%, 75% {
	box-shadow: 0 0 0px 0px #0078ff;
	border: 0;
  }
  15%, 35%, 65%, 100% {
	border: 1px solid #0078ff;
    box-shadow: 0 0 3px 1px #0078ff;
  }
`;
const boxShadow_delay = keyframes`
  0% {
	border: 1px solid #0078ff;
    box-shadow: 0 0 3px 1px #0078ff;
  }
  100% {
	box-shadow: 0 0 0px 0px #0078ff;
	border: 0;
	visibility: hidden;
  }
`;

const tooltip = keyframes`
  25%, 75% {
    transform: translate3d(0, -8px, 0);
  }
  0%, 50%, 100% {
    transform: translate3d(0,0,0);
  }
`;

const tooltip2 = keyframes`
  25%, 75% {
    transform: rotate(45deg) translateZ(0) translate3d(-6px,-6px,0);
  }
  0%, 50%, 100% {
    transform: rotate(45deg) translateZ(0) translate3d(0,0,0);
  }
`;

const tooltip_delay = keyframes`
  0% {
    opacity: 1;
  }
  100% {
	opacity: 0;
	visibility: hidden;
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

	.readonly-input {
		background-color: #d1d1d1 !important;
	}
	.radius-left {
		border-radius: 4px 0 0 4px;
	}
	.btn-hover {
		transition: 0.3s;

		&:hover {
			background-color: #0078ff;
			border: 1px solid #0078ff;
		}
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

export const Header = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	position: relative;
	justify-content: center;
	font-size: 16px;
	font-weight: 600;

	& > div {
		display: flex;
		align-items: center;
		top: 5px;
		left: 5px;

		& > div {
			position: absolute;
			left: 0;
		}

		button {
			display: inline-flex;
			width: 40px;
			height: 40px;
			position: relative;
			padding: 5px;
			box-sizing: border-box;
			border: 0;
			background: 0 0;
			font-size: inherit;
			font-family: inherit;
			line-height: 1.5;
			cursor: pointer;

			span {
				display: none;
			}
		}
	}
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
		position: relative;
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

		& label:nth-of-type(2) {
			margin-left: 10px;
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
		z-index: 10;
		cursor: pointer;

		&:hover {
			background-color: #0078ffa1;
		}

		&.success {
			background-color: #0078ff;
			pointer-events: none;
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
	}

	& > .check {
		display: flex;
		margin-left: 3px;
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

			& > svg {
				padding-right: 12px;
			}
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

export const KakaoKeyframes = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 1px solid #0078ff;
	border-radius: 5px;
	box-shadow: 0 0 3px 1px #0078ff;
	-webkit-animation: ${boxShadow} 1.5s ease-in-out forwards,
		${boxShadow_delay} 1s 3s ease-in-out forwards;

	&::before {
		content: '본인인증을 진행해주시길 바랍니다.';
		position: absolute;
		bottom: 110%;
		right: -15%;
		background-color: #0078ff;
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		transform: translate3d(0, -8px, 0);
		-webkit-animation: ${tooltip} 1.5s ease forwards, ${tooltip_delay} 1s 3s ease-in-out forwards;
		z-index: 1;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 95%;
		right: 8%;
		width: 15px;
		height: 15px;
		background: #0078ff;
		transform: rotate(45deg) translateZ(0) translate3d(-6px, -6px, 0);
		-webkit-animation: ${tooltip2} 1.5s ease forwards, ${tooltip_delay} 1s 3s ease-in-out forwards;
	}
`;
