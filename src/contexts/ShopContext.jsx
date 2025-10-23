import React, { createContext, useState, useEffect } from 'react';
import all_product from '../components/assets/all_product'; // keep existing static data

export const ShopContext = createContext(null);

// 🛒 Default cart setup (kept as-is)
const GetDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(GetDefaultCart());

  // 🆕 all_product will now hold backend data dynamically
  const [allProductData, setAllProductData] = useState(all_product); // initial local data backup

  // 🧠 Fetch all products from backend (can be called anytime)
  const fetchAllProducts = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      if (data.success) {
        setAllProductData(data.data); // ✅ store API data into state
        console.log('✅ Products fetched successfully:', data.data.length);
      } else {
        console.error('⚠️ Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('❌ Error fetching all products:', error);
    }
  };

  // 🔄 Fetch products once when the component mounts
  useEffect(() => {
    fetchAllProducts();
    fetchCartFromDB(); // 🆕 also load user cart from backend if logged in
  }, []);

  // 🛍️ Add to cart (with backend sync)
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    // 🔗 Save to backend if user logged in
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        await fetch('http://localhost:4000/addtocart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, token }),
        });
      } catch (error) {
        console.error('❌ Error adding product to cart (backend):', error);
      }
    }
  };

  // ❌ Remove from cart (with backend sync)
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });

    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        await fetch('http://localhost:4000/removecartitem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: itemId, token }),
        });
      } catch (error) {
        console.error('❌ Error removing product from cart (backend):', error);
      }
    }
  };

  // 🧾 Total cart items function
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += cartItems[item];
    }
    return totalItem;
  };

  // 🆕 Fetch cart data from backend when user logs in
  const fetchCartFromDB = async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success && data.cartData) {
        setCartItems(data.cartData);
        console.log('🛒 Cart loaded from backend');
      }
    } catch (error) {
      console.error('❌ Error fetching cart from DB:', error);
    }
  };

  // ✅ Context value (now includes refresh capability)
  const contextValue = {
    all_product: allProductData, // dynamic product data
    fetchAllProducts,            // function to manually refetch products later
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    fetchCartFromDB,             // 🆕 optional manual reload
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
