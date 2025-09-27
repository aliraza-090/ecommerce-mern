import React from 'react'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
      {/* ✅ Show image correctly */}
      <img src={props.image} alt={props.name} className="item-image" />

      {/* ✅ Show product name  */}
      <p className="item-name">{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
