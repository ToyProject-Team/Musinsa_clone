import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {
	ProductImgContainer,
	ProductImg,
	ProductImgZoomContainer,
	ProductImgZoom,
	Cursor,
	Close,
} from './styles';

const ImageZoom = ({ img, alt }) => {
	const [show, setShow] = useState(false);
	const [mouseCursor, setMouseCursor] = useState({ x: 0, y: 0 });
	const [mousePosition, setMousePosition] = useState({
		left: 0,
		top: 0,
	});

	const onClickZoomIn = useCallback(() => {
		setShow(true);
	}, [show]);

	const onClickZoomOut = useCallback(() => {
		setShow(false);
	}, [show]);

	const onMoseMoveZoom = useCallback(e => {
		setMousePosition({
			left: -e.pageX + 20 + 'px',
			top: -e.pageY + 105 + 'px',
		});
		setMouseCursor({ x: e.pageX - 35, y: e.pageY - 120 });
	}, []);

	return (
		<ProductImgContainer>
			<ProductImg onMouseMove={onMoseMoveZoom}>
				{!show &&
					mouseCursor.x < 486 &&
					mouseCursor.y < 580 &&
					mouseCursor.x > -18 &&
					mouseCursor.y > -8 && (
						<Cursor
							onClick={onClickZoomIn}
							show={show}
							className="cursor"
							style={{ position: 'absolute', left: mouseCursor.x, top: mouseCursor.y }}
						></Cursor>
					)}
				<img src={img} alt={alt} />
			</ProductImg>

			<ProductImgZoomContainer show={show} onClick={onClickZoomOut} onMouseMove={onMoseMoveZoom}>
				<ProductImgZoom show={show}>
					<img src={img} alt={alt} style={{ left: mousePosition.left, top: mousePosition.top }} />
				</ProductImgZoom>
				{show && (
					<Cursor
						show={show}
						className="cursor"
						style={{ position: 'absolute', left: mouseCursor.x, top: mouseCursor.y }}
					></Cursor>
				)}
			</ProductImgZoomContainer>
			<Close show={show} onClick={onClickZoomOut}>
				close
			</Close>
		</ProductImgContainer>
	);
};

export default ImageZoom;
