import React from "react";
import Product from "../components/Product";

function ProductGrid({ products, getProductDetails }) {
  return (
    <div className="products-container">
      <h1 className="headline"> Power Tools</h1>
      <div className="products-grid">
        {products.map((product) => (
          <Product product={product} key={product.id} getProductDetails={getProductDetails} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
