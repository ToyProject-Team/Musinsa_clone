import styled from '@emotion/styled';


export const FContainer = styled.footer`
    padding-top: 20px;
    border-top: 2px solid rgba(0,0,0,0.2);
    margin-top: 20px;
`;

export const FDiv = styled.div`
    & div{
        border-bottom: 2px solid rgba(0,0,0,0.2);
        overflow: hidden;
        padding: 20px;
        line-height: 18px;
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
    & p{
        font-size: 18px;
    }

    & span{
        font-size: 12px;
        font-weight: Black;
    }
`;

export const FDescription = styled.p`
    ${'' /* font-family: 'Apple SD Gothi', 'sans-serif'; */}
    font-family: 'Arial', 'sans-serif';
    color: #B2B2B2;
    font-weight: 600;
    padding-bottom: 14px;

    & a{
        color: black;
        font-weight: Black;
        cursor: pointer;

        &:hover{
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

    & span{
        color: #B2B2B2;
    }
`;


export const SNS = styled.a`
    display: block;
    width: 606px;
    height: 60px;
    padding-bottom: 20px;
    cursor: pointer;
    background: url(https://static.msscdn.net/skin/musinsa/images/footer_sns.png?20190903) no-repeat;
`; 