import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext'; // ✅ fixed path
import './CSS/ShopCategory.css';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext); // ✅ correctly using context

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="Category Banner" className="category-banner" />

      {/* Example: Render products filtered by category */}
      <div className="category-products">
        {all_product
          .filter((item) => item.category === props.category) // optional filter
          .map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopCategory;
