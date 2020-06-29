// FIXME: Refactor Flows into sperate files
// TODO: Manage state of form with local storage
// TODO: Option for submiting anonymously and return information to user
// TODO: LINK TO CREATE ACCOUNT

import React, { useState, useEffect, useRef } from "react";
import { uuid } from "uuidv4";
import { CSSTransition } from "react-transition-group";
// Redux
import { connect } from "react-redux";
import { submitComment } from "../../../redux/actions/dataAction";
import { Node, Text } from "slate";
import escapeHtml from "escape-html";

import "../../../styles/Modal.css";

const PostSubmitModal = ({
  closePortal,
  submitComment,
  blog_form: { title, body, jsonMetaData },
}) => {
  const [origin, setOrigin] = useState("");
  const [activeMenu, setActiveMenu] = useState("");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  const handleLogin = () => {
    window.hs_helper_login();
  };

  const handleCreateAccount = () => {
    console.log("create account was clicked");
  };

  const serialize = node => {
    if (Text.isText(node)) {
      return escapeHtml(node.text);
    }

    const children = node.children.map(n => serialize(n)).join("");

    switch (node.type) {
      case "block-quote":
        return `<blockquote><p>${children}</p></blockquote>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      default:
        return children;
    }
  };

  const handlePostNow = () => {
    const permlink = uuid();

    let oldTags = JSON.parse(jsonMetaData).tags;
    let newTags = oldTags.slice(1, oldTags.length); //remove first tag that's used as parent permlink
    let category = oldTags[0];
    JSON.parse(jsonMetaData).tags = newTags;

    let bodyserialize = {
      children: body,
    };

    window.hs_helper_comment(
      // Because comment is Root post the following applied:
      "", // Parent Author = empty str
      category, // Parent PermLink = first tag
      sessionStorage.username,
      permlink,
      title,
      serialize(bodyserialize),
      jsonMetaData
    );
  };

  const calcHeight = el => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  useEffect(() => {
    dropdownRef.current?.firstChild &&
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);

    // CHECK AUTH STATUS
    !sessionStorage.getItem("sc_token")
      ? setActiveMenu("non-auth")
      : setActiveMenu("auth");
    !sessionStorage.getItem("sc_token")
      ? setOrigin("non-auth")
      : setOrigin("auth");
  }, []);

  const DropdownItem = ({ goToMenu, leftIcon, children, handleClick }) => {
    return (
      <button
        href="#"
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

  return (
    <div className="modal-bkg" onClick={() => closePortal()}>
      <div
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
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
              <DropdownItem goToMenu="anon">POST ANONYMOUSLY</DropdownItem>
              <DropdownItem handleClick={handleLogin}>
                LOGIN WITH HIVESIGNER
              </DropdownItem>
              <DropdownItem
                goToMenu="confirm-email"
                handleClick={handleCreateAccount}
              >
                CREATE AN ACCOUNT
              </DropdownItem>
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
              <DropdownItem goToMenu="confirm-key">Confirm Email</DropdownItem>
              <DropdownItem goToMenu="non-auth">
                <i className="fas fa-arrow-left"></i>
              </DropdownItem>
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
          {/* FIXME: At this point in the flow users can not close the Modal
          without hitting cancel */}
          <div className="post-menu">
            <h1>Enter the code, that was sent to your email</h1>
            <div className="pt-modal-btns">
              <DropdownItem>Confirm API</DropdownItem>
              <DropdownItem goToMenu="non-auth">Cancel</DropdownItem>
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
              <DropdownItem goToMenu="anon">POST ANONYMOUSLY</DropdownItem>
              <DropdownItem>POST NOW</DropdownItem>
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
              <DropdownItem goToMenu={origin}>
                <i className="fas fa-arrow-left"></i>
              </DropdownItem>
              <DropdownItem>RANDOM TIME (WITHIN 6 HOURS)</DropdownItem>
              <DropdownItem>NOW</DropdownItem>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  blog_form: state.user.blog_form,
});

export default connect(mapStateToProps, { submitComment })(PostSubmitModal);
