import styled from '@emotion/styled';

export const ButtonWrapper = styled.div`
	margin-bottom: 10px;
`;

export const Button = styled.button`
	height: 30px;
	width: 150px;
	margin: 0px 10px 10px 0px;
	font-weight: bold;
	font-size: ${props => (props.selected === true ? '12px' : '11px')};
	border: ${props => (props.selected === true ? '1px solid #0078ff' : '1px solid #fff')};
	border-radius: 4px;
	background-color: ${props => (props.selected === true ? '#fff' : '#f5f5f5')};
	color: ${props => (props.selected === true ? '#0077ff' : '#777')};
	cursor: pointer;
`;

export const OrderContainer = styled.div`
	width: 400px;
	font-size: 12px;
	font-weight: bold;
	color: #000;
	border: 1px solid #cdcdcd;
	border-bottom: none;
	margin: 20px;
	select {
		border: 1px solid #cdcdcd;
		padding: 4px 40px 4px 4px;
		margin: 0px 20px 10px 0px;
	}
`;

export const InfoWrapper = styled.ul`
	border-bottom: 1px solid #cdcdcd;
	li {
		display: inline-block;
		padding: 20px;
	}
	li:first-child {
		padding-right: 90px;
		padding-bottom: 10px;
	}
	p {
		font-size: 11px;
		color: #777;
		span {
			color: #ff0000;
		}
	}
	label {
		display: block;
		margin: 20px 0px 30px 15px;
		input {
			margin-right: 8px;
		}
	}
`;

export const OrderButton = styled.button`
	background-color: ${props => (props.agreement ? '#0078ff' : '#f5f5f5')};
	border: ${props => (props.agreement ? 'none' : '#777')};
	padding: 20px 80px;
	color: ${props => (props.agreement ? '#fff' : '#777')};
	font-weight: bold;
	font-size: 16px;
	margin-left: 75px;
	cursor: ${props => (props.agreement ? 'pointer' : '')};
`;

export const RefundHolder = styled.span`
	background-color: #f5f5f5;
	padding: 5px 70px 4px 20px;
	fontweight: bold;
	border: 1px solid #cdcdcd;
`;

export const RefundInfo = styled.ul`
	border-bottom: 1px solid #cdcdcd;
	li {
		margin: 20px;
	}
	li:first-child {
		margin-bottom: 40px;
	}
	span {
		margin-right: 50px;
		margin-bottom: 10px;
		color: #777;
	}
	input {
		border: 1px solid #cdcdcd;
		height: 20px;
	}
	div {
		margin-bottom: 15px;
		span {
			float: left;
			width: 70px;
		}
		div {
			display: block;
			padding-left: 100px;
		}
	}
	label {
		position: relative;
		margin-right: 10px;
		input {
			position: relative;
			top: 4px;
			margin-right: 8px;
		}
	}
`;

export const DefalutInfo = styled.ul`
	border-bottom: 1px solid #cdcdcd;
	div {
		padding: 20px;
		span {
			font-size: 11px;
		}
	}
	ul {
		list-style-type: disc;
		font-size: 11px;
		color: #777;
	}
	li {
		margin-left: 15px;
		margin-top: 10px;
	}
`;

export const X = styled.div`
	font-size: 20px;
	margin-left: 410px;
	cursor: pointer;
`;

export const AddressButton = styled.button`
	border: 1px solid #cdcdcd;
	width: 100px;
	span {
		background-color: #f3f3f3;
		color: #000;
		text-align: center;
		font-weight: bold;
		cursor: pointer;
		margin: 6px 0px 10px 8px;
	}
`;
