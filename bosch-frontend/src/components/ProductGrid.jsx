import React, { useEffect, useMemo, useState } from "react";
import "../style/ProductGrid.css";
import Product from "../components/Product";
import { BsSearch } from "react-icons/bs";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi2";

function ProductGrid({ products, getProductDetails, addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTerm]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(20);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );

  if (loading) {
    return (
      <div className="container">
        <h1 className="headline"> Power Tools</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container">
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
          <select
            className="pagination-dropdown"
            value={productsPerPage}
            onChange={(e) => {
              setproductsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 products per page</option>
            <option value={10}>10 products per page</option>
            <option value={15}>15 products per page</option>
            <option value={20}>20 products per page</option>
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
      {paginatedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <p>{paginatedProducts.length} products</p>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <Product
                product={product}
                key={product.id}
                getProductDetails={getProductDetails}
                addToCart={addToCart}
              />
            ))}
          </div>
          <div className="pagination-section">
            <button
              className="pagination-button outer-button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <HiChevronDoubleLeft />
            </button>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1), 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft />
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1), totalPages)
              }
              disabled={currentPage === totalPages}
            >
              <HiChevronRight />
            </button>
            <button
              className="pagination-button outer-button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <HiChevronDoubleRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductGrid;
