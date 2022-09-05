import React from 'react';
import OpenForm from 'contract/OpenForm';

const Notice = () => {
	return (
		<OpenForm>
			<header>
				<h1>무신사 스토어</h1>
				<div>
					<h2>공지사항</h2>
				</div>
			</header>
			<section>
				<div>
                1. 무신사닷컴에서 제작한 컨텐츠에 대한 공지사항입니다.<br/>
                ㄱ. 무신사닷컴에서 제작한 컨텐츠는 개인이 비상업적인 용도로 활용하는 온라인 공간에 한해서 모두 열려있습니다.(예 : 개인블로그, sns채널 등)<br/>
                ㄴ. 브랜드 쇼핑몰/브랜드의 홍보 채널(sns, 브랜드 블로그, 커뮤니티 공간 모두 포함)에서는 사용하실 수 없습니다.<br/>
                ㄷ. 협의되지 않은 쇼핑몰 및 상업성 까페 그리고 타 매체(잡지, 웹진 등)에서는 사용하실 수 없습니다.<br/>
                ㄹ. 개인의 공간에 퍼가실 때에는, 기본적으로 제공되는 스크랩 기능을 사용해주시기 바랍니다.<br/>
                ㅁ. 스크랩 기능을 지원하지 않는 공간에 스크랩을 원하는 회원분들은 반드시 출처를 남겨주시기 바랍니다. 출처는 링크와 함께 남겨주시기 바랍니다. (예 : 무신사 (X), 무신사펌 (X), 무신사닷컴(www.musinsa.com) (O))<br/>

                2. 회원분들이 작성한 게시글의 경우<br/>
                ㄱ. 각 회원들에게 저작권 및 관련 책임이 있으며, 이에 대해 무신사닷컴은 별도의 책임을 지거나 권리를 행사하지 않습니다. 저작권 위반의 소지가 있을 시, 신고 확인 후, 영업 시간 기준 72시간 안에 검토 후 처리하겠습니다.<br/>
                ㄴ. 신고된 게시글의 작성자에 대한 정보는 수사기관의 협조 공문이 없을 시에는 절대로 알려드리지 않습니다.
				</div>
			</section>
		</OpenForm>
	);
};

export default Notice;
