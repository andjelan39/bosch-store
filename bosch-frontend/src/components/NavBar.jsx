import React from "react";
import "../style/NavBar.css";
import BoschLogo from "../boschlogo.png";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function NavBar({ totalQty, token, removeToken }) {
  return (
    <div className="navBar-container">
      <div className="navBar-logo">
        <Link to={"/"}>
        <img src={BoschLogo} />
        </Link>
      </div>
      <div className="navBar-cart">
        <Link to={"/cart"}>
        <PiShoppingCartFill className="cart-icon" />
        <div className="cart-badge">{totalQty}</div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
