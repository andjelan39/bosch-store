import React from "react";
import "../style/NavBar.css";
import BoschLogo from "../boschlogo.png";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function NavBar({ totalQty, token, removeToken }) {

  const navigate = useNavigate();

  function handleLogout(){
    removeToken(token);
    swal("Logged out", "You have been logged out", "success").then(() => {
      navigate("/login");
    });
  }

  return (
    <div className="navBar-container">
      <div className="navBar-logo">
        <Link to={"/"}>
        <img src={BoschLogo} />
        </Link>
      </div>
      <div className="navBar-cart">
        {token && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
        <Link to={"/cart"}>
        <PiShoppingCartFill className="cart-icon" />
        <div className="cart-badge">{totalQty}</div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
