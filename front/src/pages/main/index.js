import React, { useState } from 'react';
import { MainContainer, Category, PageTitle, BrandCategory, Category2nd, CategoryBrand, CategoryEtc, BrandGroup, Name, ItemSection, Items, SelectBox, SortBox, ListBox } from './styles';
import Data from './data.json';
// import axios from 'axios';

const Main = () => {
  const [dummyData, setDummyData] = useState(Data);
  const [selectBox, setSelectBox] = useState(true);
  const [button, setButton] = useState(true);

  // axios.get('./data.json')
  //   .then((res) => {
  //     setDummyData(res.data)
  //   })
  //   .catch((err) =>{
  //     console.log(err);
  //   })   

	return (
      <MainContainer>
      {/* 카테고리 */}
      <Category>
        <PageTitle>
          <div className='page_title'>Bag</div>
          <div className='hash_tag'>#노트북</div>
          <div className='hash_tag'>#캐주얼</div>
        </PageTitle>
      
        <Category2nd>
          <Name>중분류</Name>
          <div className='all_item'>전체</div>
          <div className='all_item_list'>
            <ul>
              {
                dummyData.map(data => {
                  return <li key={data.id}>
                    {data.item}
                  </li>
                })
              }
            </ul>
          </div>
        </Category2nd>

        <CategoryBrand>
          <Name>
            <div>브랜드</div>
            <div>
              <input type="text" title="브랜드 검색" style={{width: "65px"}}></input>
              <img src='https://image.msscdn.net/skin/musinsa/images/search_grey_14.gif'></img>
            </div>
          </Name>
          <div>
            <BrandCategory style={{paddingBottom: "10px"}}>
              <BrandGroup style={{"display" : "flex", "alignItems": "center"}}>
              <img src='https://image.msscdn.net/skin/musinsa/images/icon_like_small_on.png?20171024'></img>
              <span>좋아요</span>
              </BrandGroup>
              <div style={{minWidth: "600px"}}>
              등록된 관심브랜드가 없습니다.
              </div>
            </BrandCategory>

            <BrandCategory>
              <BrandGroup>인기</BrandGroup>
              <div>
                <ul>
                  <li>..상품들</li>
                  <li>..상품들</li>
                  <li>..상품들</li>
                  <li>..상품들</li>
                  <li>..상품들</li>
                  <li>..상품들</li>

                </ul>
              </div>
            </BrandCategory>

            <BrandCategory>
              <BrandGroup>
                <div>
                  <p>단독</p>
                  <button>+</button>
                </div>
                <div>
                  <p>상품수 | </p>
                  <p>&#160;가나다</p>
                </div>
              </BrandGroup>
              <div>
                <ul>
                  {
                  dummyData.map(data => {
                    return <li key={data.id}>
                      {data.brandName}
                    </li>
                  })
                  }
                </ul>
              </div>
            </BrandCategory>

            <BrandCategory>
              <BrandGroup>
                <div>
                  <p>전체</p>
                  <button>+</button>
                </div>
                <div>
                  <p>상품수 | </p>
                  <p>&#160;가나다</p>
                </div>
              </BrandGroup>
              <div>
                <ul>
                  <li>..상품들</li>
                  <li>..상품들</li>
                </ul>
              </div>
            </BrandCategory>
          </div>
        </CategoryBrand>

        <CategoryEtc>
          <Name>색상</Name>
          <div className='color'>
            <ul>
              <li>..빨강</li>
              <li>..파랑</li>
            </ul>
          </div>
        </CategoryEtc>

        <CategoryEtc>
        <Name>가격</Name>
        <div className='price'>
          <ul>
            <li>전체보기</li>
            <li>..10000원</li>
            <li>..1000000원</li>
          </ul>
        </div>
        </CategoryEtc>

        <CategoryEtc>
          <Name>검색</Name>
          <div className='search_items'>
            <input type="text" id="search_items"/>
            <span type='submit' className='search_btn'>검색</span>
          </div>
        </CategoryEtc>
        </Category>

      {/* Item List - 컴포넌트로 따로 빼기 */}
      <ItemSection>
          { selectBox === true
            ?
              <SelectBox onClick={()=>{
                setSelectBox(false)
              }}>
                <span className='select-medium'>중분류: 백팩</span>
                <span className='select-medium-button'>&#160;X</span>
            </SelectBox>
            : null
          }

        <Items>
          <SortBox>
            <span className='sort'>무신사 추천순</span>
            <span className='sort'>신상품(재입고)순</span>
            <span className='sort'>낮은 가격순</span>
            <span className='sort'>높은 가격순</span>
            <span className='sort'>할인율순</span>
            <span className='sort'>후기순</span>
            <span className='sort'>판매순</span>
          </SortBox>
          <ListBox>
            <ul>
              {
                dummyData.map((data) => {
                  return(
                    <li key={data.id}>
                      <div className='li_inner'>
                        <div className='list_img'><img src={data.url}></img></div>
                        <div className='item_info'>
                          <p>{data.brandName}</p>
                          <p>{data.model}</p>
                          <p>{data.price}</p>
                          <p>MEMBERSHIP PRICE</p>
                          <p>...</p>
                        </div>
                      </div>
                      <div className='option'>
                          <span>M</span>
                          <span className='option_btn'>OPTION ▼</span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </ListBox>
        </Items>
      </ItemSection>
      </MainContainer>
  )
};

export default Main;