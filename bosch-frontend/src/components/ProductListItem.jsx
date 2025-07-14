import React, { useState } from "react";
import "../style/ProductListItem.css";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

function ProductListItem({ product, getProductDetails, addToCart }) {
  const [quantity, setQuantity] = useState(0);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0);
    }
  };

  return (
    <div className="list-item">
      <div className="left-area">
        <div className="list-item-image-wrapper">
          <img src={product.images[0]} className="list-item-image" />
        </div>
        <div className="list-item-info">
          <Link
            to={`/product/${product.id}`}
            onClick={() => getProductDetails(product.id)}
          >
            <div className="list-item-name">{product.name}</div>
          </Link>
          <div className="list-item-desc">{product.shortDescription}</div>
          <div className="list-item-price">{product.price} RSD</div>
        </div>
      </div>
      <div className="right-area">
        <div className="cart-qty-btn">
          <button onClick={decreaseQty}>
            <HiOutlineMinus />
          </button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>
            <HiOutlinePlus />
          </button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductListItem;
