import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import './CSS/ShopCategory.css';
import dropdown_icon from '../components/assets/dropdown_icon.png';
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="Category Banner" className="category-banner" />

      <div className='shop-category-indexSort'>
        <p>
          <span> showing 1-12 </span> out of 36 products
        </p>
        <div className="shop-categorySort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      {/* ✅ Product Grid */}
      <div className="shopcategory-products">
        {all_product.map((item) => {
          if (props.category === item.category) {
            return (
              <Item
                key={item.id}
                id={item.id}   // ✅ Moved comment OUTSIDE props
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      {/* ✅ Explore More Button */}
      <div className="explore-more-container">
        <button className="explore-more-btn">Explore More</button>
      </div>
    </div>
  );
};

export default ShopCategory;
