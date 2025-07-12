import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";

function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(`/${product.images[0]}`);

  return (
    <div className="products-container">
      <nav className="breadcrumbs">
        <Link to={"/"}>Home </Link> / <Link to={"/"}>Power Tools </Link> /{" "}
        {product.name}
      </nav>

      <div className="details-wrapper">
        <div className="product-gallery">
            <div className="main-image-wrapper">
                <img src={selectedImage} className="main-image" />
            </div>
          <div className="thumbnail-wrapper">
            {product.images.map((image, i) => {
              const imageSrc = `/${image}`;
              return (
                <img
                  key={i}
                  src={imageSrc}
                  className="thumbnail"
                  onClick={() => setSelectedImage(imageSrc)}
                />
              );
            })}
          </div>
        </div>
        <div className="details-info">
          <h2 className="details-name">{product.name}</h2>
          <p className="details-description">{product.fullDescription}</p>

          <table className="details-table">
            <tbody>
              {Object.entries(product.technicalSpecifications).map(
                ([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <p className="details-price">{product.price} RSD</p>
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
    </div>
  );
}

export default ProductDetails;
