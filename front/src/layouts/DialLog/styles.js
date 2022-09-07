import styled from '@emotion/styled';

export const Filter = styled.div`
	position: fixed;
	right: 0;
	bottom: 100px;
	height: 260px;
	cursor: pointer;

	& div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 52px;
		height: 52px;
		font-size: 24px;
		color: #6e6e6e;
		border: 1px solid #ccc;
		background: white;

		& button {
			border: none;
			background: none;
			font-size: 24px;
			color: #6e6e6e;
			cursor: pointer;
		}
	}
`;
