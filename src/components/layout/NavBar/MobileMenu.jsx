import React from "react";
import styled from "styled-components";

import "../../../styles/MobileMenu.css";

const HiddenMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 650px) {
    flex-flow: column nowrap;
    background-color: #000;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: -20px;
    right: 0;
    height: 110vh;
    width: 100%;
    transition: transform 0.3s ease-in-out;
    z-index: 19;
    li {
      width: 85%;
      margin: 10px auto;
      border: 2px solid #fff;
      color: #fff;
      text-align: center;
      font-size: 1em;
      font-weight: 600;
      text-transform: capitalize;
    }
  }
`;

const MobileMenu = ({ open }) => {
  return (
    <HiddenMenu open={open}>
      <div className="list-content">
        <li>Search</li>
        <li>Login</li>
        <li>Sign Up</li>
      </div>
    </HiddenMenu>
  );
};

export default MobileMenu;
