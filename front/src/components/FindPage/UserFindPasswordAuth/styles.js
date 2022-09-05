import styled from '@emotion/styled';

export const AuthUser = styled.div`
	position: absolute;
	top: 101px;
	left: ${props => (props.authStyle === 'emailAuth' ? '90px' : '105px')};
`;
