import styled from '@emotion/styled';

export const Container = styled.div`
	min-height: 100%;
	padding-top: 62px;

	header {
		height: 50px;

		h1 {
			overflow: hidden;
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			clip: rect(0px, 0px, 0px, 0px);
		}

		h2 {
			font-weight: 700;
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			-webkit-box-pack: center;
			justify-content: center;
			height: 50px;
			position: relative;
			font-size: 16px;
		}
	}

	section {
		position: relative;
		max-width: 375px;
		min-height: 655px !important;
		padding: 20px 15px 100px;
		margin: 0 auto;
		line-height: 21px;
		background: none;

		div {
			color: #6e6e6e;

			a {
				text-decoration: underline;
				color: inherit;
			}
		}
	}
`;
