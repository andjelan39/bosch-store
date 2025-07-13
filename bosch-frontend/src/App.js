import "./App.css";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import productsData from "./data/products.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Cart from "./components/Cart";

function App() {
  const [productDetails, setProductDetails] = useState();
  const [cart, setCart] = useState([]);

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

  const addToCart = (product, quantity) => {
    console.log("Dodati proizvod: " + product.name);
    setCart((prevCart) => {
      const existingProducts = prevCart.find((item) => item.id === product.id);
      if (existingProducts) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateCart = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter className="App">
      <NavBar totalQty={totalQty} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductGrid
              products={productsData}
              getProductDetails={getProductDetails}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetails products={productsData} addToCart={addToCart} />
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} updateCart={updateCart} />}
        />
        <Route
          path="*"
          element={
            <div className="container">
              {" "}
              <h2>404 Page Not Found</h2>{" "}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
