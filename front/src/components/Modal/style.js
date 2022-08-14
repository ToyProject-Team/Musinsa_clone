import styled from '@emotion/styled';

export const CreateModal = styled.div`
	position: fixed;
	text-align: center;
	left: 0;
	bottom: 0;
	top: 0;
	right: 0;
	background-color: #00000021;
	z-index: 1022;

	& > div {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: inline-block;
		min-width: 250px;
		background: white;
		--saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
		box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
		background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
		border-radius: 6px;
		user-select: none;
		max-width: 440px;
		padding: 30px 40px;
		z-index: 1012;
		position: relative;
	}
`;

export const CloseModalButton = styled.button`
	position: absolute;
	right: 10px;
	top: 6px;
	background: transparent;
	border: none;
	font-size: 30px;
	cursor: pointer;
`;

export const Label = styled.label`
	&.label {
		& > span {
			margin-bottom: 10px;
			display: block;
			text-align: center;
			padding-bottom: 8px;
			font-size: 15px;
			cursor: pointer;
			line-height: 1.46666667;
			font-weight: 700;
		}
	}
`;

export const Button = styled.button`
	&.button {
		width: 100%;
		color: #fff;
		background-color: #0078ff;
		border: none;
		font-weight: 900;
		height: 44px;
		min-width: 96px;
		padding: 0 16px 3px;
		transition: all 80ms linear;
		user-select: none;
		outline: none;
		cursor: pointer;
		border-radius: 4px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}
`;
