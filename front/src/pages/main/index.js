import React from 'react';
import { MainContainer, Category, PageTitle, BrandCategory, Category2nd, CategoryBrand, CategoryEtc, BrandGroup, Name, ItemSection, Items, SelectBox, SortBox, ListBox } from './styles';

const Main = () => {
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
              <li>백팩</li>
              <li>메신저백</li>
              <li>등등</li><li>백팩</li>
              <li>메신저백</li>
              <li>등등</li>
              <li>백팩</li>
              <li>메신저백</li>
              <li>등등</li>
              <li>백팩</li>
            </ul>
          </div>
        </Category2nd>

        <CategoryBrand>
          <Name>
            <div>브랜드</div>
            <div>
              <input type="text" title="브랜드 검색" style={{width: "65px"}}></input>
            </div>
          </Name>
          <div>
            <BrandCategory style={{paddingBottom: "15px"}}>
              <BrandGroup>좋아요</BrandGroup>
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
                <li>백팩</li>
              <li>메신저백</li>
              <li>등등</li><li>백팩</li>
              <li>메신저백</li>
              <li>등등</li>
              <li>백팩</li>
              <li>메신저백</li>
              <li>등등</li>
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
        <SelectBox>
          <span className='select-medium'>중분류: 백팩</span>
          <span className='select-medium-button'>&#160;X</span>
        </SelectBox>
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
              <li>
                <div className='li_inner'>
                  <div className='list_img'>이미지 주소</div>
                  <div className='item_info'>
                    <p>노스페이스</p>
                    <p>NM2DN51A_빅샷</p>
                    <p>135,000원</p>
                    <p>MEMBERSHIP PRICE</p>
                    <p>...</p>
                  </div>
                </div>
                <div className='option'>
                    <span>M</span>
                    <span className='option_btn'>OPTION ▼</span>
                </div>
              </li>
              <li>
                <div className='li_inner'>
                  <div className='list_img'>이미지 주소</div>
                  <div className='item_info'>
                    <p>노스페이스</p>
                    <p>NM2DN51A_빅샷</p>
                    <p>135,000원</p>
                    <p>MEMBERSHIP PRICE</p>
                    <p>...</p>
                  </div>
                </div>
                <div className='option'>
                    <span>M</span>
                    <span className='option_btn'>OPTION ▼</span>
                </div>
              </li>
              <li>
                <div className='li_inner'>
                  <div className='list_img'>이미지 주소</div>
                  <div className='item_info'>
                    <p>노스페이스</p>
                    <p>NM2DN51A_빅샷</p>
                    <p>135,000원</p>
                    <p>MEMBERSHIP PRICE</p>
                    <p>...</p>
                  </div>
                </div>
              </li>
            </ul>
          </ListBox>
        </Items>
      </ItemSection>
      </MainContainer>
  )
};

export default Main;