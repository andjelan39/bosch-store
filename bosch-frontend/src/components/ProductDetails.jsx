import React, { useEffect, useState } from "react";
import "../style/ProductDetails.css";
import "../style/Product.css";
import { Link, useParams } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const foundProduct = products.find((prod) => prod.id.toString() === id);
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedImage(`/${foundProduct.images[0]}`);
    }
  }, [id, products]);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0);
    }
  };

  if (!product) {
    return (
      <div className="container">
        <p>Product not found.</p>
        <p>
          Back to <Link to={"/"}>Home page. </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
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
    </div>
  );
}

export default ProductDetails;
