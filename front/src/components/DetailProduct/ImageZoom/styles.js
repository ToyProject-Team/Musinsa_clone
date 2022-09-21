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
	cursor: ${props => {
		return props.show
			? `url('https://image.msscdn.net/skin/musinsa/images/img/cursor-zoomOut.png'), crosshair`
			: `url('https://image.msscdn.net/skin/musinsa/images/img/cursor-zoom.png'), crosshair`;
	}};
`;

export const ProductImg = styled.div`
	img: {
		width: '100%';
	}
`;

export const ProductImgZoomContainer = styled.div`
	position: absolute;
	left: 0;
	top: -1px;
	width: 200%;
	height: 100%;
	border: 1px solid #ddd;
	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	transition: ${props => (props.show ? '0s' : '0.5s')};
	z-index: 100;
	overflow: hidden;
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
	cursor: ${props => {
		return props.show
			? `url('https://image.msscdn.net/skin/musinsa/images/img/cursor-zoomOut.png'), crosshair`
			: `url('https://image.msscdn.net/skin/musinsa/images/img/cursor-zoom.png'), crosshair`;
	}};

	& > img {
		position: absolute;
		width: 100%;
		height: 200%;
	}
`;

export const Close = styled.div`
	position: absolute;
	top: 0;
	left: calc(200% + 1px);
	border: 3px solid red;
	z-index: 9999;
	width: 34px;
	height: 34px;
	border: 1px solid #ddd;
	display: block;
	text-indent: -9999px;
	background: url('https://static.msscdn.net/skin/musinsa/images/btn_close_pop.png') no-repeat 50%
		50%;
	cursor: pointer;

	opacity: ${props => (props.show ? 1 : 0)};
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;
