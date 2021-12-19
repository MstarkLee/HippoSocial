import React from "react";
import "./Navbar.css";

const Navbar = ({ userName, changeName }) => {
  const handleOnclickName = () => {
    changeName?.(true);
  };

  return (
    <div className="navbar" onClick={handleOnclickName}>
      <div className="logo">
        <h2>HippoVideo</h2>
      </div>
      <div className="user">{userName ? `Hi ${userName}` : ""}</div>
    </div>
  );
};

export default Navbar;
