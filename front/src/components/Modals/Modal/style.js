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

export const ButtonContainer = styled.div`
	display: flex;
	gap: 10px;

	& > button:nth-of-type(1) {
		color: #0078ff;
		background-color: #fff;
		border: 1px solid #0078ff;
	}
`;

export const Title = styled.h2`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	height: 50px;
	position: relative;
	font-size: 16px;
	margin-bottom: 40px;
`;

export const Content = styled.p`
	font-size: 20px;
	font-weight: 900;
	line-height: 30.8px;
	text-align: center;
`;

export const List = styled.ul`
	overflow-y: auto;
	max-height: 255px;
	margin: 20px 8px 60px;
	padding: 5px 0;
	background-color: #f5f5f5;

	& > li {
		display: flex;
		padding: 13px 15px;

		& > .list-id {
			font-weight: 900;
			box-sizing: border-box;
			width: 100%;
			padding-right: 10px;
			word-break: break-all;
			text-align: left;
		}

		& > .list-auth {
			position: relative;
			font-size: 12px;
			line-height: 18px;
			color: #777;
			white-space: nowrap;
		}
	}
`;

export const RestText = styled.p`
	margin-bottom: 20px;
	font-size: 15px;
	line-height: 22.5px;

	a {
		display: inline-block;
		margin-left: 2px;
		color: #0078ff;
		text-decoration: none;
	}
`;
