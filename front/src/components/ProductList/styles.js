import styled from '@emotion/styled';

export const ListWrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(154px, auto));
    grid-template-rows: repeat(auto-fill, minmax(100px, auto));
    width: 100%;
`;

export const ListOuter = styled.li`
    font-size: 12px;
    position: relative;
    min-width: 154px;
    float: left;
    margin: 0;
    background-color: white;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;

    .hotItem {
        position: absolute;
        // width: 80px;
        color: white;
        right: 0;
        top: 8px;
        z-index: 20;
        .hot {
            background-color: #c43d3d;
            font-weight: bold;
            font-size: 12px;
            padding: 5px;
        }
        .recommend {
            /* background-color: #4162c9; */
            background-color: #92bd55;
            font-weight: bold;
            font-size: 12px;
            padding: 5px;
        }
    }

    &:hover {
        background-color: #f2f2f2;
        z-index: 1;
    }

    div {
        cursor: pointer;
        //padding-right: 10px;
    }

    .li_inner {
        border: 0;
        vertical-align: top;
        background: transparent;
        height: 280px;
        padding-top: 5px;
        margin: 15px auto 20px;
    }

    .list_img {
        position: relative;
        width: 125px;
        height: 150px;
        margin: 0 auto 10px;
        text-align: center;
        overflow: hidden;
        background-color: white;

        :hover {
            opacity: 0.5;
        }

        img {
            min-width: 120px;
            min-height: 145px;
            object-fit: cover;
        }
    }

    .item_info {
        position: relative;
        width: 125px;
        margin: 0 auto;
        //text-align: left;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
    }

    .choice {
        position: relative;
        width: 125px;
        margin: 0 auto;
        //text-align: left;
        padding-bottom: 5px;
        padding-top: 7px;
        color: grey;
    }

    .item_like {
        display: flex;
        position: relative;
        width: 125px;
        margin: 0 auto;
        //text-align: left;
        padding-bottom: 5px;
        .likes {
            padding-left: 3px;
            color: #f33;
            font-weight: bold;
        }
    }

    .item_comment {
        display: flex;
        position: relative;
        width: 125px;
        margin: 0 auto;
        //text-align: left;
        padding-bottom: 5px;
        .comments {
            padding-left: 3px;
            color: #ff923a;
            font-weight: bold;
        }
    }

    .option {
        display: block;
        float: right;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        position: relative;
        background-color: white;
        z-index: 100;

        .option_btn {
            height: 17px;
            padding: 3px 8px 0 8px;
            cursor: pointer;
        }

        .option_list {
            display: block;
            position: relative;

            ul {
                right: -1;
                position: absolute;
                width: 100%;
                color: #000;
                background: #fff;
                border: 1px solid #ddd;
            }

            .open {
                display: flex;
                justify-content: space-between;
                color: #000;
                background: #fff;
                padding: 6px 10px 6px 10px;
                z-index: 100;
            }
            .close {
                display: none;
            }
        }
    }
`;
