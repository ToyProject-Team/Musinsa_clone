import React, { useState, useMemo, useEffect } from 'react';
import { ListOuter, ListWrapper } from './styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const ShowList = props => {
    const navigate = useNavigate();
    const location = useLocation();
    const history = createBrowserHistory();

    const goDetail = data => {
        navigate(`/detail?productId=${data.id}`);
        //localStorage.setItem('memo', location.search);
    };

    //옵션 데이터
    const [arrow, setArrow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(Array(props.product.length).fill(false));

    const clickOption = idx => {
        const newArr = selected;
        if (selected.includes(true)) {
            newArr[selected.indexOf(true)] = false;
        } else {
            newArr[idx] = true;
        }
        setSelected(newArr);
    };

    return (
        <ListWrapper>
            {props.product.length === 0 ? (
                <div style={{ fontSize: '20px', padding: '15px' }}>해당하는 상품이 없습니다.</div>
            ) : (
                props.product
                    .slice(
                        props.items * (props.page - 1),
                        props.items * (props.page - 1) + props.items,
                    )
                    .map((data, idx) => (
                        <ListOuter key={data.id}>
                            <div
                                onClick={() => {
                                    goDetail(data);
                                }}
                            >
                                <div className="li_inner">
                                    <div className="list_img">
                                        <img
                                            src={`https://musinsa-s3.s3.ap-northeast-2.amazonaws.com/image/${data.ProductImg.src}`}
                                        ></img>
                                    </div>
                                    <div className="item_info">
                                        <p>{data.productTitle}</p>
                                        <p>{data.productPrice.toLocaleString('ko-KR')}원</p>
                                        <p>MEMBERSHIP PRICE</p>
                                    </div>
                                </div>
                            </div>
                            <div className="option">
                                <p
                                    className="option_btn"
                                    onClick={() => {
                                        clickOption(idx);
                                        setArrow(!arrow);
                                        setIsOpen(!isOpen);
                                    }}
                                >
                                    {selected[idx] ? 'OPTION ▲' : 'OPTION ▼'}
                                </p>
                                <div className="option_list">
                                    <ul
                                        style={
                                            selected[idx]
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                        }
                                    >
                                        {data.ProductMainTags.map((data, idex) => (
                                            <li
                                                className={selected[idx] ? 'open' : 'close'}
                                                key={idex}
                                            >
                                                <span>{data.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ListOuter>
                    ))
            )}
        </ListWrapper>
    );
};

export default ShowList;
