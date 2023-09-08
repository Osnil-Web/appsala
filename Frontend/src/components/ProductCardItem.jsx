import React from 'react'
import { FaStar } from 'react-icons/fa'

function ProductCardItem({product}) {
  return (
    // <div className="reviews-card">
    <div>
        <img src={product.logo} alt="" style={{height:'50px'}}/>
    </div>
  
  )
}

export default ProductCardItem

  /* <div className="details">
        <p style={{fontSize: '15px'}}>{product.name}</p>
        <div className="stars">
          <FaStar style={{color: "yellow"}}/>
          <FaStar style={{color: "yellow"}}/>
          <FaStar style={{color: "yellow"}}/>
          <FaStar style={{color: "yellow"}}/>
          <FaStar style={{color: " #D9D9D9"}}/>
        </div>
        <div className="ratings">
            <p>{product.averageRating} <span>(149 Follows)</span></p>
        </div>
    </div> */
    // </div>