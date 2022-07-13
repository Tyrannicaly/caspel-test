import React from 'react'
import A from "../app.module.css"

function Item (props) {
  return (
    <div className={A.headerBlock}>
      <div className={A.elem}>{props.name}</div>
      <div className={A.elem + ' ' + A.elemAddress}>{props.address}</div>
      <div className={A.elem}>{props.phone}</div>
      <div className={A.elem + ' ' + A.elemEmail}>{props.email}</div>
    </div>
  )
}

export default Item