import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/* Keyframes */
const upDown = keyframes`
  	0% {
    	top: 47%;
	}
	30% {
		top: 53%
	}
	50%, 100% {
		top: 47%;
	}
`;

export const InfoWrapper = styled.div`
	width: 1000px;
	border-top: 1px solid #cdcdcd;
	padding-top: 20px;
	position: relative;
`;

export const ButtonWrapper = styled.div``;

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
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 50px;
	margin: 20px;
	height: ${props => (!props.clicked ? '500px' : '')};
	overflow: ${props => (!props.clicked ? 'hidden' : '')};
	img {
		width: 100%;
	}
`;

export const ImagagaInfo = styled.div`
	position: relative;
	margin: 20px;
`;

export const Button = styled.button`
	position: relative;
	color: #0078ff;
	background: #fff;
	border: 1px solid #0078ff;
	padding: 25px 180px 25px 180px;
	font-size: 20px;
	font-weight: bold;
	margin-left: 260px;
	cursor: pointer;
	z-index: 1;

	& > svg {
		position: absolute;
		top: 50%;
		transform: translateY(-50%) scale(1.5);
		margin-left: 5px;
		animation: ${upDown} 0.9s ease-in-out infinite;
	}
`;

export const MoreInfo = styled.div`
	position: relative;
	bottom: 40px;
	width: 963px;
	padding: 0 0 40px;
	text-align: center;
	display: block;
	width: 100%;
	height: 100px;
	margin-top: -120px;
	background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
`;
