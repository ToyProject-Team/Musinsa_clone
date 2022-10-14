import styled from '@emotion/styled';

export const FContainer = styled.footer`
    padding-top: 20px;
    border-top: 2px solid rgba(0, 0, 0, 0.2);
    margin-top: 300px;
`;

export const FDiv = styled.div`
    & div {
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        overflow: hidden;
        padding: 20px;
        line-height: 18px;

        & ul {
            display: flex;
            gap: 40px;

            & li {
                width: 60px;
                height: 60px;
                text-align: center;

                & a {
                    vertical-align: text-top;
                    text-decoration: none;
                    line-height: 0;
                    display: block;
                    float: left;
                    width: 60px;
                    height: 60px;
                    margin-right: 15px;
                    text-indent: -9999px;
                    background: url('https://static.msscdn.net/skin/musinsa/images/footer_sns.png?20190903')
                        no-repeat;
                }
            }

            & li:first-of-type {
                & a {
                    background-position: 0 0;
                }
            }
            & li:nth-of-type(2) {
                & a {
                    background-position: -78px 0;
                }
            }
            & li:nth-of-type(3) {
                & a {
                    background-position: -156px 0;
                }
            }
            & li:nth-of-type(4) {
                & a {
                    background-position: -234px 0;
                }
            }
            & li:nth-of-type(5) {
                & a {
                    background-position: -312px 0;
                }
            }

            & li:nth-of-type(6) {
                & a {
                    background-position: -390px 0;
                }
            }
            & li:nth-of-type(7) {
                & a {
                    background-position: -468px 0;
                }
            }
            & li:last-of-type {
                & a {
                    background-position: -546px 0;
                }
            }
        }
        @keyframes gradient {
            0% {
                background-position: 0 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0 50%;
            }
        }
    }
`;

export const FTitle = styled.p`
    ${'' /* font-family: "MusinsaRegualr", "sans-serif"; */}
    font-family: "Arial", "sans-serif";
    color: black;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 1em;
    line-height: 2em;
    & .subTitle {
        font-size: 18px;
    }

    & span {
        font-size: 12px;
        font-weight: Black;
        display: block;
    }
`;

export const FDescription = styled.p`
    ${'' /* font-family: 'Apple SD Gothi', 'sans-serif'; */}
    font-family: 'Arial', 'sans-serif';
    color: #b2b2b2;
    font-weight: 600;
    padding-bottom: 14px;

    & a {
        color: black;
        font-weight: Black;
        cursor: pointer;

        &:hover {
            color: gray;
            transition: all 0.5s;
        }
    }
`;

export const FBttom = styled.p`
    background-color: black;
    color: white;
    font-size: 1em;
    line-height: 36px;
    padding-left: 20px;
    font-weight: 600;

    & span {
        color: #b2b2b2;
    }
`;
