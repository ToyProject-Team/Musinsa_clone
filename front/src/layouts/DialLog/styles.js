import styled from '@emotion/styled';

export const Filter = styled.div`
    position: fixed;
    right: 2%;
    bottom: 100px;
    height: 260px;
    cursor: pointer;
    z-index: 9999;

    & div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 52px;
        height: 52px;
        font-size: 24px;
        color: #6e6e6e;
        border: 1px solid #ccc;
        background: white;

        & a {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        & button {
            border: none;
            background: none;
            font-size: 24px;
            color: #6e6e6e;
            cursor: pointer;
        }
    }
`;

export const Btm = styled.div`
    max-width: 1px;
    max-height: 1px;
    position: absolute;
    bottom: 0;
`;
