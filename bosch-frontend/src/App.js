import "./App.css";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import productsData from "./data/products.json";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cart from "./components/Cart";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import axios from "axios";

function App() {
  const [productDetails, setProductDetails] = useState();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(
    window.sessionStorage.getItem("auth_token") || null
  );

  function addToken(auth_token) {
    setToken(auth_token);
    window.sessionStorage.setItem("auth_token", auth_token);
  }

  function removeToken() {
    setToken(null);
    window.sessionStorage.removeItem("auth_token");
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem("auth_token");
    if (!token) return;

    axios
      .get("http://localhost:8080/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched products" + res.data);
        setProducts(res.data.content);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, [token]);

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
      <NavBar totalQty={totalQty} token={token} removeToken={removeToken} />
      <Routes>
        <Route path="/login" element={ token ? <Navigate to="/" /> :  <LoginForm addToken={addToken} />} />
        <Route path="/register" element={<RegisterForm />} />
        {token ? (
          <>
            <Route
              path="/"
              element={
                <ProductGrid
                  products={products}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetails products={productsData} addToCart={addToCart} token={token} />
              }
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateCart={updateCart} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/product/:id" element={<Navigate to="/login" />} />
            <Route path="/cart" element={<Navigate to="/login" />} />
          </>
        )}
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
