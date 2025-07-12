import React from "react";

function Product({ product }) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={product.images[0]} />
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.shortDescription}</div>
        <div className="product-price">{product.price} RSD</div>

        <div className="button-wrapper">
          <div className="quantity-button">
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
          <button className="cart-button">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
