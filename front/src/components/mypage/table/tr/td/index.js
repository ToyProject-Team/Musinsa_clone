import React from "react";

function Td({item}) {
  return (
    <>
    <tr>
      <td>{item.name}</td>
      <td>{item.username}</td>
      <td>{item.id}</td>
      <td>{item.address.geo.lng}</td>
      <td>{item.address.city}</td>
    </tr>
    </>
  )
}

export default Td;
