import React, { useEffect, useState } from "react";
import './Popular.css';
import Item from "../Item/Item";
import data_product from "../assets/data"; // 🟢 Keep your existing static data as fallback

const Popular = () => {
  // ✅ State for fetched popular products
  const [popularProducts, setPopularProducts] = useState([]);

  // ✅ Fetch popular products from backend
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/popularinwomen");
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setPopularProducts(data.data);
        } else {
          console.warn("⚠️ No products found in popular women category, using local data.");
          setPopularProducts(data_product); // fallback to local data
        }
      } catch (error) {
        console.error("❌ Error fetching popular products:", error);
        setPopularProducts(data_product); // fallback if API fails
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {/* ✅ Use fetched data or fallback */}
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
