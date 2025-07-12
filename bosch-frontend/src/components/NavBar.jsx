import React from "react";
import "../style/NavBar.css";
import BoschLogo from "../boschlogo.png";

function NavBar() {
  return (
    <div className="navBar-container">
      <div className="navBar-logo">
        <img src={BoschLogo} />
      </div>
      <div className="navBar-item">Cart</div>
    </div>
  );
}

export default NavBar;
