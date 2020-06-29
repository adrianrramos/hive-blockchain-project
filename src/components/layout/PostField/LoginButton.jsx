import React, { Fragment } from "react";

import Portal from "../../util/Portal";
import LoginModal from "./LoginModal";
import { useState } from "react";
import Button from "./Button";

const LoginButton = () => {
  const [open, setOpen] = useState(false);

  const closePortal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        onClickEvent={() => {
          setOpen(!open);
        }}
      >
        Login
      </Button>
      {open && (
        <Portal>
          <LoginModal closePortal={closePortal} />
        </Portal>
      )}
    </Fragment>
  );
};

export default LoginButton;
