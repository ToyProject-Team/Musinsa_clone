import styled from '@emotion/styled';

export const ListWrapper = styled.ul`
	width: 100%;
`;

export const ListOuter = styled.li`
	position: relative;
	min-width: 154px;
	float: left;
	margin: 0;
	background-color: white;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	box-sizing: border-box;

	@media only screen and (min-width: 0) {
		width: 25% !important;
	}

	@media only screen and (min-width: 1200px) {
		width: 20% !important;
	}

	// @media only screen and (min-width: 1200px) {
	// 	width: 16.66666667% !important;
	// }

	@media only screen and (min-width: 1700px) {
		width: 14.2857143% !important;
	}

	&:hover {
		background-color: #f2f2f2;
		z-index: 1;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.li_inner {
		border: 0;
		vertical-align: top;
		background: transparent;
		height: 280px;
		// padding-top: 15px;
		margin: 15px auto 20px;
	}

	.list_img {
		position: relative;
		width: 125px;
		height: 150px;
		margin: 0 auto 10px;
		text-align: center;
		overflow: hidden;
		background-color: white;

		:hover {
			opacity: 0.5;
		}

		img {
			min-width: 120px;
			min-height: 145px;
			object-fit: cover;
		}
	}

	.item_info {
		position: relative;
		width: 125px;
		margin: 0 auto;
		text-align: left;
	}

	.option {
		display: block;
		float: right;
		border-top: 1px solid #ddd;
		border-left: 1px solid #ddd;
		position: relative;
		background-color: white;
		z-index: 100;

		.option_btn {
			height: 17px;
			padding: 3px 8px 0 8px;
			cursor: pointer;
		}

		.option_list {
			display: block;
			position: relative;

			ul {
				right: -1;
				position: absolute;
				width: 100%;
				color: #000;
				background: #fff;
				border: 1px solid #ddd;
			}

			.open {
				display: flex;
				justify-content: space-between;
				color: #000;
				background: #fff;
				padding: 6px 10px 6px 10px;
			}
			.close {
				display: none;
			}
		}
	}
`;
