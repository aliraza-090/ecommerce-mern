import React, { useContext } from "react";
import "./RelatedProduct.css";
import Item from "../Item/Item";
import { ShopContext } from "../../contexts/ShopContext";   // ✅ fixed path

const RelatedProduct = ({ category, currentProductId }) => {
  const { all_product } = useContext(ShopContext);

  // ✅ Filter by category, exclude current product, limit to 4
  const relatedProducts = all_product
    .filter(
      (item) => item.category === category && item.id !== currentProductId
    )
    .slice(0, 4);

  return (
    <div className="related-product">
      <h1>Related Products</h1>
      <hr />
      <div className="related-product-container-item">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.new_price}
              image={item.image}
            />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
