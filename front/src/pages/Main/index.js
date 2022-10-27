import React, { useState, useEffect, useMemo } from 'react';
import {
    ScrollContainer,
    MainContainer,
    Category,
    CategoryTitle,
    MiddleCategory,
    OtherCategory,
    CategoryName,
    ItemSection,
    Items,
    SelectBox,
    SortBox,
    ListBox,
    PaginationWapper,
} from './styles';

import { useNavigate, useLocation } from 'react-router-dom';
import { PostQueryApi } from 'utils/api';
import loadable from '@loadable/component';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';
import Footer from 'layouts/Footer';
import DialLog from 'layouts/DialLog';
import Pagination from 'react-js-pagination';
import { URLquery } from 'utils/URLquery';
import { Oval } from 'react-loader-spinner';
import { useMainState, useMainDispatch, ALL } from 'context/MainContext';
import { CATEGORY, MAINSORT, PRICE, TITLE, ALLTITLE } from 'context/MainContext';

const Main = () => {
    const navigate = useNavigate();

    const state = useMainState();
    const dispatch = useMainDispatch();

    const ShowList = loadable(() => import('components/ProductList'), {
        fallback: (
            <div className="loading">
                <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
            </div>
        ),
    });

    //데이터 저장할 state(원본 담을 state/조건추가시 필터된 데이터 담을 state)
    const [product, setProduct] = useState([]);

    //쿼리스트링 활용
    const location = useLocation();
    const query = URLquery(location);

    //가격 배열
    const priceArr = [
        '~ 50,000원',
        '50,000원 ~ 100,000원',
        '100,000원 ~ 200,000원',
        '200,000원 ~ 300,000원',
        '300,000원 ~',
    ];

    //MainSort 배열
    const mainSortArr = ['낮은 가격순', '높은 가격순', '후기순'];

    //smallCateId 삭제 함수(중분류 - 전체)
    const onReset = () => {
        const payload = {
            bigCategoryId: state.bigCategoryId,
            smallCategoryId: 0,
        };
        dispatch({ type: CATEGORY, payload });

        const newArr = clickCate;
        if (newArr.includes(true)) {
            newArr[clickCate.indexOf(true)] = false;
        }
        setClickCate(newArr);

        const secondArr = clickSideBar;
        if (secondArr.includes(true)) {
            secondArr[clickSideBar.indexOf(true)] = false;
        }
        setClickSideBar(newArr);
    };

    //Price 삭제 함수(가격 - 전체보기)
    const onResetPrice = () => {
        const payload = {
            price: 0,
            priceMin: 0,
            priceMax: 0,
        };
        dispatch({ type: PRICE, payload });

        const newArr = clickPrice;
        if (newArr.includes(true)) {
            newArr[clickPrice.indexOf(true)] = false;
        }
        setClickPrice(newArr);
    };

    //priceMin, Max 삭제함수
    const onResetPriceRange = () => {
        const payload = {
            price: 0,
            priceMin: 0,
            priceMax: 0,
        };
        dispatch({ type: PRICE, payload });

        setMinPriceInput('');
        setMaxPriceInput('');
    };

    //mainSort 삭제함수
    const onResetMainSort = () => {
        const payload = {
            mainSort: 0,
        };
        dispatch({ type: MAINSORT, payload });

        setClickMainSort(clickMainSort.fill(false));
    };

    //클릭한 요소 style변경
    const [clickCate, setClickCate] = useState([]);
    const [clickSideBar, setClickSideBar] = useState([]);

    const [clickPrice, setClickPrice] = useState(
        Array.from({
            length: 5,
        }).fill(false),
    );

    const [clickMainSort, setClickMainSort] = useState(
        Array.from({
            length: 3,
        }).fill(false),
    );

    const makeQS = () => {
        let result = '?';
        let count = 0;
        const titleKey = Object.keys(state)[6];
        const titleValue = Object.values(state)[6];

        for (let [key, value] of Object.entries(state)) {
            if (value > 0) {
                if (++count > 1) result += `&`;
                result += `${key}=${value}`;
            }
        }
        let finalResult = result;
        if (state.productTitle !== '' && state.productTitle !== undefined) {
            finalResult += `&${titleKey}=${titleValue}`;
        }

        return finalResult;
    };

    const clickBold = () => {
        const newArr = clickCate;
        if (newArr.includes(true)) newArr[clickCate.indexOf(true)] = false;

        newArr[state.smallCategoryId ? state.smallCategoryId : 0] = true;

        setClickCate(() => newArr);
    };

    const clickBoldPrice = () => {
        const newArr = clickPrice;
        if (newArr.includes(true)) newArr[clickPrice.indexOf(true)] = false;
        newArr[state.price - 1] = true;
        setClickPrice(newArr);
    };

    const clickBoldMainSort = () => {
        const newArr = clickMainSort;
        if (newArr.includes(true)) newArr[clickMainSort.indexOf(true)] = false;
        newArr[state.mainSort - 1] = true;
        setClickMainSort(newArr);
    };

    useEffect(() => {
        const result = makeQS();

        if (result == '?' && Object.keys(query).length === 0) {
            PostQueryApi(`/api/product/productList`).then(res => setProduct(res.data.productData));
            navigate('/');
        }
        if (result == '?' && Object.keys(query).length > 0) {
            PostQueryApi(`/api/product/productList/${location.search}`).then(res =>
                setProduct(res.data.productData),
            );
        } else {
            PostQueryApi(`/api/product/productList${result}`).then(res =>
                setProduct(res.data.productData),
            );
            navigate(`${result}`);
        }

        clickBold();
        clickBoldPrice();
        clickBoldMainSort();
    }, [state]);

    useEffect(() => {
        setMinPriceInput('');
        setMaxPriceInput('');
        setPage(1);
    }, [state.bigCategoryId]);

    useEffect(() => {
        setPage(1);
    }, [state.smallCategoryId]);

    //smallCategoryId추가(중분류)
    const onSort = val => {
        if (val > 0) {
            if (state.bigCategoryId > 0) {
                const payload = {
                    bigCategoryId: state.bigCategoryId,
                    smallCategoryId: val,
                };
                dispatch({ type: CATEGORY, payload });
            } else {
                const payload = {
                    bigCategoryId: 1,
                    smallCategoryId: val,
                };
                dispatch({ type: CATEGORY, payload });
                clickBold();
            }
        } else {
            onReset();
        }
    };

    //price추가
    const onFilterPrice = val => {
        setMinPriceInput('');
        setMaxPriceInput('');
        const payload = {
            price: val,
            priceMin: 0,
            priceMax: 0,
        };
        dispatch({ type: PRICE, payload });

        clickBoldPrice();
    };

    //pricaRange 추가
    const onFilterPriceRange = (val1, val2) => {
        const payload = {
            price: 0,
            priceMin: val1,
            priceMax: val2,
        };
        dispatch({ type: PRICE, payload });

        const newArr = clickPrice;
        if (newArr.includes(true)) newArr[clickPrice.indexOf(true)] = false;
        setClickPrice(newArr);
    };

    //mainSort 추가
    const onMainSort = val => {
        const payload = {
            mainSort: val,
        };
        dispatch({ type: MAINSORT, payload });

        clickBoldMainSort();
    };

    //검색창 input들 state
    const [searchInput, setSearchInput] = useState('');
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    //select박스 상태
    const [search, setSearch] = useState(false);

    //검색창 함수
    const onSearch = () => {
        setSearch(true);

        const payload = {
            productTitle: searchTerm,
        };
        dispatch({ type: TITLE, payload });
    };

    //검색창 select박스 reset
    const onResetSearch = () => {
        setSearch(false);

        //payload = { productTitle : ''}은 적용이 안됨
        const payload = {
            bigCategoryId: state.bigCategoryId,
            smallCategoryId: state.smallCategoryId,
            mainSort: state.mainSort,
            price: state.price,
            priceMin: state.priceMin,
            priceMax: state.priceMax,
            productTitle: '',
        };
        dispatch({ type: ALL, payload });
        setSearchTerm('');
    };

    // //페이지네이션 관련
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(75);
    const handlePageChange = page => {
        setPage(page); //페이지바뀔때마다
    };

    const length = product.length;

    return (
        <>
            <DialLog />
            <Header setSearch={setSearch} />
            <ScrollContainer>
                <Sidebar clickSideBar={clickSideBar} setClickSideBar={setClickSideBar} />
                <MainContainer>
                    {/* 카테고리 */}
                    <Category>
                        <CategoryTitle>
                            <div
                                className="page_title"
                                onClick={() => {
                                    const payload = {
                                        bigCategoryId: state.bigCategoryId,
                                        smallCategoryId: 0,
                                        mainSort: 0,
                                        price: 0,
                                        priceMin: 0,
                                        priceMax: 0,
                                        productTitle: '',
                                    };
                                    dispatch({ type: ALL, payload });
                                }}
                            >
                                {state.bigCategoryId
                                    ? bigCategory[state.bigCategoryId - 1]
                                    : bigCategory[0]}
                            </div>
                            <div className="hash_tag">
                                #
                                {state.bigCategoryId
                                    ? bigCategory[state.bigCategoryId - 1]
                                    : bigCategory[0]}
                            </div>
                            <div className="hash_tag">
                                #
                                {state.bigCategoryId
                                    ? alpabet[state.bigCategoryId - 1]
                                    : alpabet[0]}
                            </div>
                            <div className="hash_tag">
                                #
                                {state.bigCategoryId
                                    ? smallCategory[state.bigCategoryId - 1][
                                          Math.floor(
                                              Math.random() *
                                                  smallCategory[state.bigCategoryId - 1].length,
                                          )
                                      ]
                                    : smallCategory[0][1]}
                            </div>
                        </CategoryTitle>
                        <MiddleCategory>
                            <CategoryName>
                                <div>중분류</div>
                                <div>
                                    <form>
                                        <input
                                            type="text"
                                            title="검색"
                                            onChange={e => {
                                                setSearchInput(e.target.value);
                                            }}
                                            value={undefined || searchInput}
                                        ></input>
                                        <img src="https://image.msscdn.net/skin/musinsa/images/search_grey_14.gif"></img>
                                    </form>
                                </div>
                            </CategoryName>
                            <div className="all_item_list">
                                <ul>
                                    {smallCategory[
                                        state.bigCategoryId ? state.bigCategoryId - 1 : 0
                                    ]
                                        .filter(val => {
                                            if (searchInput === '') return val;
                                            else if (val.includes(searchInput)) return val;
                                        })
                                        .map((data, idx) => (
                                            <li
                                                className={clickCate[idx] ? 'active' : 'inactive'}
                                                onClick={() => onSort(idx)}
                                                key={idx}
                                            >
                                                {data}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </MiddleCategory>
                        <OtherCategory>
                            <CategoryName>가격</CategoryName>
                            <div className="price">
                                <ul>
                                    <li
                                        onClick={() => {
                                            onResetPrice();
                                        }}
                                        style={{
                                            minWidth: '100px',
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        전체보기
                                    </li>
                                    <li
                                        className={clickPrice[0] ? 'active' : 'inactive'}
                                        onClick={() => onFilterPrice(1)}
                                    >
                                        ~ 50,000원
                                    </li>
                                    <li
                                        className={clickPrice[1] ? 'active' : 'inactive'}
                                        onClick={() => onFilterPrice(2)}
                                    >
                                        50,000원 ~ 100,000원
                                    </li>
                                    <li
                                        className={clickPrice[2] ? 'active' : 'inactive'}
                                        onClick={() => onFilterPrice(3)}
                                    >
                                        100,000원 ~ 200,000원
                                    </li>
                                    <li
                                        className={clickPrice[3] ? 'active' : 'inactive'}
                                        onClick={() => onFilterPrice(4)}
                                    >
                                        200,000원 ~ 300,000원
                                    </li>
                                    <li
                                        className={clickPrice[4] ? 'active' : 'inactive'}
                                        onClick={() => onFilterPrice(5)}
                                    >
                                        300,000원 ~
                                    </li>
                                    <li style={{ width: '248px' }}>
                                        <input
                                            className="minPrice"
                                            type="text"
                                            onChange={e => {
                                                setMinPriceInput(e.target.value);
                                            }}
                                            value={undefined || minPriceInput}
                                        ></input>
                                        <span>원 ~</span>
                                        <input
                                            className="maxPrice"
                                            type="text"
                                            onChange={e => setMaxPriceInput(e.target.value)}
                                            value={undefined || maxPriceInput}
                                        ></input>
                                        <span>원</span>
                                        <span
                                            type="submit"
                                            className="search_btn"
                                            onClick={() => {
                                                onFilterPriceRange(minPriceInput, maxPriceInput);
                                            }}
                                        >
                                            검색
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </OtherCategory>
                        <OtherCategory>
                            <CategoryName>검색</CategoryName>
                            <div className="search_items">
                                <input
                                    type="text"
                                    id="search_items"
                                    value={undefined || searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                <span
                                    type="submit"
                                    className="search_btn"
                                    onClick={() => onSearch()}
                                >
                                    검색
                                </span>
                            </div>
                        </OtherCategory>
                    </Category>
                    <ItemSection>
                        <SelectBox>
                            <div
                                className={state.smallCategoryId ? 'visible' : 'invisible'}
                                onClick={() => {
                                    onReset();
                                }}
                            >
                                <span className="select-medium">
                                    중분류:{' '}
                                    {
                                        smallCategory[
                                            state.bigCategoryId ? state.bigCategoryId - 1 : 0
                                        ][state.smallCategoryId]
                                    }
                                </span>
                                <span className="select-medium-button">&#160;X</span>
                            </div>
                            <div
                                className={state.price ? 'visible' : 'invisible'}
                                onClick={() => {
                                    onResetPrice();
                                }}
                            >
                                <span className="select-medium">
                                    가격: {priceArr[state.price - 1]}
                                </span>
                                <span className="select-medium-button">&#160;X</span>
                            </div>
                            {/* 최소, 최대가격 */}
                            <div
                                className={
                                    state.priceMin || state.priceMax ? 'visible' : 'invisible'
                                }
                                onClick={() => {
                                    onResetPriceRange();
                                }}
                            >
                                <span className="select-medium">
                                    가격: {state.priceMin ? `${state.priceMin}원 ` : null}
                                </span>
                                <span className="select-medium">~</span>
                                <span className="select-medium">
                                    {state.priceMax ? ` ${state.priceMax}원` : null}
                                </span>
                                <span className="select-medium-button">&#160;X</span>
                            </div>
                            <div
                                className={search ? 'visible' : 'invisible'}
                                onClick={() => {
                                    onResetSearch();
                                }}
                            >
                                <span className="select-medium">
                                    검색: {searchTerm || state.productTitle}
                                </span>
                                <span className="select-medium-button">&#160;X</span>
                            </div>
                            <div
                                className={state.mainSort ? 'visible' : 'invisible'}
                                onClick={() => {
                                    onResetMainSort();
                                }}
                            >
                                <span className="select-medium">
                                    정렬: {mainSortArr[state.mainSort - 1]}
                                </span>
                                <span className="select-medium-button">&#160;X</span>
                            </div>
                        </SelectBox>
                        <Items>
                            <SortBox>
                                <div>
                                    {mainSortArr.map((data, idx) => {
                                        return (
                                            <span
                                                className={
                                                    clickMainSort[idx] ? 'activeSort' : 'sort'
                                                }
                                                onClick={() => onMainSort(idx + 1)}
                                                key={idx}
                                            >
                                                {data}
                                            </span>
                                        );
                                    })}
                                </div>
                                <PaginationWapper>
                                    <Pagination
                                        activePage={page}
                                        itemsCountPerPage={items}
                                        totalItemsCount={length}
                                        pageRangeDisplayed={10}
                                        onChange={handlePageChange}
                                    />
                                </PaginationWapper>
                            </SortBox>
                            <ListBox>
                                <ShowList
                                    product={product}
                                    items={items}
                                    page={page}
                                    clickSideBar={clickSideBar}
                                />
                            </ListBox>
                        </Items>
                    </ItemSection>
                    <Footer></Footer>
                </MainContainer>
            </ScrollContainer>
        </>
    );
};

export default Main;
