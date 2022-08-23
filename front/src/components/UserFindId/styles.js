import styled from '@emotion/styled';

export const Container = styled.div`
	input {
		border: 0;
		border-radius: 0;
		font-family: inherit;
		color: #000;
		vertical-align: middle;
		outline: 0;
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

	label {
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

export const RadioDetail = styled.div``;
