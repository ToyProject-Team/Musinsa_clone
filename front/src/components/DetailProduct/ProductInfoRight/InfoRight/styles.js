/* index.js */
import styled from '@emotion/styled';

export const ProductInfo = styled.div`
	font-weight: bold;
	color: black;
	margin-left: 20px;
`;

export const InfoWrapper = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #dcdcdc;
	width: 400px;
`;

export const InfoWrapperProduct = styled.div`
	padding-bottom: 20px;
	border-bottom: 1px solid #dcdcdc;
`;

export const InfoContent = styled.p`
	font-weight: bold;
	color: black;
`;

export const InfoSplit = styled.p`
	color: darkgray;
	padding: 0px 3px 0px 3px;
`;

export const DetailInfoWrapper = styled.ul`
	font-size: 12px;

	& .line {
		color: #a9a9a9;
		text-decoration: line-through;
		text-decoration-thickness: 3px;
	}
`;

export const DetailInfo = styled.li`
	position: relative;
	display: flex;
	flex-direction: row;
	padding: 5px 0px 5px 0px;
	span {
		color: darkgray;
		padding: 0px 3px 0px 3px;
	}
`;

export const InfoTitle = styled.p`
	width: 110px;
	font-weight: 500;
`;

export const Title = styled.div`
	font-size: 20px;
`;

export const SubTitle = styled.p`
	font-weight: bold;
	font-size: 12px;
	color: #a9a9a9;
	padding-left: 6px;
	padding-top: 5px;
`;

export const TitleBox = styled.div`
	display: flex;
	padding-bottom: 15px;
	h4 {
		font-size: 20px;
	}
	p {
		font-weight: bold;
		font-size: 12px;
		color: #a9a9a9;
		padding-left: 6px;
		padding-top: 5px;
	}
`;

export const PriceContent = styled.div`
	font-size: 20px;
	cursor: pointer;
	position: static;
`;

export const PriceTitle = styled.div`
	width: 110px;
	padding-top: 5px;
	font-weight: 500;
`;

export const Price = styled.p`
	font-size: 12px;
	display: inline-block;
	padding-left: 5px;
`;

export const TextBox = styled.ul`
	& > li {
		display: inline-block;
		color: #000;
		font-size: 12px;
		font-weight: 500;
		padding: 15px;
		margin-top: 20px;
		border: 1px solid #000;
		width: 85px;
		text-align: center;

		&:first-of-type {
			color: #f00;
			border: 1px solid #f00;
			width: 185px;
			margin-right: 5px;
		}
	}
`;
