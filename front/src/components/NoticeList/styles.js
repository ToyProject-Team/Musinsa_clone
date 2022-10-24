import styled from '@emotion/styled';

/* Styled */
export const List = styled.div`
    .item-list {
        display: flex;
    }

    .basket {
        float: left;
        box-sizing: border-box;
        width: 26px;
        height: 26px;
        margin-right: 10px;
        border: 1px solid #eee;
        border-radius: 100%;
        text-align: center;

        & > svg {
            margin: 3px 0;
        }
    }

    & > div {
        & > ul {
            overflow: hidden;
            width: calc(100% - 30px);
            margin: 0 auto;

            & > li {
                overflow: hidden;
                padding: 10px 0;
                cursor: pointer;
            }
        }
    }

    .infomation {
        overflow: hidden;
        width: calc(100% - 36px);
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;

        & > .infomation_header {
            display: flex;
            flex-direction: column;
            align-items: self-start;
            flex: 1;

            h4 {
                margin-bottom: 2px;
                font-weight: 900;
                font-size: 14px;
                line-height: 21px;
                color: #000;
            }
            p {
                display: -webkit-box;
                overflow: hidden;
                font-size: 14px;
                line-height: 21px;
                white-space: normal;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                padding: 0;
                color: #000;
                text-align: left;
                word-break: break-all;
            }
            label {
                margin-top: 3px;
                font-size: 12px;
                line-height: 18px;
                color: #aaa;
            }
        }

        & > .infomation_image {
            overflow: hidden;
            float: right;
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 3px;
            background-color: #eee;

            & > img {
                width: 100%;
                height: 100%;
            }
        }
    }
`;
