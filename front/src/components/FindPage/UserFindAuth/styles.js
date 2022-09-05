import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const roundAll = keyframes`
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const Container = styled.div`
	input {
		border: 0;
		font-family: inherit;
		color: #000;
		vertical-align: middle;
		outline: 0;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	button {
		border: 0;
		font-size: inherit;
		font-family: inherit;
		line-height: 1.5;
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	svg.loading {
		margin-top: 1px;
		vertical-align: top;
		animation: ${roundAll} 1s infinite linear;
	}
`;

export const RadioItem = styled.div`
	margin-top: 30px;

	input[type='radio'] {
		overflow: hidden;
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		clip: rect(0 0 0 0);
	}

	.radio-label {
		padding-left: 28px;
		display: inline-flex;
		position: relative;
		width: auto;
		min-height: 20px;
		padding: 0 0 0 26px;
		font-size: 14px;
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
			display: block;
			box-sizing: border-box;
			border-radius: 100%;
			border: 1px solid #ccc;
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
				top: 10px;
				left: 5px;
				width: 10px;
				height: 10px;
				background-color: #fff;
				transform: translateY(-50%);
				display: block;
				box-sizing: border-box;
				border-radius: 100%;
			}
		}
	}
`;

export const RadioButton = styled.div`
	margin-bottom: 12px;
	display: inline-flex;
	color: #000;
	align-items: center;
`;

export const RadioDetail = styled.div`
	p {
		margin-top: 8px;
		font-size: 11px;
		line-height: 16.5px;
		color: red;
	}

	& > div:last-child {
		margin-top: 8px;
	}
`;

export const AuthInput = styled.div`
	display: flex;
	box-sizing: border-box;
	height: 50px;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	justify-content: space-between;
	align-items: center;

	&.danger {
		border-color: red !important;
	}

	input {
		height: 48px;
		border: none;
		flex: 0 1 auto;
		appearance: none;
		border-radius: 4px;
		background-color: #fff;
		font-size: 15px;
		color: #000;
		box-shadow: 0 0 0 30px #fff inset !important;
		transition: border 0.2s ease-in-out;
		padding: 0 12px;
		box-sizing: border-box;
		width: 100%;
	}
	&:focus-within {
		border-color: #aaa;
		transition: border 0.2s ease-in-out;
	}

	.authBtn {
		display: inline-block;
		box-sizing: border-box;
		margin-right: 11px;
		padding: 2.5px 8px;
		border-radius: 4px;
		background-color: #f3f3f3;
		font-size: 14px;
		line-height: 21px;
		color: #000;
		white-space: nowrap;
		flex: 0 0 auto;
	}
`;

export const FindIdButton = styled.div`
	position: static;
	padding-bottom: 20px;
	max-width: 355px;
	margin: 40px auto 0;
	text-align: center;

	button {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		padding: 14px 16px 15px;
		border: 1px solid #000;
		border-radius: 4px;
		font-weight: 700;
		border-color: #f3f3f3;
		background-color: #f3f3f3;
		color: #b3b3b3;
		cursor: default;

		svg.loading {
			display: inline-block;
			margin-top: 3px;
			vertical-align: top;
		}

		&.active {
			border-color: #0078ff;
			background-color: #0078ff;
			color: #fff;
			cursor: pointer;
		}
	}
`;
