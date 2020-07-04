import React from "react";

import "./ClosePortal.css";

const ClosePortalIcon = ({ handleClick }) => {
  return (
    <i
      className="far fa-times-circle"
      style={{
        position: "absolute",
        right: "10px",
        fontSize: "24px",
      }}
      onClick={() => {
        handleClick && handleClick();
      }}
    ></i>
  );
};

export default ClosePortalIcon;
