import styled from "@emotion/styled";


export const OrderTable = styled.table`
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    th{
        height: 52px;
        border-bottom: 1px solid #000000;
        font-size: 16px;
        vertical-align: middle;
        font-weight: normal;
    }
    td{
        position: relative;
        height: 70px;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #f5f5f5;
        text-align: center;
        vertical-align: middle;
        word-break: break-all;
        &:first-of-type{
            text-align: left;
        }
}
`;

export const ImgSpan = styled.span`
    float: left;
    margin-right: 10px;
`;