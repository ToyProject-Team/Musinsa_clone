import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { ProductImgContainer, ProductImg, ProductImgZoom } from './styles';

const ImageZoom = ({ img, alt }) => {
	const [show, setShow] = useState(false);

	const onClickZoomIn = useCallback(
		e => {
			console.log('in', e.target);
			setShow(true);
		},
		[show],
	);

	const onClickZoomOut = useCallback(
		e => {
			console.log('out', e.target);
			setShow(false);
		},
		[show],
	);

	return (
		<ProductImgContainer>
			<ProductImg onClick={onClickZoomIn}>
				<img src={img} alt={alt} />
			</ProductImg>

			<ProductImgZoom show={show} onClick={onClickZoomOut}>
				hello
			</ProductImgZoom>
		</ProductImgContainer>
	);
};

export default ImageZoom;
