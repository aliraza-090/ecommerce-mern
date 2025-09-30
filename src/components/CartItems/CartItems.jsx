// Checkout button gets className="btn-small btn-checkout"
// Submit button gets className="btn-small btn-submit"

import React, { useContext, useState } from "react";
import "./CartItems.css";
import remove_icon from "../assets/cart_cross_icon.png";
import { ShopContext } from "../../contexts/ShopContext";

const CartItems = () => {
  const { all_product, cartItems, addToCart, removeFromCart } =
    useContext(ShopContext);

  const [promo, setPromo] = useState("");

  const subtotal = all_product.reduce((acc, item) => {
    return acc + item.new_price * (cartItems[item.id] || 0);
  }, 0);

  const shippingFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Add</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div className="cartitems-format" key={e.id}>
              <img src={e.image} alt={e.name} className="cart-product-icon" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <div className="cartitems-quantity">{cartItems[e.id]}</div>
              <p>${e.new_price * cartItems[e.id]}</p>
              <button
                className="cartitems-add"
                onClick={() => addToCart(e.id)}
              >
                +
              </button>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt="remove"
                className="remove-icon"
              />
            </div>
          );
        }
        return null;
      })}

      <div className="cart-summary">
        <h2>Cart Totals</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Shipping Fee</span>
          <span>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</span>
        </div>

        <div className="summary-row total-row">
          <span>Total</span>
          <span>${total}</span>
        </div>

        {/* Proceed to checkout */}
        <button className="btn-small btn-checkout">PROCEED TO CHECKOUT</button>

        {/* Promo code input */}
        <div className="promo-section">
          <p>If you have a promo code, enter it here:</p>
          <div className="promo-input">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
            />
            <button className="btn-small btn-submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
