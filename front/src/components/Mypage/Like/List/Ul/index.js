import React, { useState } from "react";
import { ImgSpan } from "../styles";
import { FaHeart } from 'react-icons/fa'

function Likelist({data}) {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => setValue(value);

  return (
    <ul>
      <li>
      <ImgSpan><img src= {data.ProductImg} alt="더미데이터" width="50px" height="50px"/></ImgSpan>
        <ul>
        <li>{data.ProductCompany}</li>
        <li>{data.ProductName}</li>
        <li>{data.ProductPrice}원</li>
        <li><FaHeart /> 346</li>
        </ul>
      </li>     
    </ul>
  )
}

export default Likelist;
