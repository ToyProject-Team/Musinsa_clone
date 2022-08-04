import styled from '@emotion/styled';

export const MainContainer = styled.div`
  height: 100vh;
  font-size: 12px;
  min-width: 100%;
  overflow: hidden;
`; 

export const Category = styled.div`
  display: block;
`;

// 선택된 페이지 
export const PageTitle = styled.div`
  display: flex;
  flex-shrink: 0;
  border-bottom: solid 1px;
  border-color: rgb(212, 212, 212);
  padding: 10px 10px 10px 15px;
  hover: rgb(212, 212, 212);

  .page_title {
    float: left;
    padding-right: 20px;
    font-size: 24px;
  }

  .hash_tag {
    display: inline-block;
    min-width: 45px;
    height: 28px;
    line-height: 31px;
    margin-right: 1px;
    padding: 0 10px 0 9px;
    font-size: 12px;
    text-align: center;
    color: #b2b2b2;
    border: 1px solid #ddd;
  }

  .hash_tag:hover {
    font-weight: bold;
    color: #09f;
    border-color: #09f;
    cursor: pointer;
  }

`;


export const Name = styled.div`
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  min-width: 100px;
  max-width: 100px;
  font-weight: bold;
`;

// 중분류
export const Category2nd = styled.div`
  display: flex;
  flex-shrink: 0;
  border-bottom: solid 1px;
  border-color: rgb(212, 212, 212);
  padding-left: 15px;
  hover: rgb(212, 212, 212);

  .all_item {
    min-width: 100px;
    padding-top: 15px;
    padding-right: 16px;
    font-weight: bold;
    color: #b2b2b2;
  }

  .all_item:hover {
    font-weight: bold;
    color: black;
    text-decoration: underline;
    cursor: pointer;
  }


  .all_item_list {
    padding-top: 15px;

    & ul {
      display: inline-block;
      min-width: 700px;
      & li {
        float: left;
        width: 100px;
        padding: 0 0 15px;
        margin: 0;
        color: #b2b2b2;
        
    } 
  }

  & li:hover {
    text-decoration: underline;
    color: black;
    cursor: pointer;
  }
`;

export const CategoryBrand = styled.div`
  display: flex;
  border-bottom: solid 1px;
  border-color: rgb(212, 212, 212);
  padding-left: 15px;
  hover: rgb(212, 212, 212);

  & div {
    width: 100%;
  }

  & input {
    margin-top: 17px;
  }
  
  
}

`;

export const CategoryEtc = styled.div`
  display: flex;
  flex-shrink: 0;
  border-bottom: solid 1px;
  border-color: rgb(212, 212, 212);
  padding-left:  15px;
  hover: rgb(212, 212, 212);

  .color, .price {
    padding-top: 15px;
    // padding-bottom: 15px;

    & ul {
      display: inline-block;
      min-width: 700px;

      & li {
        float: left;
        width: 100px;
        padding: 0 0 15px;
        margin: 0;
        color: #b2b2b2;
      }  
    } 

    & li:hover {
      text-decoration: underline;
      color: black;
      cursor: pointer;
    }
  }

  .search_items {
    padding-top: 15px;
    padding-bottom: 15px;
    // border-left: 1px solid #ddd;

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
  flex-shrink: 0;
  padding-top: 15px;
  // padding-left:10px;
  // padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  & div {
    & ul {
      display: inline-block;
      min-width: 700px;

      & li {
        float: left;
        width: 100px;
        padding: 0 0 15px;
        margin: 0;
        color: #b2b2b2;
      }  
    } 
  }

  & li:hover {
    text-decoration: underline;
    color: black;
    cursor: pointer;
  }
  }
`;


export const BrandGroup = styled.div`
  max-width:100px;
  min-width:100px;
  padding-right: 16px;
  font-weight: bold;

  div:first-of-type {
    margin-bottom: 15px;
  }

  div:last-child {
    & p:hover {
      color: black;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  & div {
    display: flex;
    min-width: 90px;

    & button {
      margin-left: 7px;
      display: flex;
      align-items:center; 
      justify-content: center;
      font-size: 15px;
      font-weight: bold;
      background-color: white;
      height: 15px;
      width: 15px;
      border: 1px solid #ddd;
    }

    & button:hover {
      cursor: pointer;
    }
  }
`;




// Item List
export const ItemSection = styled.div`
  padding: 15px;
  min-width: 1500px;
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

  :hover {
    cursor: pointer;
  }

  .select-medium-button {
    color: red;
    font-weight: bold;
  }

`;

export const Items = styled.div`
  min-width: 912px;
  background-color: #fff;
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
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    // -moz-box-sizing: border-box;
    // -webkit-box-sizing: border-box;

  .sort {
    display: block;
    line-height: 40px;
    height: 40px;
    float: left;
  }

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

  & ul {
    border-left: 1px solid #ddd;

    & li {
      position: relative;
      min-width: 154px;
      float: left;
      width: 100px;
      // padding: 0 0 15px;
      margin: 0;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
  } 

  // &ul {
  //   display: inline-block;

  // &li {
  //     position: relative;
  //     min-width: 154px;
  //     float: left;
  //     color: #b2b2b2;
  //     background: #fff;
  //     border-right: 1px solid #ddd;
  //     border-bottom: 1px solid #ddd;
  //     box-sizing: border-box;
  //   }
  // }

  .li_inner {
    border: 0;
    vertical-align: top;
    background: transparent;
    width: 154px;
    height: 335px;
    margin:0;
    // margin: 15px auto 20px;
  }

  .list_img {
    position: relative;
    width: 125px;
    margin: 0 auto 10px;
    text-align: center;
    height: 150px;
    overflow: hidden;
  }

  .item_info {
    position: relative;
    width: 125px;
    margin: 0 auto;
    text-align: left;

    &p {
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      // color: #000;
      // line-height: 16px;
      // text-overflow: ellipsis;
      // max-height: 30px;
      // overflow: hidden;
    }
}

  .option {
    display: flex;
    justify-content: space-between;
    // margin: 0 10px 0 10px;
    padding-left: 7px;
    
    .option_btn {
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      padding: 3px 8px 3px 8px;
      cursor: pointer;
    }
  }

`;
