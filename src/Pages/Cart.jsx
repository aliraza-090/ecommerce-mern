import React from "react";
import CartItems from "../components/CartItems/CartItems";
// Corrected CSS path (should be in src/CSS/Cart.css)
import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <CartItems />
    </div>
  );
};

export default Cart;
