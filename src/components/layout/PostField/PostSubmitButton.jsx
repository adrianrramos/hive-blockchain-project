import React, { Fragment, useState } from "react";

import Portal from "../../util/Portal";
import Button from "./Button";
import PostSubmitModal from "./PostSubmitModal";

const PostSubmitButton = () => {
  const [open, setOpen] = useState(false);

  const closePortal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button onClickEvent={() => setOpen(!open)} id="post-btn">
        POST
      </Button>
      {open && (
        <Portal>
          <PostSubmitModal closePortal={closePortal} />
        </Portal>
      )}
    </Fragment>
  );
};

export default PostSubmitButton;
