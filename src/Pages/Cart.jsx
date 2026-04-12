import React, { useEffect, useState } from "react";
import CartItems from "../components/CartItems/CartItems";
import "./Cart.css"; // ✅ Correct CSS path

const Cart = () => {
  // ✅ State for cart data
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Get token from localStorage (user logged in)
  const token = localStorage.getItem("auth-token");

  // ✅ Function to fetch saved cart from backend
  const fetchCartFromDB = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems(data.cartData || {});
      } else {
        console.warn("⚠️ No saved cart found.");
      }
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  // ✅ Function to save cart to backend (MongoDB)
  const saveCartToDB = async (updatedCart) => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/savecartproducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          cartItems: updatedCart,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("❌ Failed to save cart:", data.message);
      }
    } catch (error) {
      console.error("❌ Error saving cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or update product in cart
  const handleAddToCart = (product) => {
    const updatedCart = {
      ...cartItems,
      [product.id]: {
        ...product,
        quantity: (cartItems[product.id]?.quantity || 0) + 1,
      },
    };
    setCartItems(updatedCart);
    saveCartToDB(updatedCart); // Save to MongoDB
  };

  // ✅ Remove item from cart
  const handleRemoveFromCart = (id) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[id];
    setCartItems(updatedCart);
    saveCartToDB(updatedCart);
  };

  // ✅ Fetch cart on page load
  useEffect(() => {
    fetchCartFromDB();
  }, []);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {/* ✅ Pass updated props to CartItems */}
      <CartItems
        cartItems={cartItems}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
      />

      {/* ✅ Optional loading indicator */}
      {loading && <p className="saving-message">Saving your cart...</p>}
    </div>
  );
};

export default Cart;
