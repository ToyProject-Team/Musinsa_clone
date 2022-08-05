import React from "react";

function Td({data}) {
  return (
    <>
    <tr>
      <td>{data.ProductName}</td>
      <td>{data.ProductPrice}</td>
      <td>{data.OrderDay}</td>
      <td>{data.OrderNum}</td>
      <td colSpan="2">{data.Orderstatus}</td>
    </tr>
    </>
  )
}

export default Td;
