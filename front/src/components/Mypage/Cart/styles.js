import styled from '@emotion/styled';
import Modal from 'components/Modals/Modal';

export const OrderTable = styled.table`
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    border-collapse: collapse;
    table-layout: fixed;
    border-top: 1px solid #000000;
    th {
        height: 52px;
        border-bottom: 1px solid #000000;
        font-size: 16px;
        vertical-align: middle;
        font-weight: bold;

        &.modal {
            height: auto;
            border-bottom: 0;
            font-size: 12px;
            vertical-align: baseline;
        }
    }
    .cart_cont {
        position: relative;
        height: 70px;
        box-sizing: border-box;
        border-bottom: 1px solid #f5f5f5;
        text-align: center;
        vertical-align: middle;
        word-break: break-all;

        table {
            border-top: 0;
            width: 100%;
            line-height: 1.5;
            font-size: 14px;
            border-collapse: collapse;
            table-layout: fixed;
            td {
                position: relative;
                height: 70px;
                padding: 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #f5f5f5;
                text-align: center;
                vertical-align: middle;
                word-break: break-all;
                strong {
                    font-weight: bold;
                }
                &:first-of-type {
                    cursor: pointer;
                }
            }
        }
    }

    .input_amount {
        display: inline-block;
        position: relative;
        button {
            display: block;
            border: 0;
            background: #eee;
            padding: 5px;
            position: relative;
            float: left;
            cursor: pointer;
            svg {
                width: 22px;
                height: 22px;
                font-size: 22px;
                vertical-align: middle;
                line-height: 1;
            }
        }
        input[type='text'] {
            width: 30px;
            height: 28px;
            border: 1px solid #eee;
            text-align: center;
            font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif !important;
            color: #000000;
            float: left;
            vertical-align: middle;
            text-indent: 0;
        }
    }
    .btn {
        float: left;
        display: block;
        width: 90px;
        min-width: 90px;
        margin: 4px auto;
        border: 1px solid #000000;
        background-color: #000000;
        height: 32px;
        line-height: 30px;
        color: #ffffff;
        box-sizing: border-box;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        transition: border 0.2s, background 0.2s ease-in-out;
        text-decoration: none;
    }
    .del_btn {
        position: absolute;
        top: 52%;
        left: 110px;
        transform: translateY(-50%) scale(2);
        padding: 3px;
        border: none;
        background: 0;
        color: #ccc;
        outline: none;
        cursor: pointer;
    }

    .top {
        vertical-align: top;
        div {
            margin: 10px 0;
            display: table;
            table-layout: fixed;
            width: 100%;
            min-height: 96px;
            font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            line-height: 1.5;
            font-size: 14px;
            text-align: left;
            position: relative;
            ul {
                width: 100%;
                display: table-cell;
                padding-left: 10px;
                vertical-align: middle;
            }
        }
    }
`;

export const CartPayment = styled.ul`
    padding: 43px 0 23px;
    text-align: center;
    li {
        display: inline-block;
        margin: 0 14px;
        line-height: 30px;
        p {
            display: inline-block;
            margin-right: 12px;
            font-size: 18px;
            color: #777;
            span {
                font-weight: bold;
                color: #000;
            }
        }
        svg {
            display: inline-block;
            width: 30px !important;
            height: 30px !important;
            line-height: 28px;
            margin-left: -1px;
            font-size: 18px !important;
            vertical-align: middle;
            overflow: hidden;
            color: #777;
        }
    }
`;

export const OrderBtn = styled.div`
    padding-top: 30px;
    padding-bottom: 10px;
    min-height: 32px;
    text-align: center;
    clear: both;
    position: relative;
    & > button {
        margin: 0 1px;
        border: 1px solid #000000;
        background-color: #000000;
        min-width: 290px;
        height: 60px;
        line-height: 54px;
        padding-top: 4px;
        font-size: 20px;
        display: inline-block;
        color: #ffffff;
        box-sizing: border-box;
        padding: 2px 8px 0 8px;
        text-align: center;
        cursor: pointer;
        vertical-align: middle;
    }
`;

export const ImgSpan = styled.span`
    display: table-cell;
    width: 80px;
    padding-top: 96px;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    &.soldout {
        &::after {
            content: 'sold out';
            position: absolute;
            top: 25%;
            left: 20px;
            width: 40px;
            font-size: 17px;
            font-weight: bold;
            text-align: center;
        }
        img {
            opacity: 0.2;
        }
    }
`;

// 결제하기 modal
export const ModalStyle = styled(Modal)`
    overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.75);
    }
    content {
        position: absolute;
        width: 445px;
        height: 700px;
        position: absolute;
        top: 90px;
        left: 30%;
        right: 40px;
        bottom: 40px;
    }
`;
