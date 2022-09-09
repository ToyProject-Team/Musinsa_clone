import styled from '@emotion/styled';

export const ProductImage = styled.div`
	margin-right: 20px;
	margin-top: 0px;
`;

export const MainImage = styled.div`
	border: 1px solid #cdcdcd;
	width: 500px;
	height: 600px;
	img {
		width: 500px;
		height: 600px;
	}
`;

export const ImageList = styled.div`
	width: 400px;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 10px;
	margin-bottom: 15px;
	padding: 16px 14px 0 19px;
	box-sizing: border-box;

	div {
		width: 60px;
		height: 72px;
		display: inline-flex;
		padding: 10px 0;

		& > img {
			display: inline-block;
			vertical-align: middle;
			width: auto;
			max-width: 100%;
			max-height: 100%;
			border: none;
			line-height: 0;
			background: transparent;
		}

		&.active {
			outline: 1px solid black;
		}
	}
`;
