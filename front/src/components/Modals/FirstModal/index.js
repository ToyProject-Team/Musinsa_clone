import FirstModalContainer from '../FirstModalContainer';
import { Button, Container } from 'components/Modals/FirstModalContainer/style';
import React from 'react';
import error1 from 'assets/images/error_1.png';
import error2 from 'assets/images/error_2.png';
import error3 from 'assets/images/error_3.png';

const FirstModal = ({ show, onCloseModal }) => {
	return (
		<FirstModalContainer show={show} onCloseModal={onCloseModal}>
			<Container>
				<h1>데이터가 데이터가 안나오나요?</h1>
				<ul>
					<li>
						<h3>1. 아래 사진처럼 데이터가 안나오는 경우</h3>
						<img src={error1} />
					</li>
					<li>
						<h3>2. 주의 요함 → 사이트 설정으로 들어가주세요.</h3>
						<img src={error2} />
					</li>
					<li>
						<h3>3. 안전하지 않은 콘텐츠를 허용으로 변경해주세요.</h3>
						<img src={error3} />
					</li>
					<li>
						<h4>새로고침 후 데이터를 다시 한번 확인해주세요. 감사합니다.</h4>
					</li>
				</ul>
			</Container>
			<Button className="button" onClick={onCloseModal}>
				확인
			</Button>
		</FirstModalContainer>
	);
};

export default FirstModal;
