import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // 🟢 Fetch all products from backend
  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      if (data.success) {
        setAllProducts(data.data);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // 🗑️ Remove product by ID
  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`http://localhost:4000/removeproduct/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        alert('🗑️ Product removed successfully');
        setAllProducts((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('❌ Failed to remove product');
      }
    } catch (err) {
      console.error('Error removing product:', err);
      alert('An error occurred while removing product');
    }
  };

  // ⏩ Fetch on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='list-product'>
      <h2>All Products</h2>

      <div className="listproduct-header">
        <p>ID</p>
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Action</p>
      </div>

      <div className="listproduct-all">
        {allProducts.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          allProducts.map((item, index) => (
            <div className="listproduct-row" key={index}>
              <p>{item.id}</p>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.old_price}</p>
              <p>${item.new_price}</p>
              <p>{item.category}</p>
              <button
                className='listproduct-remove-btn'
                onClick={() => removeProduct(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
