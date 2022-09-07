import React from 'react';
import { FContainer, FDiv, FTitle, FDescription, FBttom, SNS } from './styles';

const Footer = () => {
	// 약관 모달 이벤트
	let win;
	function openPop(open) {
		if (win != null) {
			win.close();
		}

		if (open === 'Notice')
			win = window.open('footer/notice', '자세히보기', 'width=500px,height=800px,scrollbars=yes');
		else if (open === 'Declar') {
			win = window.open('footer/declar', '신고', 'width=500px,height=800px,scrollbars=yes');
		}

		win.focus();
	}

	return (
		<FContainer>
			<FDiv>
				<div>
					<a href="https://www.musinsa.com/app/" target="_blank">
						<SNS />
					</a>
				</div>

				<div>
					<FTitle>COPYRIGHT (C) MUSINSA ALL RIGHTS RESERVED.</FTitle>
					<FDescription>
						무신사닷컴 내 매거진, 스트리트스냅, 스토어 등 무신사 자체 생성 콘텐츠는 무신사닷컴 및
						무신사 계약업체에 저작권이 있습니다.
						<br />
						이러한 콘텐츠는 출처를 밝히고(무신사닷컴 표기 및 www.musinsa.com 링크 포함 필수)
						비상업적인 용도에서만 활용하실 수 있습니다.{' '}
						<a target="_blank" onClick={() => openPop('Notice')}>
							자세히보기
						</a>
					</FDescription>
					<FDescription>
						커뮤니티 및 중고장터, 댓글 등 무신사 회원이 올린 이미지가 저작권에 위배될 경우{' '}
						<a target="_blank" onClick={() => openPop('Declar')}>
							신고
						</a>{' '}
						하시면 검토 후 삭제하겠습니다.
					</FDescription>
				</div>

				<div>
					<FTitle>
						<p>100% AUTHENTIC</p>
						<span>
							무신사스토어에서 판매되는 모든 브랜드 제품은 정식제조, 정식수입원을 통해 유통되는 100%
							정품임을 보증합니다.
						</span>
					</FTitle>
					<FDescription>
						주식회사 무신사 (MUSINSA Co., Ltd.) | 서울특별시 강남구 신사동 640-2 로빈명품관 지하1층
						| 사업자등록번호 : 211-88-79575 | 통신판매업신고 : 2012-서울강남-01897 | 대표 : 한문일 |
						개인정보관리책임자 : 이인섭(help@musinsa.com) &#124; 호스팅사업자 : (주)무신사
					</FDescription>
					<FDescription>
						일부 상품의 경우 주식회사 무신사는 통신판매의 당사자가 아닌 통신판매중개자로서
						<br /> 상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서
						구체적인 내용을 확인하시기 바랍니다.
					</FDescription>
				</div>
			</FDiv>
			<div>
				<FBttom>
					<span>FASHION WEB MAGAZINE / LIFE STYLE SELECT SHOP</span> WWW.MUSINSA.COM
				</FBttom>
			</div>
		</FContainer>
	);
};

export default Footer;
