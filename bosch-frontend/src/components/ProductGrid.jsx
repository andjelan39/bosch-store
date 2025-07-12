import React, { useEffect, useMemo, useState } from "react";
import "../style/ProductGrid.css";
import Product from "../components/Product";
import { BsSearch } from "react-icons/bs";

function ProductGrid({ products, getProductDetails }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(debouncedTerm.toLowerCase())
    );

    switch (sortOrder) {
      case "asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
      default:
        break;
    }

    return filtered;
  }, [debouncedTerm, sortOrder, products]);

  return (
    <div className="products-container">
      <h1 className="headline"> Power Tools</h1>
      <div className="filter-section">
        <div className="sorting-area">
          <select
            className="sort-dropdown"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by name (A to Z)</option>
            <option value="desc">Sort by name (Z to A)</option>
            <option value="price-asc">Sort by price (Low to High)</option>
            <option value="price-desc">Sort by price (High to Low)</option>
          </select>
        </div>
        <div className="search-bar">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <p>{filteredProducts.length} products</p>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Product
            product={product}
            key={product.id}
            getProductDetails={getProductDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
