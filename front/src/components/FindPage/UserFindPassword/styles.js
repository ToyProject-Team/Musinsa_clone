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
	h3 {
		padding-bottom: 24px;
		font-weight: 400;
		font-size: 18px;
		line-height: 27px;
	}
	p {
		margin: -6px 0 24px;

		strong {
			font-weight: bold;
		}
	}

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

	.danger-text {
		margin-top: 10px;
		font-size: 11px;
		color: red;
	}
	.danger-border {
		border: 1px solid red;

		&:focus-within {
			border: 1px solid red !important;
		}
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

export const FindPasswordButton = styled.div`
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
