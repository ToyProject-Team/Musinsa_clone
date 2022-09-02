import styled from '@emotion/styled';


export const HContainer = styled.div`
    min-width: 1560px;
    border-bottom: 1px solid #dddddd;
`;

export const HDiv = styled.div`
    min-width: 1560px;
    min-height: 32px;
    height: auto;
    width: 100%;
    padding: 23px 0 23px 0;
    background-color: black;
    display: flex;
`;

export const HLogo = styled.h1`
    width: 140px;
    height: 23px;
    background: url(https://static.msscdn.net/skin/musinsa/images/logo_nsl_20211229.png?20200204) 0 0 no-repeat;
    background-size: auto 100%;
    text-indent: -9999px;
    margin-left: 20px;
    margin-top: 4px;
    cursor: pointer;
`;

export const HSearch = styled.div`
    margin-left: 20px;
    
    & div{
        width: 260px;
        & form{
            position: relative;
            bakcground-color: white;
            border: 1px solid #373737;
            
            & input:first-of-type{
                width: 258px;
                height: 30px;
                line-height: 32px;
                border: 1px solid #373737;
            }

            & label{
                overflow: hidden;
                position: absolute;
                width: 1px;
                height: 1px;
            }

            & input:last-of-type{
                width: 210px;
                border: none;
                background-color: white;
                height: 30px;
                line-height: 32px;
            }

            & span:first-of-type{
                padding: 5px 10px 0 0;
                position: absolute;
                right: 16%;
                cursor: pointer;
                & svg{
                    width: 24px;
                    height: 24px;
                }
            }

            & span:last-of-type{
                padding: 5px 10px 0 0;
                position: absolute;
                right: 0;
                cursor: pointer;
                & svg{
                    width: 24px;
                    height: 24px;
                    color: white;
                }
            }
        }
        
    }
`;




















