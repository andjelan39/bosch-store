import React, { useState } from "react";
import "../style/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function RegisterForm() {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "ROLE_USER",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    console.log(userData);
  }

  function handleRegister(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8080/auth/register", userData)
      .then((res) => {
        console.log(res.data);
        swal("Success!", "You registered successfully!", "success");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        swal("Error!", "Something went wrong during registration", "error");
      });
  }

  return (
    <div className="container">
      <div className="login-container">
        <h1>Register Form</h1>
        <form onSubmit={handleRegister}>
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
          <input type="submit" value="Register" />
        </form>
        <span>
          Already have an account? <Link to="/login"> Login here.</Link>{" "}
        </span>
      </div>
    </div>
  );
}

export default RegisterForm;
