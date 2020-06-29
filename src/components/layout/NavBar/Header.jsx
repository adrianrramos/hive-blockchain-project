import React, { Fragment } from "react";

import Burger from "./Burger";

import "../../../styles/Header.css";

const Header = ({ toggleForm }) => {
  return (
    <Fragment>
      <div className="header-container">
        <div className="header-logo">
          <span id="un-logo">Un</span>
          <span id="bandotcom-logo">Ban.com</span>
        </div>
        <div className="header-interact">
          <div className="header-search">
            <i className="fas fa-search search-icon"></i>
            <input type="text" className="search-inp" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className="new-post-btn-box" onClick={() => toggleForm()}>
        <i className="fas fa-pen-nib"></i>
      </div>
      <Burger />
    </Fragment>
  );
};

export default Header;

// OLD LOGIN AND SIGNUP BUTTONS
// import LoginButton from "./LoginButton";
// <div className="auth-btns">
//   <LoginButton />
//   <a
//     href="https://signup.hive.io/"
//     id="signup-btn"
//     className="global-button"
//   >
//     Sign Up
//   </a>
// </div>
