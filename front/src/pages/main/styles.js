import styled from '@emotion/styled';

export const MainSection = styled.div`
  height: 100vh;
  font-size: 12px;
  
`; 

export const Category = styled.div`
  display: block;
`;

export const PageTitle = styled.div`
  display: flex;
  border-bottom: solid 1px;
  border-color: rgb(212, 212, 212);
  padding: 10px 10px 10px 10px;
  hover: rgb(212, 212, 212);

  .page_title {
    float: left;
    padding-right: 20px;
    font-size: 24px;
  }

  .hash_tag {
    display: inline-block;
    height: 28px;
    line-height: 31px;
    margin-right: 1px;
    margin-bottom: 5px;
    padding: 0 10px 0 9px;
    font-size: 12px;
    text-align: center;
    color: #b2b2b2;
    border: 1px solid #ddd;
  }

`;

export const Division = styled.div`
  display: flex;
  border-bottom: solid 1px;
  border-color: rgb(212, 212, 212);
  padding: 10px 10px 10px 10px;
  hover: rgb(212, 212, 212);

  .all_item {
    width: 100px;
    padding-right: 16px;
    font-weight: bold;
  }

  div {
    width: 100%;
  }

  .search_items {
    line-height: 12px;
    border-left: 1px solid #ddd;

    input{
      width: 130px;
      height: 19px;
      margin: 0;
      padding: 2px 5px px;
      vertical-align: middle;
      border: 1px solid #ddd;
      background: #fff;
    }

    .search_btn {
      width: 40px;
      height: 19px;
      padding: 2px 5px 2px;
      margin: 0;
      text-align: center;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
    }
  }
`;

export const BrandCategory = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;


export const BrandGroup = styled.div`
  width: 100px;
  padding-right: 16px;
  font-weight: bold;
`;


export const Name = styled.p`
  width: 100px;
  font-weight: bold;
`;

// Item List
export const ItemList = styled.div`

  padding: 10px;
`;


export const SelectBox = styled.div`
  
  display: inline-block;
  vertical-align: center;
  margin-right: 5px;
  margin-bottom: 15px;
  margin-bottom: 15px;
  background: #fff;
  border: 1px solid #ddd;
  color: #b2b2b2;
  padding: 10px 10px 10px 10px;

  .select-medium-button {
    color: red;
    font-weight: bold;
  }

`;

export const Items = styled.div`
  border-right: 1px solid #ddd;
`;

export const SortBox = styled.div`
  padding-left: 15px;
  padding-bottom: 10px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

  .sort::after {
    content: '|';
    padding-left: 10px;
    padding-right: 10px;
  }

  .sort:hover {
    cursor: pointer;
    font-weight: bold;
    text-decoration:underline;
    color: black;
  }
`;

export const ListBox = styled.div`
width: 100%;
height: auto;
line-height: 14px;
clear: both;
border-top: 1px solid #ddd;
border-left: 1px solid #ddd;
border-bottom: 1px solid #ddd;

`;
