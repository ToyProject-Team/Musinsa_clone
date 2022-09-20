import styled from '@emotion/styled';

export const ScrollContainer = styled.div`
	display: flex;
	height: 100vh;
	position: sticky;
`;

export const MainContainer = styled.div`
	font-size: 13px;
	height: 100vh;
	border-left: 1px solid #ddd;
`;

// 카테고리
export const Category = styled.div`
	display: block;
`;

// 선택된 페이지
export const CategoryTitle = styled.div`
	display: flex;
	flex-shrink: 0;
	border-bottom: solid 1px;
	border-color: rgb(212, 212, 212);
	padding: 4px 10px 10px 45px;

	.page_title {
		float: left;
		text-justify: center;
		padding-right: 20px;
		font-size: 24px;

		:hover {
			cursor: pointer;
		}
	}

	.hash_tag {
		display: inline-block;
		min-width: 45px;
		// height: 28px;
		line-height: 31px;
		margin-right: 1px;
		padding: 0 10px 0 9px;
		font-size: 12px;
		text-align: center;
		color: #b2b2b2;
		border: 1px solid #ddd;
	}

	.hash_tag:hover {
		font-weight: bold;
		color: #09f;
		border-color: #09f;
		cursor: pointer;
	}
`;

// 중분류
export const MiddleCategory = styled.div`
	display: flex;
	border-bottom: solid 1px;
	border-color: rgb(212, 212, 212);
	padding-left: 15px;

	& div {
		width: 100%;
	}

	& input {
		margin-top: 10px;
	}

	&:hover {
		background-color: #f2f2f2;
		z-index: 1;
	}

	.all_item {
		min-width: 100px;
		max-width: 100px;
		padding-top: 15px;
		padding-right: 12px;
		font-weight: bold;
		color: #b2b2b2;
	}

	.all_item:hover {
		font-weight: bold;
		color: black;
		text-decoration: underline;
		cursor: pointer;
	}

	.all_item_list {
		padding-top: 15px;

		& ul {
			display: inline-block;
			// max-width: 800px;

			& li {
				float: left;
				width: 145px;
				padding: 0 0 15px;
				margin: 0;
				color: #b2b2b2;
			}
		}

		& li:hover {
			text-decoration: underline;
			color: black;
			cursor: pointer;
		}
	}
`;

// 그외 카테고리(색상,가격, 검색)
export const OtherCategory = styled.div`
	display: flex;
	flex-shrink: 0;
	border-bottom: solid 1px;
	border-color: rgb(212, 212, 212);
	padding-left: 15px;

	&:hover {
		background-color: #f2f2f2;
		z-index: 1;
	}

	.color,
	.price {
		padding-top: 15px;
		padding-bottom: 15px;

		& ul {
			display: inline-block;
			// min-width: 1200px;

			& li {
				float: left;
				line-height: 20px;
				vertical-align: center;
				padding-right: 17px;
				margin: 0;
				color: #b2b2b2;

				input {
					padding: 5px 7px 4px 4px;
				}
			}

			& li:last-child {
				text-decoration: none;

				input {
					width: 57px;
					border: 1px solid #ddd;
					background: #fff;
				}

				span {
					vertical-align: middle;
					padding: 0 4px;
				}

				.search_btn {
					display: inline-block;
					font-weight: bold;
					line-height: 15px;
					padding: 3px 4px 2px 4px;
					margin: -3px 0 0 4px;
					border: 1px solid #ddd;
					background: #fff;
					cursor: pointer;
				}
			}
		}

		& li:hover {
			text-decoration: underline;
			color: black;
			cursor: pointer;
		}
	}

	.search_items {
		padding-top: 15px;
		padding-bottom: 15px;
		// border-left: 1px solid #ddd;

		input {
			width: 130px;
			height: 19px;
			margin: 0;
			padding: 2px 5px px;
			vertical-align: middle;
			border: 1px solid #ddd;
			background: #fff;
		}

		.search_btn {
			display: inline-block;
			font-weight: bold;
			line-height: 15px;
			padding: 3px 4px 2px 4px;
			margin: -3px 0 0 4px;
			border: 1px solid #ddd;
			background: #fff;
			cursor: pointer;
		}
	}
`;

export const BrandList = styled.div`
	display: flex;
	flex-shrink: 0;
	padding-top: 15px;
	// padding-left:10px;
	// padding-bottom: 10px;
	border-bottom: 1px solid #ddd;

	& div {
		& ul {
			display: inline-block;
			min-width: 600px;
			max-width: 800px;

			& li {
				float: left;
				width: 100px;
				padding: 0 0 15px;
				margin: 0;
				color: #b2b2b2;
			}
		}
	}

	& li:hover {
		text-decoration: underline;
		color: black;
		cursor: pointer;
	}
`;

export const BrandAttribute = styled.div`
	max-width: 100px;
	min-width: 100px;
	padding-right: 16px;
	font-weight: bold;

	& span {
		padding-left: 5px;
		color: #f33;
	}

	div:first-of-type {
		margin-bottom: 15px;
	}

	div:last-child {
		& p:hover {
			color: black;
			text-decoration: underline;
			cursor: pointer;
		}
	}

	& div {
		display: flex;
		min-width: 90px;

		& button {
			margin-left: 7px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 15px;
			font-weight: bold;
			background-color: white;
			height: 15px;
			width: 15px;
			border: 1px solid #ddd;
		}

		& button:hover {
			cursor: pointer;
		}
	}
`;

export const CategoryName = styled.div`
	display: block;
	padding-top: 15px;
	padding-bottom: 10px;
	min-width: 100px;
	max-width: 100px;
	font-weight: bold;

	& div:last-child {
		width: 80px;
		position: relative;

		input {
			width: 70px;
			padding: 2px 2px 2px 2px;
			background: #fff;
			border: 1px solid #ddd;
		}

		img {
			position: absolute;
			top: 14px;
			right: 10px;
		}
	}
`;

// Item List
export const ItemSection = styled.div`
	padding-top: 15px;
	padding-left: 20px;
	padding-right: 20px;
	// -webkit-box-sizing: border-box;

	&:hover {
		background-color: #f2f2f2;
		z-index: 1;
	}
`;

export const SelectBox = styled.div`
	.visible {
		display: inline-block;
		vertical-align: center;
		margin-right: 5px;
		margin-bottom: 15px;
		margin-bottom: 15px;
		background: #fff;
		border: 1px solid #ddd;
		color: #b2b2b2;
		padding: 10px 10px 10px 10px;
	}

	.invisible {
		display: none;
	}

	:hover {
		cursor: pointer;
	}

	.select-medium-button {
		color: red;
		font-weight: bold;
	}
`;

export const Items = styled.div`
	// min-width: 933px;
	background-color: #fff;
	height: 100vh;
	//border-right: 1px solid #ddd;
	border-left: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
`;

export const SortBox = styled.div`
	display: flex;
	justify-content: space-between;
	padding-left: 15px;
	padding-bottom: 10px;
	width: 100%;
	height: 42px;
	line-height: 42px;
	border: 1px solid #ddd;
	box-sizing: border-box;
	background-color: white;

	.sort {
		display: block;
		line-height: 40px;
		height: 40px;
		float: left;
	}

	.sort::after {
		content: '|';
		padding-left: 10px;
		padding-right: 10px;
	}

	.sort:hover {
		cursor: pointer;
		font-weight: bold;
		text-decoration: underline;
		color: black;
	}

	.page {
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		height: 42px;
		padding-left: 15px;
		padding-right: 15px;
		font-weight: bold;
	}
`;

export const ListBox = styled.div`
	width: 100%;
	height: 317px;
	// text-align: center;
	// border-right: 1px solid #ddd;

	.list_item {
		display: inline-block;

		// border-right: 1px solid #ddd;
	}
`;

// 	.li_outer {
// 		position: relative;
// 		min-width: 150px;
// 		float: left;
// 		margin: 0;
// 		background-color: white;
// 		// border-left: 1px solid #ddd;
// 		border-right: 1px solid #ddd;
// 		border-bottom: 1px solid #ddd;

// 		&:hover {
// 			background-color: #f2f2f2;
// 			z-index: 1;
// 		}
// 	}

// 	.li_inner {
// 		border: 0;
// 		vertical-align: top;
// 		background: transparent;
// 		width: 150px;
// 		height: 280px;
// 		padding-top: 15px;
// 		// &:hover {
// 		// 	background-color: #f2f2f2;
// 		// 	z-index: 1;
// 		// }
// 	}

// 	.list_img {
// 		position: relative;
// 		width: 125px;
// 		height: 150px;
// 		margin: 0 auto 10px;
// 		text-align: center;
// 		overflow: hidden;
// 		background-color: white;

// 		:hover {
// 			opacity: 0.5;
// 		}

// 		img {
// 			width: 120px;
// 			height: 145px;
// 			object-fit: cover;
// 		}
// 	}

// 	.item_info {
// 		position: relative;
// 		width: 125px;
// 		margin: 0 auto;
// 		text-align: left;
// 	}

// 	.option {
// 		display: block;
// 		float: right;
// 		border-top: 1px solid #ddd;
// 		border-left: 1px solid #ddd;
// 		position: relative;
// 		background-color: white;
// 		z-index: 100;

// 		.option_btn {
// 			height: 17px;
// 			padding: 3px 8px 0 8px;
// 			cursor: pointer;
// 		}

// 		.option_list {
// 			display: block;
// 			position: relative;

// 			ul {
// 				right: -1;
// 				position: absolute;
// 				width: 100%;
// 				color: #000;
// 				background: #fff;
// 				border: 1px solid #ddd;
// 			}

// 			.open {
// 				display: flex;
// 				justify-content: space-between;
// 				color: #000;
// 				background: #fff;
// 				padding: 6px 10px 6px 10px;
// 			}
// 			.close {
// 				display: none;
// 			}
// 		}
// 	}
// `;
