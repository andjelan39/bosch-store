import React from "react";
import "../style/CartItem.css";
import "../style/Product.css";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";

function CartItem({ item, updateCart }) {
  const product = item.cartProductDto || {
    id: item.productId,
    name: item.productName,
    price: item.productPrice,
    images: [],
  };

  if(!product){
    return <div>Product info missing.</div>
  }

  const total = product.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="left-section">
        <div className="cart-item-image-wrapper">
          <img src={product.images?.[0]} className="cart-item-image" />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-name">{product.name}</div>
          <div className="cart-item-price">{product.price} RSD</div>
        </div>
      </div>

      <div className="right-section">
        <div className="right-quantity">
          <div className="cart-item-label">Quantity</div>
          <div className="cart-qty-button">
            <button
              onClick={() => updateCart(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <HiOutlineMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateCart(item.id, item.quantity + 1)}>
              <HiOutlinePlus />
            </button>
          </div>
        </div>
        <div className="right-total">
          <div className="cart-item-name">Total</div>
          <div className="cart-item-total">{total.toFixed(2)} RSD</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
