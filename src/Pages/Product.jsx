import React, { useContext } from 'react';   // <-- FIXED here
import { ShopContext } from '../contexts/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';  // ✅ Step 1: Import RelatedProduct

const Product = () => {
  const { all_product } = useContext(ShopContext);   // ✅ now works
  const { productId } = useParams();

  // ✅ Step 2: Find the product using productId
  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      {/* ✅ Step 3: Show Breadcrumbs */}
      <Breadcrums product={product} />   {/* spelling fixed */}

      {/* ✅ Step 4: Show Product details */}
      <ProductDisplay product={product} />

      {/* ✅ Step 5: Show Description & Reviews */}
      <DescriptionBox />

      {/* ✅ Step 6: Show Related Products below description */}
      <RelatedProduct category={product.category} currentProductId={product.id} />
    </div>
  );
};

export default Product;
