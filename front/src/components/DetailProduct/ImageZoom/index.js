import { useGlobalState } from 'context/GlobalContext';
import Cookies from 'js-cookie';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {
    ProductImgContainer,
    ProductImg,
    ProductImgZoomContainer,
    ProductImgZoom,
    Close,
} from './styles';

const ImageZoom = ({ img, alt }) => {
    const [sideBar, setSidebar] = useState(Cookies.get('sideBarToggle') === 'false' ? false : true);
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

    const onMoseMoveZoom = useCallback(
        e => {
            if (sideBar) {
                // 사이드바 활성화 시
                setMousePosition({
                    left: -e.pageX + 290 + 'px',
                    top: -e.pageY + 210 + 'px',
                });
            } else {
                // 사이드바 비활성화 시
                setMousePosition({
                    left: -e.pageX + 20 + 'px',
                    top: -e.pageY + 210 + 'px',
                });
            }
            setMouseCursor({ x: e.pageX - 35, y: e.pageY - 20 });
        },
        [sideBar],
    );

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    return (
        <ProductImgContainer>
            <ProductImg show={show} onMouseMove={onMoseMoveZoom} onClick={onClickZoomIn}>
                <img
                    src={
                        img +
                        getParametersForUnsplash({
                            width: 500,
                            height: 600,
                            quality: 80,
                            format: 'jpg',
                        })
                    }
                    alt={alt}
                />
            </ProductImg>

            <ProductImgZoomContainer
                show={show}
                onClick={onClickZoomOut}
                onMouseMove={onMoseMoveZoom}
            >
                <ProductImgZoom show={show}>
                    <img
                        src={
                            img +
                            getParametersForUnsplash({
                                width: 2000,
                                height: 1200,
                                quality: 80,
                                format: 'jpg',
                            })
                        }
                        alt={alt}
                        style={{ left: mousePosition.left, top: mousePosition.top }}
                    />
                </ProductImgZoom>
            </ProductImgZoomContainer>
            <Close show={show} onClick={onClickZoomOut}>
                close
            </Close>
        </ProductImgContainer>
    );
};

export default ImageZoom;
