import React from "react";
import { ImgSpan } from "../styles";

function OrderList({data}) {
  return (
    <tbody>
      <tr>
      <td>
      <ImgSpan><img src= {data.ProductImg} alt="더미데이터" width="50px" height="50px"/></ImgSpan>
        <ul>
          <li>{data.ProductCompany}</li>
          <li><strong>{data.ProductName}</strong></li>
          <li>{data.ProductOption}</li>
        </ul>
        </td>
      <td>{data.OrderDay}</td>
      <td>{data.OrderNum}</td>
      <td>{data.ProductPrice}<br/><span>({data.ProductNum}개)</span></td>
      <td colSpan="2">{data.Orderstatus}</td>
      </tr>
    </tbody>
  )
}

export default OrderList;
