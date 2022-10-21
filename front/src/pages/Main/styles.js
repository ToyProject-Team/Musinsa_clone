import styled from '@emotion/styled';

export const ScrollContainer = styled.div`
    display: flex;
    min-height: 100vh;
    // position: sticky;
    border-top: 1px solid #ddd;
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    min-height: 100vh;
    border-left: 1px solid #ddd;
`;

// 카테고리
export const Category = styled.div`
    display: block;
`;

// 선택된 페이지
export const CategoryTitle = styled.div`
    display: flex;
    flex-shrink: 0;
    border-bottom: solid 1px;
    border-color: rgb(212, 212, 212);
    padding: 4px 10px 5px 45px;

    .page_title {
        float: left;
        text-justify: center;
        padding: 6px 20px 0;
        font-size: 24px;

        :hover {
            cursor: pointer;
        }
    }

    .hash_tag {
        display: inline-block;
        min-width: 45px;
        // height: 28px;
        line-height: 31px;
        margin-right: 1px;
        padding: 0 10px 0 9px;
        font-size: 12px;
        text-align: center;
        color: #b2b2b2;
        border: 1px solid #ddd;
    }

    .hash_tag:hover {
        font-weight: bold;
        color: #09f;
        border-color: #09f;
        cursor: pointer;
    }
`;

// 중분류
export const MiddleCategory = styled.div`
    display: flex;
    border-bottom: solid 1px;
    border-color: rgb(212, 212, 212);
    padding-left: 15px;

    & div {
        width: 100%;
    }

    & input {
        margin-top: 10px;
    }

    &:hover {
        background-color: #f2f2f2;
        z-index: 1;
    }

    .all_item {
        // min-width: 100px;
        max-width: 100px;
        padding-top: 15px;
        // padding-right: 12px;
        font-weight: bold;
        color: #b2b2b2;
    }

    .all_item:hover {
        font-weight: bold;
        color: black;
        text-decoration: underline;
        cursor: pointer;
    }

    .all_item_list {
        padding-top: 15px;

        & ul {
            display: inline-block;
            // max-width: 800px;

            li:first-of-type {
                color: black;
                font-weight: bold;
            }

            .inactive {
                float: left;
                width: 145px;
                padding: 0 0 15px;
                margin: 0;
                color: #b2b2b2;
            }

            .active {
                float: left;
                width: 145px;
                padding: 0 0 15px;
                margin: 0;
                color: black;
                font-weight: bold;
            }
        }

        & li:hover {
            text-decoration: underline;
            color: black;
            cursor: pointer;
        }
    }
`;

// 그외 카테고리(색상,가격, 검색)
export const OtherCategory = styled.div`
    display: flex;
    // flex-shrink: 0;
    border-bottom: solid 1px;
    border-color: rgb(212, 212, 212);
    padding-left: 15px;
    line-height: 20px;

    &:hover {
        background-color: #f2f2f2;
        z-index: 1;
    }

    .price {
        padding-top: 15px;
        padding-bottom: 15px;

        & ul {
            display: flex;
            // min-width: 1200px;

            li {
                line-height: 20px;
            }

            .inactive {
                float: left;
                flex-shrink: 0;
                vertical-align: center;
                // width: 145px;
                padding-right: 17px;
                margin: 0;
                color: #b2b2b2;

                input {
                    padding: 5px 7px 4px 4px;
                }
            }

            .active {
                float: left;
                flex-shrink: 0;
                vertical-align: center;
                // width: 120px;
                padding-right: 17px;
                margin: 0;
                color: black;
                font-weight: bold;

                input {
                    padding: 5px 7px 4px 4px;
                }
            }

            & li:last-child {
                text-decoration: none;
                flex-shrink: 0;

                input {
                    width: 57px;
                    border: 1px solid #ddd;
                    background: #fff;
                }

                span {
                    vertical-align: middle;
                    padding: 0 4px;
                }

                .search_btn {
                    display: inline-block;
                    font-weight: bold;
                    line-height: 15px;
                    padding: 3px 4px 2px 4px;
                    margin: -3px 0 0 4px;
                    border: 1px solid #ddd;
                    background: #fff;
                    cursor: pointer;
                }
            }
        }

        & li:hover {
            text-decoration: underline;
            color: black;
            cursor: pointer;
        }
    }

    .search_items {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        padding-top: 15px;
        padding-bottom: 15px;

        // border-left: 1px solid #ddd;

        input {
            width: 130px;
            height: 20px;
            /* margin: 0;
            padding: 2px; */
            vertical-align: middle;
            border: 1px solid #ddd;
            background: #fff;
        }

        .search_btn {
            display: inline-block;
            font-weight: bold;
            height: 20px;
            padding: 1px 4px 1px 4px;
            margin-left: 10px;
            /* margin: -3px 0 0 4px; */
            border: 1px solid #ddd;
            background: #fff;
            cursor: pointer;
        }
    }
`;

export const CategoryName = styled.div`
    display: block;
    padding-top: 15px;
    padding-bottom: 10px;
    min-width: 100px;
    max-width: 100px;
    font-weight: bold;

    & div:last-child {
        width: 80px;
        position: relative;

        input {
            width: 70px;
            padding: 2px 2px 2px 2px;
            background: #fff;
            border: 1px solid #ddd;
        }

        img {
            position: absolute;
            top: 14px;
            right: 10px;
        }
    }
`;

// Item List
export const ItemSection = styled.div`
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    // -webkit-box-sizing: border-box;

    &:hover {
        background-color: #f2f2f2;
        z-index: 1;
    }
`;

export const SelectBox = styled.div`
    .visible {
        display: inline-block;
        vertical-align: center;
        margin-right: 5px;
        margin-bottom: 15px;
        margin-bottom: 15px;
        background: #fff;
        border: 1px solid #ddd;
        color: #b2b2b2;
        padding: 10px 10px 10px 10px;
    }

    .invisible {
        display: none;
    }

    :hover {
        cursor: pointer;
    }

    .select-medium-button {
        color: red;
        font-weight: bold;
    }
`;

export const Items = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-height: 100vh;
    //border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;

export const SortBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-bottom: 10px;

    line-height: 42px;
    border: 1px solid #ddd;
    width: 100%;
    height: 42px;
    -webkit-box-sizing: border-box;
    background-color: white;

    .activeSort {
        display: block;
        line-height: 40px;
        height: 40px;
        float: left;
        font-weight: bold;
        text-decoration: underline;
        padding-right: 10px;

        &::after {
            content: '|';
            padding-left: 10px;
        }

        &:last-child::after {
            content: '';
            padding-left: 10px;
        }

        &:hover {
            cursor: pointer;
            font-weight: bold;
            text-decoration: underline;
            color: black;
        }
    }

    .sort {
        display: block;
        line-height: 40px;
        height: 40px;
        float: left;
        // padding-left: 5px;
        color: gray;
        padding-right: 10px;

        &::after {
            content: '|';
            padding-left: 10px;
        }

        &:last-child::after {
            content: '';
            padding-left: 10px;
        }

        &:hover {
            cursor: pointer;
            font-weight: bold;
            text-decoration: underline;
            color: black;
        }
    }
`;

export const PaginationWapper = styled.div`
    text-align: center;

    .pagination {
        display: flex;
        // position: relative;
        // top: -41px;
        height: 40px;
        justify-content: flex-end;

        li {
            display: inline-block;
            width: 30px;
            justify-content: center;
            align-items: center;
            // padding-top: 12px;
            border-left: 1px solid #ddd;
            font-size: 1rem;
            &:hover {
                background-color: #f2f2f2;
            }
            a {
                text-decoration: none;
                color: gray;
                font-size: 1rem;
                font-weight: bold;
            }
        }
        .active {
            padding: 0;
            a {
                color: black;
            }
        }
    }
`;

export const ListBox = styled.div`
    width: 100%;
    -webkit-box-sizing: border-box;
`;
