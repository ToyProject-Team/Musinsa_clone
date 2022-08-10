import styled from '@emotion/styled';

export const CategoryWrapper = styled.div`
	font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
	position: relative;
	padding-top: 5px;
	padding-bottom: 10px;
	font-weight: bold;
	font-size: 12px;
	color: #a9a9a9;
	p {
		cursor: pointer;
		text-decoration: underline;
		text-decoration-color: #a9a9a9;
		display: inline-block;
		padding: 1px;
	}
	span {
		cursor: none;
		text-decoration-color: #a9a9a9;
		display: inline-block;
		padding: 1px;
	}
`;

export const Header = styled.div`
	margin: '40px 20px 20px 20px';
	p {
		font-family: 'Noto Sans KR', sans-serif;
		font-weight: bold;
		padding-top: 5px;
		padding-bottom: 5px;
	}
`;
