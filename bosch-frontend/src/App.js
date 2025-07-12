import "./App.css";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import productsData from "./data/products.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {

  const [productDetails, setProductDetails] = useState();
  const getProductDetails = (id) => {
    if (id == null) {
      setProductDetails(null);
    } else {
      productsData.map((product) => {
        if (product.id === id) {
          setProductDetails(product);
        }
      });
    }
  };

  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductGrid products={productsData} getProductDetails={getProductDetails} />} />
        <Route path="/product/:id" element={<ProductDetails product={productDetails} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
