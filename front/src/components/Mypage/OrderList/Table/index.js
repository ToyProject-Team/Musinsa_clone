import React from "react";
import { ImgSpan } from "../styles";

function OrderList({data}) {
  return (
    <tbody>
      <tr>
      <td>
      <ImgSpan><img src= {data.ProductImg} alt="더미데이터" width="50px" height="50px"/></ImgSpan>
        <ul>
          <li><strong>{data.ProductName}</strong></li>
          <li>{data.orederColor} / {data.orderSize}</li>
        </ul>
        </td>
      <td>{data.createdAt}</td>
      <td>{data.amount}</td>
      <td>{data.orderPrice}<br/><span>({data.amount}개)</span></td>
      <td colSpan="2">{data.state}</td>
      </tr>
    </tbody>
  )
}

export default OrderList;
