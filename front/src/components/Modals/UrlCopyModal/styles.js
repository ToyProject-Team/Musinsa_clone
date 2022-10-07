import styled from '@emotion/styled';

export const CreateModal = styled.div`
	position: fixed;
	left: 0;
	bottom: 0;
	top: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 1000;
`;

export const BoxLayout = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: transparent;
	z-index: 1010;

	& h1 {
		text-align: right;
		font-size: 26px;
		color: white;
		margin-bottom: 6px;
		cursor: pointer;
	}

	& > div {
		background: white;
		min-width: 280px;
		padding: 40px 30px;
		border-radius: 10px;
		text-align: center;

		& input {
			background: #f3f3f3;
			color: #b2b2b2;
			border: 1px solid #d3d3d3;
			padding: 10px;
		}

		& span {
			box-sizing: border-box;
			border: 1px solid #d3d3d3;
			margin-left: 5px;
			padding: 10px;
			font-weight: 900;
			color: black;
			cursor: pointer;
		}
	}

	& p {
		text-align: left;
		color: #b2b2b2;
		padding-left: 26px;
		margin-top: 14px;
		font-size: 14px;
		font-family: 'Arial', 'sans-serif';
		font-weight: 600;
	}

	& section {
		padding-top: 20px;
		max-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		& p:first-of-type {
			cursor: pointer;
			text-align: center;
			min-width: 50%;
			padding: 0;
			margin: 0;
			& svg {
				width: 60px;
				height: 60px;
				color: #3b5998;
			}
		}

		& p:last-of-type {
			cursor: pointer;
			text-align: center;
			min-width: 50%;
			padding: 0;
			margin: 0;
			& svg {
				width: 70px;
				height: 70px;
				color: #00acee;
			}
		}
	}

	& .last {
		padding: 0;
		margin: 0;
		width: 100%;
		text-align: center;
		& span {
			color: #b2b2b2;
			font-size: 12px;
			display: inline-block;
			width: 50%;
			padding: 0;
			margin: 0;
			border: none;
		}
	}
`;
