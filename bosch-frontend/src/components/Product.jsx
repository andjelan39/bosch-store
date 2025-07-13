import React, { useState } from "react";
import "../style/Product.css";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

function Product({ product, getProductDetails, addToCart }) {
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
    <div className="card">
      <div className="image-wrapper">
        <img src={product.images[0]} />
      </div>
      <div className="product-info">
        <Link
          to={`/product/${product.id}`}
          onClick={() => getProductDetails(product.id)}
        >
          <div className="product-name">{product.name}</div>
        </Link>
        <div className="product-desc">{product.shortDescription}</div>
        <div className="product-price">{product.price} RSD</div>

        <div className="button-wrapper">
          <div className="quantity-button">
            <button onClick={decreaseQty}>
              <HiOutlineMinus />
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>
              <HiOutlinePlus />
            </button>
          </div>
          <button className="cart-button" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
