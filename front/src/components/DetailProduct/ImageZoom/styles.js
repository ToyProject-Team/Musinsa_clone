import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/* Keyframes */
const ZoomIn = keyframes`
  	0% {
		width: 0%;
		height: 0%;
	}
	100% {
		width: 200%;
		height: 100%;
	}
`;
const ZoomOut = keyframes`
  	0% {
		width: 200%;
		height: 100%;
	}
	100% {
		width: 0%;
		height: 0%;
	}
`;

export const ProductImgContainer = styled.div`
	width: 500px;
	height: 600px;
	position: relative;
`;

export const ProductImg = styled.div`
	img: {
		width: '100%';
	}
`;

export const ProductImgZoom = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	border: 3px solid red;
	width: ${props => (props.show ? '200%' : '0px')};
	height: ${props => (props.show ? '100%' : '0px')};
	animation: ${props => (props.show ? ZoomIn : ZoomOut)} 0.3s ease-in;
	opacity: ${props => (props.show ? 1 : 0)};
	transition: 0.3s;
	transition-delay: ${props => (props.show ? 0 : '0.2s')};
`;
