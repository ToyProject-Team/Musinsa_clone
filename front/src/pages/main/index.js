import React from 'react';
import { MainSection, Category, Division, PageTitle, BrandCategory, BrandGroup, Name, ItemList, Items, SelectBox, SortBox, ListBox} from './styles';

const Main = () => {
	return (
      <MainSection>
      {/* 카테고리 */}
      <Category>
        <PageTitle>
          <div className='page_title'>Bag</div>
          <div className='hash_tag'>#노트북</div>
          <div className='hash_tag'>#캐주얼</div>
        </PageTitle>
      
        <Division>
          <Name>중분류</Name>
          <div className='all_item'>전체</div>
          <div className='hash_tag'>
            <ul>
              <li>백팩</li>
              <li>메신저백</li>
              <li>등등</li>
            </ul>
          </div>
        </Division>

        <Division>
          <Name>
            <span>브랜드</span>
            <span>
              <input type="text" title="브랜드 검색" style={{width: "65px"}}></input>
            </span>
          </Name>
          <div>
            <BrandCategory>
              <BrandGroup>좋아요</BrandGroup>
              <div className='hash_tag'>
              등록된 관심브랜드가 없습니다. / 좋아요 브랜드 추가
              </div>
            </BrandCategory>

            <BrandCategory>
              <BrandGroup>인기</BrandGroup>
              <div className='hash_tag'>
                <ul>
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
                  <p>가나다</p>
                </div>
              </BrandGroup>
              <div className='hash_tag'>
                <ul>
                  <li>..상품들</li>
                  <li>..상품들</li>
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
                  <p>가나다</p>
                </div>
              </BrandGroup>
              <div className='hash_tag'>
                <ul>
                  <li>..상품들</li>
                  <li>..상품들</li>
                </ul>
              </div>
            </BrandCategory>
          </div>
        </Division>

        <Division>
          <Name>색상</Name>
          <div className='hash_tag'>
            <ul>
              <li>..빨강</li>
              <li>..파랑</li>
            </ul>
          </div>
        </Division>

        <Division>
        <Name>가격</Name>
        <div className='hash_tag'>
          <ul>
            <li>전체보기</li>
            <li>..빨강</li>
            <li>..파랑</li>
          </ul>
        </div>
        </Division>

        <Division>
          <Name>검색</Name>
          <div className='search_items'>
            <input type="text" id="search_items"/>
            <span type='submit' className='search_btn'>검색</span>
          </div>
        </Division>
        </Category>

      {/* Item List - 컴포넌트로 따로 빼기 */}
      <ItemList>
        <SelectBox>
          <span className='select-medium'>중분류: 백팩</span>
          <span className='select-medium-button'>X</span>
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
              </li>
            </ul>
          </ListBox>
        </Items>
      </ItemList>
      </MainSection>
  )
};

export default Main;