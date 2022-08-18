import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
// import { ADDRESS, useProductDispatch } from 'context/UserContext';

const Post = props => {
	const address = props.address;
	const setAddress = props.setAddress;
	// const dispatch = useProductDispatch();
	const postCodeStyle = {
		display: 'block',
		position: 'absolute',
		width: '430px',
		height: '499px',
		zIndex: 100,
	};

	// zonecode;
	// fullAddress;

	const handleComplete = data => {
		let fullAddress = data.address;
		let extraAddress = '';
		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		const post = {
			zonecode: data.zonecode,
			fullAddress: fullAddress,
		};
		console.log(data.zonecode);
		console.log(fullAddress);
		// dispatch({ type: ADDRESS, post });
	};

	return (
		<DaumPostcode style={postCodeStyle} autoClose={true} onComplete={handleComplete} {...props} />
	);
};

export default Post;
