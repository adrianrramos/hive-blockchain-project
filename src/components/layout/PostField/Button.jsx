import React from "react";

import "../../../styles/Button.css";

const Button = ({ id, children, onClickEvent }) => {
  return (
    <button className="global-button" id={id} onClick={onClickEvent}>
      {children}
    </button>
  );
};

export default Button;
