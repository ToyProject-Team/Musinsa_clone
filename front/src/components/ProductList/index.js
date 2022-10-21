import React, { useState, useMemo, useEffect } from 'react';
import { ListOuter, ListWrapper } from './styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';

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
                            <div className="hotItem">
                                {data.likes > 700 ? <span className="hot">인기 상품</span> : null}
                                {data.likes < 701 && data.comments > 8000 ? (
                                    <span className="recommend">무신사 추천</span>
                                ) : null}
                            </div>
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
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                                paddingBottom: '3px',
                                                fontSize: '13px',
                                            }}
                                        >
                                            {data.productTitle}
                                        </p>
                                        <p>{data.productPrice.toLocaleString('ko-KR')}원</p>
                                    </div>
                                    <div className="choice">Members' Choice</div>
                                    <div className="item_like">
                                        <p style={{ color: 'red' }}>❤</p>
                                        <p className="likes">{data.likes}</p>
                                    </div>
                                    <div className="item_comment">
                                        {data.comments < 100 ? null : data.comments < 2000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                            </p>
                                        ) : data.comments < 4000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        ) : data.comments < 8000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        ) : data.comments < 10000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        ) : (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        )}
                                        <p className="comments">{data.comments}</p>
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
