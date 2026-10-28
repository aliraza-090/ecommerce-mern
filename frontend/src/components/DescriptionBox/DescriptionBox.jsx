import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      {/* ✅ Navigation Tabs */}
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box active">Description</div>
        <div className="descriptionbox-nav-box">Reviews (122)</div>
      </div>

      {/* ✅ Product Description */}
      <div className="descriptionbox-content">
        <p>
          Our premium collection is designed with comfort, durability, 
          and modern style in mind. Each piece is crafted using high-quality 
          fabric that feels soft on the skin while maintaining its shape 
          after multiple washes.
        </p>
        <p>
          Whether you’re dressing up for a casual day out or looking for 
          something reliable for everyday wear, this product is the perfect 
          balance of elegance and practicality.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
