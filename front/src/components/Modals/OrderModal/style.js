import styled from '@emotion/styled';

export const Price = styled.div`
	margin-top: 20px;
	font-size: 20px;
	line-height: 1.5;
	font-weight: 500;

	& > strong {
		font-weight: 900;
	}
`;

export const Address = styled.div`
	padding-top: 40px;
	padding-bottom: 20px;
	text-align: left;

	& > label {
		display: inline-block;
		margin: 16px 0 8px;
		font-weight: 700;

		& > b {
			padding-left: 5px;
			color: #aaa;
			font-size: 12px;
		}
	}

	& > table {
		width: 100%;
		font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
		line-height: 1.5;
		font-size: 14px;
		table-layout: fixed;
		border-spacing: 0 10px;
		margin-top: 10px;
		font-size: 12px;

		tr {
			border: 1px solid #ddd;
			border-collapse: collapse;
		}

		& th {
			padding: 10px 10px 0 10px;
			font-weight: 700;
		}

		& td {
			position: relative;
			padding: 10px;

			& p {
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

export const RadioContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	margin-bottom: 40px;
`;
