import React from "react";
import Product from "../components/Product";

function ProductGrid({ products }) {
  return (
    <div className="products-container">
      <h1 className="headline"> Power Tools</h1>
      <div className="products-grid">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
