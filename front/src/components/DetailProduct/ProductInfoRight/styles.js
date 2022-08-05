import styled from '@emotion/styled';

/* index.js */
export const ProductInfo = styled.div`
	width: 900;
	height: 100vh;
	/* InfoWrapper {
		&not(:first-child) {
			padding-top: 0px !important;
		}
	} */

	font-weight: 900;
	color: black;
	width: auto;
	margin-left: 20px;
`;

export const InfoWrapper = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #dcdcdc;
`;

export const InfoWrapperProduct = styled.div`
	padding-bottom: 20px;
	border-bottom: 1px solid #dcdcdc;
`;

export const InfoContent = styled.p`
	font-weight: 900;
	color: black;
`;

export const InfoSplit = styled.p`
	color: darkgray;
	padding: 0px 3px 0px 3px;
`;

export const InfoTitle = styled.p`
	width: 110px;
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
	display: flex;
	flex-direction: row;
	padding: 5px 0px 5px 0px;
	span {
		color: darkgray;
		padding: 0px 3px 0px 3px;
	}
	p {
		width: 110px;
	}
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
	& h4 {
		font-size: 20px;
	}
	& p {
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
`;

/* PurchaseForm.js */

export const Purchase = styled.div``;

export const ProductOption = styled.div``;

export const PurchaseForm = styled.div``;
