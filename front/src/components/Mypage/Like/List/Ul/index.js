import React, { useState } from "react";
import { ImgSpan, LikeLi, LikeUl } from "../styles";
import { FaHeart } from 'react-icons/fa'

function Likelist({data}) {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => setValue(value);

  return (
    <LikeUl>
      <LikeLi>
      <ImgSpan><img src= {data.ProductImg} alt="더미데이터" /></ImgSpan>
        <ul>
        <li className="brand">{data.ProductCompany}</li>
        <li className="name">{data.ProductName}</li>
        <li className="price">{data.ProductPrice}원</li>
        <li className="like"><FaHeart /> 346</li>
        </ul>
      </LikeLi>     
    </LikeUl>
  )
}

export default Likelist;
