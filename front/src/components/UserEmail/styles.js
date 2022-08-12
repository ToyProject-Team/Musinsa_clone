import styled from '@emotion/styled';

/* Styled */
export const LoginContainer = styled.div`
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
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
		height: 50px;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	& > div:focus-within {
		border-color: #aaa !important;
		transition: border 0.2s ease-in-out;
	}

	& input {
		height: 48px;
		border: none;
		flex: 0 1 auto;
	}

	& input:focus-visible {
		outline: none;
	}

	& button {
		display: flex;
		margin-right: 7px;
		padding: 5px;
		flex: 0 0 auto;
	}

	& p {
		margin-top: 8px;
		font-size: 11px;
		line-height: 16.5px;
		color: red;
	}
`;
