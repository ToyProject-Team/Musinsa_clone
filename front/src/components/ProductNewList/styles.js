import styled from '@emotion/styled';

export const ListOuter = styled.li`
	position: relative;
	min-width: 150px;
	float: left;
	margin: 0;
	background-color: white;
	// border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;

	&:hover {
		background-color: #f2f2f2;
		z-index: 1;
	}

	.li_inner {
		border: 0;
		vertical-align: top;
		background: transparent;
		width: 150px;
		height: 280px;
		padding-top: 15px;
		// &:hover {
		// 	background-color: #f2f2f2;
		// 	z-index: 1;
		// }
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
			width: 120px;
			height: 145px;
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
