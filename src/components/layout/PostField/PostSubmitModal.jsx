// FIXME: save the HTML body in redux and delete the assignment inside here
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
//  Material - UI
import ClosePortalIcon from "../../util/ClosePortalIcon";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Redux
import { connect } from "react-redux";
import { submitComment } from "../../../redux/actions/dataAction";
import {
  registerEmail,
  registerUsername,
} from "../../../redux/actions/userAction";

import "../../../styles/SubmitModal.css";

const PostSubmitModal = ({
  submitComment,
  registerEmail,
  registerUsername,
  ui: { loading, errors, emailSuccess, usernameSuccess },
  postData,
  generatedPassword,
  closePortal,
}) => {
  // CSS Transition State
  const [menuOrigin, setMenuOrigin] = useState("");
  const [activeMenu, setActiveMenu] = useState("");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [disableModal, setDisableModal] = useState(false);
  // Register new user form state
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLogin = () => {
    window.hs_helper_login();
  };

  const handleConfirmEmail = newUserEmail => {
    // Stop accidental modal closes
    disableModalClose();

    // Check if amount is valid then => validate email
    registerEmail(userEmail);
  };

  const handleConfirmUsername = (username, apiKey) => {
    // confirm api code and username => generate password
    registerUsername(username, apiKey);
  };

  useEffect(() => {
    emailSuccess && setActiveMenu("confirm-key");
    usernameSuccess && setActiveMenu("confirm-password");
  }, [emailSuccess, usernameSuccess]);

  const handlePostNow = () => {
    postData.splice(2, 0, sessionStorage.getItem("username"));

    window.hs_helper_comment(...postData);
  };

  const calcHeight = el => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  useEffect(() => {
    // SET INITIAL PORTAL HEIGHT
    dropdownRef.current?.firstChild &&
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    // CHECK AUTH STATUS
    !sessionStorage.getItem("hs_token")
      ? setActiveMenu("non-auth")
      : setActiveMenu("auth");
    !sessionStorage.getItem("hs_token")
      ? setMenuOrigin("non-auth")
      : setMenuOrigin("auth");

    // PAUS ALL BROWSER REFRESHES when portal mounts
    window.addEventListener("beforeunload", beforeunload);

    // Clean up when component will unmount
    return () => {
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, []);

  // PAUSE ALL BROWSER REFRESHES
  const beforeunload = e => {
    e.preventDefault();
    e.returnValue = true;
  };
  // STOP ACCIDENTAL MODAL CLOSE
  const disableModalClose = () => {
    setDisableModal(true);
  };

  const NavigationItem = ({ goToMenu, leftIcon, children, handleClick }) => {
    return (
      <button
        className="submit-post-btn"
        onClick={() => {
          goToMenu && setActiveMenu(goToMenu);
          handleClick && handleClick();
        }}
      >
        <span className="icon-left">{leftIcon}</span>
        {children}
      </button>
    );
  };

  const newHeight = () => {
    setMenuHeight("500px");
  };

  return (
    <div
      className="modal-bkg"
      onClick={() => {
        !disableModal && closePortal();
      }}
    >
      <div
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <ClosePortalIcon handleClick={closePortal} />

        <CSSTransition
          in={activeMenu === "non-auth"}
          timeout={500}
          unmountOnExit
          onEnter={calcHeight}
          classNames="menu-primary"
        >
          <div className="post-menu">
            <h1>How would you like to post?</h1>
            <div className="pt-modal-btns">
              <NavigationItem goToMenu="anon">POST ANONYMOUSLY</NavigationItem>
              <NavigationItem handleClick={handleLogin}>
                LOGIN WITH HIVESIGNER
              </NavigationItem>
              <NavigationItem goToMenu="confirm-email">
                CREATE AN ACCOUNT
              </NavigationItem>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "confirm-email"}
          timeout={500}
          classNames="menu-secondary-alt"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="post-menu">
            <h1>Verify your email</h1>
            <div className="pt-modal-btns">
              {
                errors && (
                  <label
                    htmlFor="confirm-account"
                    className="error-msg-label"
                    style={{
                      textAlign: "left",
                      fontWeight: "800",
                      color: "rgb(227, 19, 55)",
                    }}
                  >
                    {errors}
                  </label>
                )
                // FIXME: pass the nodeRef prop to calc height
                // calcHeight()
              }
              <input
                type="text"
                className="confirm-account"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                placeholder="Enter your email..."
                style={{
                  outline: errors ? "2px solid rgb(227, 19, 55)" : "none",
                }}
              />
              <NavigationItem handleClick={() => handleConfirmEmail(userEmail)}>
                {loading ? (
                  <CircularProgress className="loading-spinner" size={30} />
                ) : (
                  "Confirm Email"
                )}
              </NavigationItem>
              <NavigationItem goToMenu="non-auth">
                <i className="fas fa-arrow-left"></i>
              </NavigationItem>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "confirm-key"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="post-menu">
            <h1>Enter the code, that was sent to your email</h1>
            <div className="pt-modal-btns">
              {
                errors && (
                  <label
                    htmlFor="confirm-account"
                    className="error-msg-label"
                    style={{
                      textAlign: "left",
                      fontWeight: "800",
                      color: "rgb(227, 19, 55)",
                    }}
                  >
                    {errors}
                  </label>
                )
                // FIXME: pass the nodeRef prop to calc height
                // calcHeight()
              }
              <input
                type="text"
                className="confirm-account"
                onChange={e => setApiKey(e.target.value)}
                placeholder="Enter the code from your email (check spam)..."
                value={apiKey}
              />
              <input
                type="text"
                className="confirm-account"
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter a username..."
                value={username}
              />
              <NavigationItem
                handleClick={() => handleConfirmUsername(username, apiKey)}
              >
                {loading ? (
                  <CircularProgress className="loading-spinner" size={30} />
                ) : (
                  "Continue"
                )}
              </NavigationItem>
              <NavigationItem
                goToMenu="non-auth"
                handleClick={() => setDisableModal(false)}
              >
                Cancel
              </NavigationItem>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "confirm-password"}
          timeout={500}
          unmountOnExit
          onEnter={calcHeight}
          classNames="menu-secondary"
        >
          <div className="post-menu">
            <div className="pt-modal-btns">
              {/* TODO: password is still not generated  */}
              <h1>Use this password to login</h1>
              {/* <IconButton> */}
              {copied && (
                <label
                  htmlFor="confirm-password"
                  className="error-msg-label"
                  style={{
                    textAlign: "left",
                    fontWeight: "800",
                    color: "green",
                  }}
                >
                  Copied Successfully !
                </label>
              )}
              <CopyToClipboard
                text={generatedPassword}
                onCopy={() => setCopied(true)}
              >
                <button
                  style={{
                    color: copied ? "green" : "rgb(227, 19, 55)",
                    backgroundColor: copied && "rgb(219,255,219)",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 15px",
                  }}
                  className="submit-post-btn"
                >
                  <i
                    className="far fa-clipboard"
                    style={{ marginRight: "10px" }}
                  ></i>
                  {generatedPassword}
                </button>
              </CopyToClipboard>
              {/* </IconButton> */}
              <NavigationItem goToMenu={menuOrigin}>OKAY</NavigationItem>
            </div>
          </div>
        </CSSTransition>
        {/* AUTHENTICATED FLOW */}
        <CSSTransition
          in={activeMenu === "auth"}
          timeout={500}
          unmountOnExit
          onEnter={calcHeight}
          classNames="menu-primary"
        >
          <div className="post-menu">
            <h1>How would you like to post?</h1>
            <div className="pt-modal-btns">
              <NavigationItem goToMenu="anon">POST ANONYMOUSLY</NavigationItem>
              <NavigationItem handleClick={handlePostNow}>
                POST NOW
              </NavigationItem>
            </div>
          </div>
        </CSSTransition>
        {/* ANON FLOW */}
        <CSSTransition
          in={activeMenu === "anon"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="post-menu">
            <div className="pt-modal-btns">
              <NavigationItem goToMenu={menuOrigin}>
                <i className="fas fa-arrow-left"></i>
              </NavigationItem>
              <NavigationItem>RANDOM TIME (WITHIN 6 HOURS)</NavigationItem>
              <NavigationItem>NOW</NavigationItem>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  postData: state.user.post_form_data,
  ui: state.ui,
  generatedPassword: state.user.userPassword,
});

export default connect(mapStateToProps, {
  submitComment,
  registerEmail,
  registerUsername,
})(PostSubmitModal);
