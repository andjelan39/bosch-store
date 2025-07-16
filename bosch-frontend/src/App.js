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
import swal from "sweetalert";

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
    getAllCartItems();
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

    getAllCartItems();
  }, [token]);

  function getAllCartItems() {
    const token = window.sessionStorage.getItem("auth_token");
    if (!token) return;

    axios
      .get("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched cart items", res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cart items", err);
      });
  }

  const addToCart = (product, quantity) => {
    if (!token) return;

    const data = {
      productId: product.id,
      quantity: quantity,
    };

    axios
      .post("http://localhost:8080/api/cart", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Product added to cart: ", res.data);
        setCart((prevCart) => {
          const existingProduct = prevCart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity }];
          }
        });
        swal("Success!", "Product added to cart!", "success");
        getAllCartItems();
      })
      .catch((err) => {
        console.error("Error while adding to cart", err);
        swal("Error!", "Something went wrong. Try again!", "error");
      });
  };

  const updateCart = (cartItemId, newQuantity) => {
    if (!token || newQuantity < 1) return;

    axios
      .put(
        `http://localhost:8080/api/cart/item/${cartItemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Cart item updated:", res.data);
        getAllCartItems();
      })
      .catch((err) => {
        console.error("Error updating cart item", err);
        swal("Error!", "Could not update item quantity. Try again!", "error");
      });
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter className="App">
      <NavBar totalQty={totalQty} token={token} removeToken={removeToken} />
      <Routes>
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <LoginForm addToken={addToken} />
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        {token ? (
          <>
            <Route
              path="/"
              element={
                <ProductGrid products={products} addToCart={addToCart} />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  products={productsData}
                  addToCart={addToCart}
                  token={token}
                />
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
