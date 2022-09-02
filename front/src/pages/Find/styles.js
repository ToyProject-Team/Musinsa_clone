import styled from '@emotion/styled';

export const Container = styled.div`
	min-height: 100vh;
	background-color: #f1f1f1;
	overflow: hidden;

	& .clearBtn {
		display: flex;
		margin-right: 7px;
		padding: 5px;
		flex: 0 0 auto;
		background: 0 0;
	}
`;

export const Inner = styled.div`
	min-height: calc(100vh - 80px);
	max-width: 380px;
	margin: 0 auto;
	background-color: #fff;
	padding: 40px;
`;

export const Header = styled.div`
	position: relative;
	max-width: 385px;
	margin: 0 auto;

	h2 {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		position: relative;
		font-size: 16px;
		height: 50px;
	}

	& > div {
		position: relative;
		max-width: 385px;
		margin: 0 auto;

		& > div {
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			position: absolute;
			top: 5px;
			left: 5px;

			button {
				display: inline-flex;
				width: 40px;
				height: 40px;
				position: relative;
				padding: 5px;
				box-sizing: border-box;
				border: 0;
				background: 0 0;
				font-size: inherit;
				font-family: inherit;
				line-height: 1.5;
				cursor: pointer;

				span {
					display: none;
				}
			}
		}
	}
`;

export const Section = styled.div`
	position: relative;
	max-width: 375px;
	min-height: 655px !important;
	box-sizing: border-box;
	padding: 20px 15px 100px;
`;

export const Menubar = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 24px;
	justify-content: space-around;
	align-items: center;

	a {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		border: 1px solid #f1f1f1;
		border-bottom: 0;
		background-color: #f1f1f1;
		color: #aaa;
		text-align: center;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		margin: 0;
		padding: 0;

		&.active {
			background-color: #fff;
			color: #000;
		}
	}
`;
