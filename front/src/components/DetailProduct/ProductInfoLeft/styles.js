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
		object-fit: cover;
		width: 500px;
		height: 600px;
	}
`;

export const ImageList = styled.div`
	margin: 20px;
	div {
		width: 60px;
		height: 72px;
		display: inline-flex;
		margin-left: 8px;
		& :hover {
			border: 1px solid black;
		}
		object-fit: cover;
	}
`;
