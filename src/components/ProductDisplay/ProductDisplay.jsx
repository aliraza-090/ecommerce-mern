import React, { useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';

const ProductDisplay = (props) => {
  const { product } = props;

  // ✅ Track selected image
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* ✅ Example with multiple images (can extend later) */}
          <img src={product.image} alt="" onClick={() => setSelectedImage(product.image)} />
          <img src={product.image} alt="" onClick={() => setSelectedImage(product.image)} />
          <img src={product.image} alt="" onClick={() => setSelectedImage(product.image)} />
          <img src={product.image} alt="" onClick={() => setSelectedImage(product.image)} />
        </div>

        <div className="productdisplay-img">
          {/* ✅ Show selected image */}
          <img className='productdisplay-main-img' src={selectedImage} alt={product.name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p> {/* ✅ fixed typo */}
        </div>

        <div className="productdisplay-right-prices">
          <div className='productdisplay-right-price-old '>${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          starting description is here
        </div>

        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        <button>ADD TO CART</button>

        <p className='productdisplay-right-category'>
          <span>Category :</span> Women , T-shirts , Crop Top
        </p>
        <p className='productdisplay-right-category'>
          <span>Tags :</span> Modern , Latest
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay;
