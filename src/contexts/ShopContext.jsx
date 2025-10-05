import React, { createContext, useState } from 'react';
import all_product from '../components/assets/all_product';

export const ShopContext = createContext(null);

const GetDefaultCart = () => {  
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(GetDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // ✅ Total cart items function
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += cartItems[item];
    }
    return totalItem;
  };

  const contextValue = { all_product, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
