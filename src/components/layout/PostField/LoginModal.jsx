import React from "react";

import "../../../styles/Modal.css";

const LoginModal = ({ closePortal }) => {
  const handleLogin = () => {
    window.hs_helper_login();
  };

  return (
    <div className="modal-bkg" onClick={() => closePortal()}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <h1>Login</h1>
        <input
          type="button"
          value="LOGIN USING HIVESIGNER"
          className="submit-login"
          onClick={() => handleLogin()}
          style={{ width: "55%", margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default LoginModal;
