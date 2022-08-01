import React from 'react';
import { MainSection, Category, Division, Name, Col, ItemList, Items, SelectBox, SortBox, ListBox } from './styles';

const Main = () => {
	return (
      <MainSection>
      {/* 카테고리 */}
      <Category>
        <Division>
          <Name>품목명</Name>
          <span>#노트북</span>
        </Division>
      
        <Division>
          <Name>중분류</Name>
          <table>
            <tr>
              <Col>
                <p>전체</p>
              </Col>
              <td>
                <ul>
                  <li>백팩</li>
                  <li>메신저백</li>
                  <li>등등</li>
                </ul>
              </td>
            </tr>
          </table>
        </Division>

        <Division>
          <Name>
            <span>브랜드</span>
            <span>
              <input type="text" title="브랜드 검색" style={{width: "65px"}}></input>
            </span>
          </Name>
          <table>
            <tr>
              <Col>
                <div>
                  <p>좋아요</p>
                </div>
              </Col>
              <td>
                <div>
                  등록된 관심브랜드가 없습니다. / 좋아요 브랜드 추가
                </div>
              </td>
              </tr>

            <tr>
              <Col>
                <p>인기</p>
              </Col>
              <td>
                <div>
                  <ul style={{}}>
                    <li>..상품들</li>
                    <li>..상품들</li>
                    <li>..상품들</li>
                  </ul>
                </div>
              </td>
              </tr>

              <tr>
                <Col>
                  <div>
                    <p>단독</p>
                    <button>+</button>
                  </div>
                  <div>
                    <p>상품수 | </p>
                    <p>가나다</p>
                  </div>    
                </Col>
                <td>
                  <div>
                    <ul>
                      <li>..상품들</li>
                    </ul>
                  </div>
                </td>
              </tr>

              <tr>
                <Col>
                  <div>
                    <p>전체</p>
                    <button>+</button>
                  </div>
                  <div>
                    <p>상품수 | </p>
                    <p>가나다</p>
                  </div>    
                </Col>
                <td>
                  <div>
                    <ul>
                      <li>..상품들</li>
                    </ul>
                  </div>
                </td>
              </tr>
          </table>
        </Division>

        <Division>
          <Name>색상</Name>
          <table>
            <tr>
              <td>
                <ul>
                  <li>..색상들</li>
                </ul>
              </td>
            </tr>
          </table>
        </Division>

        <Division>
        <Name>가격</Name>
          <table>
            <tr>
              <td>
                <ul>
                  <li>..가격</li>
                </ul>
              </td>
            </tr>
          </table>
        </Division>

        <Division>
          <Name>검색</Name>
          <table>
            <tr>
              <td>
                <input type="text" id="search_items"/>
                <button>검색</button>
              </td>
            </tr>
          </table>
        </Division>
        </Category>

      {/* Item List - 컴포넌트로 따로 빼기 */}
      <ItemList>
        <SelectBox>
          <span>중분류: 백팩</span>
        </SelectBox>
        <Items>
          <SortBox>
            <span>무신사 추천순 |</span>
            <span>신상품(재입고)순 |</span>
            <span>낮은 가격순 |</span>
            <span>높은 가격순 |</span>
            <span>할인율순 |</span>
            <span>후기순 |</span>
            <span>판매순</span>
          </SortBox>
          <ListBox>
            상품정보 가져오기
          </ListBox>
        </Items>
      </ItemList>
      </MainSection>
  )
};

export default Main;