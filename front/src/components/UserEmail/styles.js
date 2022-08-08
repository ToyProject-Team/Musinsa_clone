import styled from '@emotion/styled';

/* Styled */
export const LoginContainer = styled.div`
	margin-top: 8px;

	& > div {
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
`;
