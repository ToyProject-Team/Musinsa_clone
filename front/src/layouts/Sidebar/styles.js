import styled from '@emotion/styled';

export const SContainer = styled.section`
	float: left;
	background: white;
	width: 270px;
	border-right: 1px solid #d3d3d3;
`;

export const SDiv = styled.div`
	padding-top: 20px;
	text-align: center;

	& h1 {
		position: absolute;
		left: 240px;
		font-size: 1.4em;

		& svg {
			vertical-align: middle;
			cursor: pointer;
		}
	}

	& button {
		border: none;
		font-size: 16px;
		font-weight: 900;
		vertical-align: -webkit-baseline-middle;
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}
	}

	& nav {
		margin-top: 10px;
		padding-left: 10px;

		& div {
			cursor: pointer;

			& div {
				text-align: left;
				font-size: 14px;
				font-weight: 900;
				font-family: 'Arial', 'monospace';
				border-top: 1px solid #d3d3d3;
				padding: 14px 0;
				clear: both;

				& span:first-of-type {
					font-size: 10px;
					padding-left: 6px;
					color: #b2b2b2;
				}

				& span:last-of-type {
					float: right;
					padding-right: 10px;
					cursor: pointer;

					& svg {
						font-size: 20px;
						transform: translate(0, -3px);
					}

					&:hover {
						opacity: 0.7;
						color: red;
					}
				}
			}

			& ul {
				border-top: 1px solid #d3d3d3;
				padding-top: 20px;
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;
				max-height: 200px;
				transition: all 0.5s ease;

				&[aria-expanded='true'] {
					max-height: 0px;
					transition: all 0.5s cubic-bezier(0, 1, 0, 1);
				}

				& li {
					font-size: 12px;
					color: #666;
					font-weight: 600;
					width: 50%;
					height: 26px;

					& span {
						color: #b2b2b2;
					}

					&:hover {
						cursor: pointer;
						color: black;
						font-weight: 900;
					}
				}
			}
		}
	}
`;
