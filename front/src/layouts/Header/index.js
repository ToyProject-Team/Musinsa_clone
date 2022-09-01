import React from 'react';
import {
	FContainer,
	FDiv,
	FTitle,
	FDescription,
} from './styles';
// import { Form } from './styles';

const Header = () => {
	return (
		<FContainer>
			<FDiv>
				<div className='text'>
					<FTitle>COPYRIGHT (C) MUSINSA ALL RIGHTS RESERVED.</FTitle>
					<FDescription>무신사닷컴 내 매거진, 스트리트스냅, 스토어 등 무신사 자체 생성 콘텐츠는 무신사닷컴 및 무신사 계약업체에 저작권이 있습니다.</FDescription>
					<FDescription>이러한 콘텐츠는 출처를 밝히고(무신사닷컴 표기 및 www.musinsa.com 링크 포함 필수) 비상업적인 용도에서만 활용하실 수 있습니다. <strong>자세히보기</strong></FDescription>
					<FDescription>커뮤니티 및 중고장터, 댓글 등 무신사 회원이 올린 이미지가 저작권에 위배될 경우 <strong>신고</strong> 하시면 검토 후 삭제하겠습니다.</FDescription>
				</div>

				<div className='bottomT'>
					
				</div>
			</FDiv>
		</FContainer>

	);
};

export default Header;
