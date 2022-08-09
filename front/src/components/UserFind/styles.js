import styled from '@emotion/styled';

/* Styled */
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
