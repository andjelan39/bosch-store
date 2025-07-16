import React, { useEffect, useState } from "react";
import "../style/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function LoginForm({ addToken }) {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  function handleInput(e) {
    const {name, value} = e.target;
    setUserData((prev) => ({...prev, [name]:value}))
    console.log(userData);
  }

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8080/auth/login", userData)
      .then((res) => {
        console.log(res.data);
        const token = res.data;
        if (token) {
          window.sessionStorage.setItem("auth_token", token);
          console.log(res.data);
          addToken(token);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        swal("Error!", "Please enter the correct username and password!", "error");
      });
  }

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="usrname">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleInput}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleInput}
          />
          <input type="submit" value="Login" />
        </form>
        <span>
          Don't have the account? <Link to="/register"> Sign up here.</Link>
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
