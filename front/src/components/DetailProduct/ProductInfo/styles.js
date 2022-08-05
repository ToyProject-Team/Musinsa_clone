import styled from '@emotion/styled';

export const InfoWrapper = styled.div`
	width: 963;
	border-top: 1px solid #cdcdcd;
	padding-top: 20px;
`;

export const TitleBox = styled.div`
	display: flex;
	padding-bottom: 15px;
	h4 {
		padding-left: 20px;
		font-size: 20px;
	}
	p {
		font-weight: bold;
		font-size: 12px;
		color: #a9a9a9;
		padding-left: 6px;
		padding-top: 5px;
		padding-right: 520px;
	}
	div {
		font-size: 12px;
		font-weight: bold;
		color: #a9a9a9;
		float: right;
		padding: 5px;
	}
`;

export const ImageInfo = styled.div`
	margin: 20px;

	overflow: hidden;
	img {
	}
`;

export const Button = styled.button`
	color: #0078ff;
	background: #fff;
	border: 1px solid #0078ff;
	padding: 25px 180px 25px 180px;
	font-size: 20px;
	font-weight: bold;
	margin-left: 270px;
	cursor: pointer;
`;

export const MoreInfo = styled.div`
	position: relative;
	width: 960px;
	padding: 0 0 40px;
	text-align: center;
	display: block;
	width: 100%;
	height: 100px;
	margin-top: -120px;
	background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
`;
