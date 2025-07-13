import React from "react";
import { Link } from "react-router-dom";
import "../style/ProductGrid.css";
import "../style/Cart.css";
import CartItem from "./CartItem";

function Cart({ cart, updateCart }) {
  return (
    <div className="container">
      <nav className="breadcrumbs">
        <Link to={"/"}>Home </Link> / <Link to={"/"}>Power Tools </Link> / Cart
      </nav>
      <h1 className="headline"> Cart</h1>
      <div className="items-list">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem item={item} key={item.id} updateCart={updateCart} />
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
