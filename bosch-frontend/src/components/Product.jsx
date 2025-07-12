import React from "react";
import "../style/Product.css";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";
import {Link} from "react-router-dom";

function Product({ product, getProductDetails }) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={product.images[0]} />
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`} onClick={()=> getProductDetails(product.id)}>
        <div className="product-name">{product.name}</div></Link>
        <div className="product-desc">{product.shortDescription}</div>
        <div className="product-price">{product.price} RSD</div>

        <div className="button-wrapper">
          <div className="quantity-button">
            <button>
              <HiOutlineMinus />
            </button>
            <span>0</span>
            <button>
              <HiOutlinePlus />
            </button>
          </div>
          <button className="cart-button">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
