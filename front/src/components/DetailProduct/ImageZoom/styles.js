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
	opacity: ${props => (props.show ? 0 : 1)};
	visibility: ${props => (props.show ? 'hidden' : 'visible')};
	cursor: none;

	img: {
		width: '100%';
	}
`;

export const ProductImgZoomContainer = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 200%;
	height: 100%;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transition: ${props => (props.show ? '0s' : '0.5s')};
	z-index: 100;
	overflow: hidden;
	cursor: none;
`;

export const ProductImgZoom = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: ${props => (props.show ? '200%' : '0px')};
	height: ${props => (props.show ? '100%' : '0px')};
	animation: ${props => (props.show ? ZoomIn : ZoomOut)} 0.3s ease-in;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transition: 0.3s;
	transition-delay: '${props => (props.show ? '0' : '0.2s')}';
	overflow: hidden;

	& > img {
		position: absolute;
		width: 100%;
		height: 200%;
	}
`;

export const Cursor = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 25px;
	height: 25px;
	/* background-color: rgba(255, 255, 255, 0.5); */
	background-color: red;
	z-index: 999;

	&::before {
		content: '${props => (props.show ? '-' : '+')}';
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: 900;
		font-size: 30px;
		color: #828282;
	}
`;
