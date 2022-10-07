import styled from '@emotion/styled';

export const SContainer = styled.section`
    position: relative;
    float: left;

    & h1 {
        position: absolute;
        left: calc(100% + 1px);
        top: 0px;
        font-size: 33px;
        border-right: 1px solid #d3d3d3;
        border-bottom: 1px solid #d3d3d3;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .appear {
        transition: all 0.4s;
    }

    .disappear {
        width: 0px;
        transform: translateX(-270px);
        transition: all 0.4s;
    }

    .toggle {
        position: absolute;
        top: 0;
        left: 100%;
        width: 23px;
        height: 22px;
        padding: 10px;
        border-right: 1px solid #d3d3d3;
        border-bottom: 1px solid #d3d3d3;
        cursor: pointer;

        .line {
            position: absolute;
            width: calc(100% - 20px);
            height: 4px;
            background-color: #000;
            transition: 0.3s;

            &:nth-of-type(1) {
                top: 10px;
            }
            &:nth-of-type(2) {
                top: calc(50% - 2px);
            }
            &:nth-of-type(3) {
                top: calc(100% - 14px);
            }
        }
    }

    .toggle.active {
        .line {
            &:nth-of-type(1) {
                top: calc(50% - 2px);
                transform: rotate(-45deg);
            }
            &:nth-of-type(2) {
                opacity: 0;
                visibility: hidden;
            }
            &:nth-of-type(3) {
                top: calc(50% - 2px);
                transform: rotate(45deg);
            }
        }
    }
`;

export const SDiv = styled.div`
    text-align: center;
    width: 270px;

    & a {
        display: block;
        border: none;
        font-size: 16px;
        font-weight: 900;
        vertical-align: -webkit-baseline-middle;
        cursor: pointer;
        text-decoration: none;
        color: #000;
        padding: 14px 10px;
        text-align: left;

        span {
            font-size: 10px;
            padding-left: 6px;
            color: #b2b2b2;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        &:hover {
            opacity: 0.7;
        }
    }

    & nav {
        padding-left: 10px;

        & div {
            cursor: pointer;
            margin-top: -1px;

            & div {
                text-align: left;
                font-size: 14px;
                font-weight: 900;
                font-family: 'Arial', 'monospace';
                border-top: 1px solid #d3d3d3;
                padding: 14px 0;
                clear: both;

                & span:first-of-type {
                    font-size: 10px;
                    padding-left: 6px;
                    color: #b2b2b2;
                }

                & span:last-of-type {
                    float: right;
                    padding-right: 10px;
                    cursor: pointer;

                    & svg {
                        font-size: 20px;
                        transform: translate(0, -3px);
                    }

                    &:hover {
                        opacity: 0.7;
                        color: red;
                    }
                }
            }

            & ul {
                border-top: 1px solid #d3d3d3;
                padding-top: 20px;
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                max-height: 600px;
                transition: all 1s ease-in-out;

                &[aria-expanded='true'] {
                    max-height: 0px;
                    transition: all 1s cubic-bezier(0, 1, 0, 1);
                }

                & li {
                    font-size: 12px;
                    color: #666;
                    font-weight: 600;
                    width: 50%;
                    height: 26px;

                    & span {
                        color: #b2b2b2;
                    }

                    &:hover {
                        cursor: pointer;
                        color: black;
                        font-weight: 900;
                    }
                }
            }
        }
    }
`;
