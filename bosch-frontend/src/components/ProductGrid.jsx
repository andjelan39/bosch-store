import React from "react";
import Product from "../components/Product";

function ProductGrid() {
  return (
    <div className="products-container">
      <h1 className="headline"> Power Tools</h1>
      <div className="products-grid">
        <Product></Product>
      </div>
    </div>
  );
}

export default ProductGrid;
