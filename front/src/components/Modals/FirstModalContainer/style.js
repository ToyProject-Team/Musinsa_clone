import styled from '@emotion/styled';

export const CreateModal = styled.div`
	position: fixed;
	text-align: center;
	left: 0;
	bottom: 0;
	top: 0;
	right: 0;
	background-color: #00000021;
	z-index: 9999;

	& > div {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: inline-block;
		min-width: 250px;
		background: white;
		--saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
		box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
		border-radius: 6px;
		user-select: none;
		max-width: 1200px;
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

export const Container = styled.div`
	max-width: 1200px;
	max-height: 800px;
	overflow-x: auto;

	h1 {
		font-size: 48px;
		font-weight: 900;
		margin-top: 50px;
		color: rgb(206 0 0);
	}
	h3 {
		font-size: 36px;
		text-align: left;
		font-weight: 700;
		margin: 70px 0 20px;
	}
	h4 {
		font-size: 36px;
		font-weight: 700;
		margin: 70px 0 20px;
		color: rgb(206 0 0);
	}

	img {
		width: 100%;
	}
`;
